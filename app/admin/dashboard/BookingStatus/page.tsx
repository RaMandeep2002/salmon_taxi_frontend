"use client";
import DashboardLayout from "../../DashBoardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { fetchBookingHistory } from "@/app/admin/slices/slice/booingHistorySlice";
import { useDebounce } from "@/lib/useDebounce";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { Checkbox } from "@/components/ui/checkbox";
import { updateStatusanimal } from "../../slices/slice/setAnimalstatus";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

// import ServerTime from "@/app/components/LocalTime";

export default function BookingStatus() {
  const { toast: showToast } = useToast();
  const dispatch: AppDispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [stoppingBookingId, setStoppingBookingId] = useState<string | null>(null);
  const itemsPerPage = 15;
  const hasHandledToast = useRef(false);

  const [filterStatus, setFilterStatus] = useState("All");

  const {
    bookings = [],
    loading,
    error,
  } = useSelector((state: RootState) => state.fetchBookingHistory);

  const {
    isProcessing: updateLoading,
    iserror: updateError,
    success,
  } = useSelector((state: RootState) => state.updatedStatusData);

  useEffect(() => {
    dispatch(fetchBookingHistory());
  }, [dispatch]);

  const matchesStatus = [
    "All",
    ...Array.from(new Set((bookings || []).map((b) => b.driver?.drivername || "No driver assign"))),
  ];

  const filteredBookings =
    (bookings || []).filter((booking) => {
      const matchesSearch =
        (booking.driver?.drivername?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        booking.pickup?.address?.toLowerCase().includes(debouncedSearch.toLowerCase()));

      const matchesFilterStatus =
        filterStatus === "All" || (booking.driver?.drivername || "No driver assign") === filterStatus;

      return matchesSearch && matchesFilterStatus;
    });

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / itemsPerPage));

  // Reset to first page if filter/search changes and current page is now out of range
  useEffect(() => {
    if ((currentPage - 1) * itemsPerPage >= filteredBookings.length && filteredBookings.length > 0) {
      setCurrentPage(1);
    }
  }, [filteredBookings.length, currentPage]);

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    if (success && !hasHandledToast.current) {
      hasHandledToast.current = true;

      showToast({
        title: "Status Updated",
        description: `Animal status updated successfully.`,
      });

      dispatch(fetchBookingHistory());
      setStoppingBookingId(null);

      setTimeout(() => {
        hasHandledToast.current = false;
      }, 800);
    }

    if (updateError && !hasHandledToast.current) {
      hasHandledToast.current = true;

      showToast({
        title: "Error",
        description: `Status: ${updateError}`,
        variant: "destructive",
      });

      setStoppingBookingId(null);

      setTimeout(() => {
        hasHandledToast.current = false;
      }, 800);
    }
  }, [success, updateError, dispatch, showToast]);


  const handleAnimalStatus = useCallback(
    (bookingId: string, currentValue: boolean) => async () => {
      console.log("bookingid -------> ", bookingId)
      console.log("currentValue -------> ", currentValue  )
      setStoppingBookingId(bookingId);
      try {
        await dispatch(
          updateStatusanimal({
            bookingId,
            updateStatusData: { isSvcAnimalYN: !currentValue },
          })
        );
        // showToast is handled by above effect
      } catch (err) {
        showToast({
          title: "Error",
          description: `Failed to update animal status: ${String(err)}`,
          variant: "destructive",
        });
        setStoppingBookingId(null);
      }
    },
    [dispatch, showToast]
  );

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-[#F5EF1B]">
          Booking Status
        </h1>
        {/* <ServerTime /> */}
        <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
            <Input
              placeholder="Search by Driver Name, Pickup..."
              className="w-full sm:w-64 text-white border border-[#F5EF1B] placeholder-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* <Button
              variant="outline"
              size="icon"
              className="bg-zinc-800 hover:bg-zinc-800 border border-[#F5EF1B] flex-shrink-0"
            >
              <Search className="h-4 w-4 text-[#F5EF1B]" />
            </Button> */}
          </div>
          <div className="w-full md:w-auto flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-zinc-800 hover:bg-zinc-800 text-white border border-[#F5EF1B] w-full md:w-auto"
                >
                  {filterStatus === "All" ? "Drivers" : filterStatus}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-zinc-800 text-white border border-[#F5EF1B]"
              >
                {matchesStatus.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={filterStatus === status}
                    onCheckedChange={() => setFilterStatus(status)}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="border border-[#F5EF1B] rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="text-center border border-[#F5EF1B] ">
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Booking Date
                </TableHead>
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Pickup Time
                </TableHead>
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  DropOff Time
                </TableHead>
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Driver
                </TableHead>
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Pickup
                </TableHead>
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Drop Off
                </TableHead>
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Status
                </TableHead>
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Have Animal
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-white">
                    {error}
                  </TableCell>
                </TableRow>
              ) : paginatedBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-white">
                    No bookings found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedBookings.map((booking) => (
                  <TableRow
                    className="text-center text-white border border-[#F5EF1B]"
                    key={booking.bookingId}
                  >
                    <TableCell>{booking.pickupDate || "-"}</TableCell>
                    <TableCell>{booking.pickuptime || "-"}</TableCell>
                    <TableCell>{booking.dropdownTime || "-"}</TableCell>
                    <TableCell>
                      {highlightMatch(
                        !booking.driver?.drivername
                          ? "No driver assign"
                          : booking.driver?.drivername,
                        debouncedSearch
                      )}
                    </TableCell>
                    <TableCell>
                      {highlightMatch(
                        booking.pickup?.address || "-",
                        debouncedSearch
                      )}
                    </TableCell>
                    <TableCell>
                      {booking.dropOff?.address ? (
                        booking.dropOff.address
                      ) : (
                        <span className="text-gray-400 italic">
                          No address provided
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {booking.isSvcAnimalYN == true ? "Yes" : "No"}
                    </TableCell>
                    <TableCell className="flex justify-center items-center">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={!!booking.isSvcAnimalYN}
                          disabled={
                            updateLoading &&
                            stoppingBookingId === booking.bookingId
                          }
                          onCheckedChange={() =>
                            handleAnimalStatus(
                              booking.bookingId,
                              Boolean(booking.isSvcAnimalYN)
                            )()
                          }
                          className="border-2 border-[#F5EF1B] w-5 h-5"
                        />
                      </div>
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

// Use a safe highlight (avoid XSS, handle empty search term)
const highlightMatch = (text: string, term: string) => {
  if (!text || !term?.trim()) return text;
  // Escape RegExp special chars in term
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-300">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};
