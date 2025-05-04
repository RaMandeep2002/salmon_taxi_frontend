"use client";
import { Input } from "@/components/ui/input";
import DashboardLayout from "../../DashBoardLayout";
import { Button } from "@/components/ui/button";
// import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { fetchShiftsWithVehicles } from "../../slices/slice/shiftandvehicleSlice";
import { useEffect, useState, useRef } from "react";
import {
  resetShiftActionState,
  stopShiftByAdmin,
} from "../../slices/slice/stopShiftsDriver";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/lib/useDebounce";

export default function ShiftsAndVehicle() {
  const { toast: showToast } = useToast(); // rename to avoid shadowing
  const dispatch = useDispatch<AppDispatch>();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [stoppingDriverId, setStoppingDriverId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const hasHandledToast = useRef(false); // prevent infinite re-renders

  const { shifts, loading, error } = useSelector(
    (state: RootState) => state.shiftsWithVehicle
  );
  const {
    success,
    iserror: stopError,
    message,
    shiftDuration,
  } = useSelector((state: RootState) => state.shiftActions);

  useEffect(() => {
    dispatch(fetchShiftsWithVehicles());
  }, [dispatch]);

  const filteredShifts =
    shifts?.filter((shift) =>
      shift.driver.drivername.toLowerCase().includes(debouncedSearch.toLowerCase())
    ) || [];

  const totalPages = Math.ceil(filteredShifts.length / itemsPerPage);
  const paginatedShifts = filteredShifts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    if ((success || stopError) && !hasHandledToast.current) {
      hasHandledToast.current = true;

      if (success) {
        showToast({
          title: message || "Shift stopped successfully!",
          description: shiftDuration ? `Duration: ${shiftDuration}` : "",
        });
        dispatch(fetchShiftsWithVehicles());
        dispatch(resetShiftActionState());
        setStoppingDriverId(null);
      } else if (stopError) {
        showToast({
          title: "Error stopping shift",
          description: `Failed to stop the shift: ${stopError}`,
        });
        setStoppingDriverId(null);
      }

      // Allow toasts again after short delay
      setTimeout(() => {
        hasHandledToast.current = false;
      }, 1000);
    }
  }, [success, stopError, message, shiftDuration, dispatch, showToast]);

  const handleStopShiftDriver = (driverId: string) => async () => {
    setStoppingDriverId(driverId);

    const now = new Date();
    const endDate = now.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      timeZone: 'America/Vancouver',
    });

    const endTime = now
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: 'America/Vancouver',
      })
      .replace(/\s?([AP]M)$/i, (match, p1) => p1.toLowerCase());

    try {
      await dispatch(
        stopShiftByAdmin({
          driverId,
          endTime,
          endDate,
        })
      );
    } catch (err) {
      showToast({
        title: "Error",
        description: `Failed to stop shift: ${err}`,
        variant: "destructive",
      });
      setStoppingDriverId(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-[#F5EF1B]">
          Shifts with Vehicle Assigned
        </h1>

        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 w-full sm:w-auto">
            <Input
            autoFocus
              placeholder="Search by driver name..."
              className="w-full sm:w-72 text-white border border-[#F5EF1B] placeholder-white"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="border border-[#F5EF1B] rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="text-center border border-[#F5EF1B]">
                <TableHead className="text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Driver Name
                </TableHead>
                <TableHead className="text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Vehicle
                </TableHead>
                <TableHead className="text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Start
                </TableHead>
                <TableHead className="text-center text-[#F5EF1B] text-xs sm:text-sm">
                  End
                </TableHead>
                <TableHead className="text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Shift Status
                </TableHead>
                <TableHead className="text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-white">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-red-500">
                    {error}
                  </TableCell>
                </TableRow>
              ) : paginatedShifts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-white">
                    No shift data available.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedShifts.map((shift, index) => (
                  <TableRow key={index} className="text-center text-white">
                    <TableCell>{highlightMatch(shift.driver.drivername, debouncedSearch)}</TableCell>
                    <TableCell>{shift.vehicle.vehicleModel}</TableCell>
                    <TableCell>
                      {`${shift.startTime} - ${shift.startDate}`}
                    </TableCell>
                    <TableCell>
                      {shift.endTime && shift.endDate
                        ? `${shift.endTime} - ${shift.endDate}`
                        : "Ongoing"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          shift.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {shift.isActive ? "Active" : "End"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                        disabled={
                          !shift.isActive ||
                          stoppingDriverId === shift.driver.driverId
                        }
                        onClick={handleStopShiftDriver(shift.driver.driverId)}
                      >
                        Stop Shift
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2 sm:gap-0">
          <Button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="text-zinc-800 bg-[#F5EF1B] hover:bg-zinc-800 hover:text-[#F5EF1B] w-full sm:w-auto"
          >
            Previous
          </Button>
          <span className="text-sm text-[#F5EF1B]">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="text-zinc-800 bg-[#F5EF1B] hover:bg-zinc-800 hover:text-[#F5EF1B] w-full sm:w-auto"
          >
            Next
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}



const highlightMatch = (text: string, term: string) => {
  const regex = new RegExp(`(${term})`, "gi");
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: text.replace(regex, `<mark class="bg-yellow-300">$1</mark>`),
      }}
    />
  );
};