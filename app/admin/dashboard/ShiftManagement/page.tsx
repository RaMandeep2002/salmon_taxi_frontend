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
import { Ban, Car, Clock10, List } from "lucide-react";
import { stopAllShiftByAdmin } from "../../slices/slice/stopAllShiftSlice";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ShiftsAndVehicle() {
  const { toast: showToast } = useToast(); // rename to avoid shadowing
  const dispatch = useDispatch<AppDispatch>();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [stoppingDriverId, setStoppingDriverId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
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
  const { ismessage, stoppedShifts } = useSelector(
    (state: RootState) => state.stopAllShift
  );

  useEffect(() => {
    dispatch(fetchShiftsWithVehicles());
  }, [dispatch]);

  const filteredShifts =
    shifts?.filter((shift) =>
      shift.driver.drivername
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
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
    });

    const endTime = now
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
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

  const handleStopAllShiftDriver = async () => {
    const now = new Date();
    const endDate = now.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    const endTime = now
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
      .replace(/\s?([AP]M)$/i, (match, p1) => p1.toLowerCase());

    try {
      await dispatch(
        stopAllShiftByAdmin({
          endTime,
          endDate,
        })
      );
      showToast({
        title: ismessage || "All Shift stopped successfully!",
        description: stoppedShifts ? `No of Shifts : ${stoppedShifts}` : "",
      });
      dispatch(fetchShiftsWithVehicles());
    } catch (err) {
      showToast({
        title: "Error",
        description: `Failed to stop shift: ${err}`,
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-white text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <span>
                <List />
              </span>
              <span>Shift Management</span>
            </h1>
            <p className="text-gray-200 dark:text-white mt-1">
              Monitor and manage driver shifts and schedules
            </p>
            <div className="h-1 w-50 bg-[#F5EF1B] rounded mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Active Shifts Card */}
          <Card className="shadow-lg border-0 bg-[#F5EF1B] transition">
            <CardHeader className="pb-2 flex flex-row items-center gap-3">
              <div className="bg-green-500/10 rounded-full p-2">
                <Clock10 className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <CardTitle className="text-sm font-semibold text-green-700 dark:text-green-200">
                Total Shifts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-green-900 dark:text-green-200">
                {filteredShifts.length}
              </div>
              <p className="text-xs text-green-600 mt-1 font-medium">
                {Number(filteredShifts.length) > 0
                  ? `${filteredShifts.length} Shfits`
                  : "No active shifts"}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-[#F5EF1B] transition">
            <CardHeader className="pb-2 flex flex-row items-center gap-3">
              <div className="bg-green-500/10 rounded-full p-2">
                <Clock10 className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <CardTitle className="text-sm font-semibold text-green-700 dark:text-green-200">
                Active Shifts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-green-900 dark:text-green-200">
              {filteredShifts.filter(shift => shift.isActive === true).length}
              </div>
              <p className="text-xs text-green-600 mt-1 font-medium">
              {filteredShifts.filter(shift => shift.isActive === true).length} Active
              </p>
            </CardContent>
          </Card> 

          {/* Scheduled Shifts Card */}
          {/* <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition">
            <CardHeader className="pb-2 flex flex-row items-center gap-3">
              <div className="bg-blue-500/10 rounded-full p-2">
                <Plus className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <CardTitle className="text-sm font-semibold text-blue-700 dark:text-blue-200">
                Scheduled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-blue-900 dark:text-blue-200">
                {shiftStats[1].value}
              </div>
              <p className="text-xs text-blue-600 mt-1 font-medium">
                {Number(shiftStats[1].value) > 0
                  ? `${shiftStats[1].change} today`
                  : "No scheduled shifts"}
              </p>
            </CardContent>
          </Card> */}

          {/* On Break Card */}
          {/* <Card className="shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 transition">
            <CardHeader className="pb-2 flex flex-row items-center gap-3">
              <div className="bg-yellow-500/10 rounded-full p-2">
                <Clock10 className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
              </div>
              <CardTitle className="text-sm font-semibold text-yellow-700 dark:text-yellow-200">
                On Break
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-yellow-900 dark:text-yellow-200">
                {shiftStats[2].value}
              </div>
              <p className="text-xs text-yellow-600 mt-1 font-medium">
                {Number(shiftStats[2].value) > 0
                  ? `${shiftStats[2].change} today`
                  : "No drivers on break"}
              </p>
            </CardContent>
          </Card> */}

          {/* Completed Shifts Card */}
          <Card className="shadow-lg border-0 bg-[#F5EF1B] transition">
            <CardHeader className="pb-2 flex flex-row items-center gap-3">
              <div className="bg-gray-500/10 rounded-full p-2">
                <Car className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </div>
              <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-gray-200">
              {filteredShifts.filter(shift => shift.isActive === false).length}
              </div>
              <p className="text-xs text-gray-600 mt-1 font-medium">
              {filteredShifts.filter(shift => shift.isActive === false).length} Completed
              </p>
            </CardContent>
          </Card>
        </div>

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
          <div className="w-full sm:w-auto flex justify-end">
            <Button
              className="w-full sm:w-auto text-white bg-red-600 hover:bg-red-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              onClick={handleStopAllShiftDriver}
            >
              <span className="animate-pulse">
                <Ban className="mr-2 h-4 w-4" />
              </span>
              Stop All Shift
            </Button>
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
                  Vehicle Status
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
                  <TableCell colSpan={6} className="text-center text-white">
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
                  <TableRow
                    key={index}
                    className="text-center text-white border border-[#F5EF1B]"
                  >
                    <TableCell>
                      {highlightMatch(shift.driver.drivername, debouncedSearch)}
                    </TableCell>
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
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          shift.isActive
                            ? shift.vehicle.isAssigned
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                            : // If shift is ended, but vehicle is still assigned elsewhere, show "Should be Free"
                            shift.vehicle.isAssigned
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {shift.isActive
                          ? shift.vehicle.isAssigned
                            ? "Assigned"
                            : "Free"
                          : shift.vehicle.isAssigned
                          ? "Free"
                          : "Free"}
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
