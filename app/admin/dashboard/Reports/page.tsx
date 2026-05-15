"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "../../DashBoardLayout";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
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
import { getBookingReport } from "../../slices/slice/getReportSlice";
import { useDebounce } from "@/lib/useDebounce";
import { fetchPaginatedBookingHistory, setPage } from "../../slices/slice/paginaatedBookingSlice";
import { Switch } from "@/components/ui/switch";
import { updateIsIncludeInReport } from "../../slices/slice/isIncludeInReport";
import { useToast } from "@/hooks/use-toast";


export default function Reports() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [pickup, setPickup] = useState("");
  const [drivername, setDrivername] = useState("");

  const debouncedDriverSearch = useDebounce(drivername, 500);
  const debouncedPickupSearch = useDebounce(pickup, 500);

  const dispatch = useDispatch<AppDispatch>();
  const { bookings, loading, error, page, limit, hasMore, totalPages } = useSelector(
    (state: RootState) => state.fetchPaginatedBookingHistory
  );
  const { isDownloading, iserror } = useSelector(
    (state: RootState) => state.getBookingReport
  );
  const { toast } = useToast();


  // Convert YYYY-MM-DD to MM/DD/YYYY for comparison and API consistency
  const convertDateFormat = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    if(!year || !month || !day) return "";
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    const formattedFrom = convertDateFormat(fromDate);
    const formattedTo = convertDateFormat(toDate);
    
    dispatch(fetchPaginatedBookingHistory({ 
      page: page ?? 1, 
      limit: limit ?? 15,
      fromDate: formattedFrom,
      toDate: formattedTo,
      pickup: debouncedPickupSearch,
      drivername: debouncedDriverSearch
    }));
  }, [dispatch, page, limit, fromDate, toDate, debouncedPickupSearch, debouncedDriverSearch]);

  // Reset page to 1 whenever filters change
  useEffect(() => {
    dispatch(setPage(1));
  }, [dispatch, fromDate, toDate, debouncedPickupSearch, debouncedDriverSearch]);

  const handleNext = () => dispatch(setPage((page ?? 1) + 1));
  const handlePrev = () => dispatch(setPage(Math.max((page ?? 1) - 1, 1)));

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch(
    //   getBookingReport({
    //     fromDate: convertDateFormat(fromDate),
    //     toDate: convertDateFormat(toDate),
    //     pickup,
    //     drivername,
    //   })
    // );

    try{
      dispatch(
      getBookingReport({
        fromDate: convertDateFormat(fromDate),
        toDate: convertDateFormat(toDate),
        pickup,
        drivername,
      })
    ).unwrap();
    toast({
      title: "Success",
      description: "Report downloaded successfully.",
      variant: "default",
    });
    }
    catch(err: unknown){
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to download report.",
        variant: "destructive",
      });
    }
  };

  const handleTogglePTDW = async (bookingId: string, isPTDW: boolean) => {
    try {
      await dispatch(updateIsIncludeInReport({ bookingId, isPTDW })).unwrap();
      
      // Refresh the data after successful update
      const formattedFrom = convertDateFormat(fromDate);
      const formattedTo = convertDateFormat(toDate);
      
      dispatch(fetchPaginatedBookingHistory({ 
        page: page ?? 1, 
        limit: limit ?? 15,
        fromDate: formattedFrom,
        toDate: formattedTo,
        pickup: debouncedPickupSearch,
        drivername: debouncedDriverSearch
      }));

    } catch (err: unknown) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to update booking status.",
        variant: "destructive",
      });
    }
  };


  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-[#F5EF1B]">
          Booking History Reports
        </h1>

        {/* Filter & Download Form */}
        <form
          onSubmit={handleDownload}
          className="w-full mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-2 py-2 text-white border border-[#F5EF1B] bg-transparent rounded-md appearance-none [&::-webkit-calendar-picker-indicator]:invert placeholder:text-zinc-400"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-2 py-2 text-white border border-[#F5EF1B] bg-transparent rounded-md appearance-none [&::-webkit-calendar-picker-indicator]:invert placeholder:text-zinc-400"
            />
            <input
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Pickup Address"
              className="px-2 py-2 text-white border border-[#F5EF1B] bg-transparent rounded-md"
            />
            <input
              value={drivername}
              onChange={(e) => setDrivername(e.target.value)}
              placeholder="Driver Name"
              className="px-2 py-2 text-white border border-[#F5EF1B] bg-transparent rounded-md"
            />
            <button
              type="submit"
              className="px-2 py-2 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 rounded-md"
              disabled={isDownloading}
            >
              <Download size={16} />
              {isDownloading ? "Downloading..." : "Download CSV"}
            </button>
            <button
              type="button"
              className="px-2 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-md transition-colors"
              onClick={() => {
                setFromDate("");
                setToDate("");
                setPickup("");
                setDrivername("");
              }}
              disabled={isDownloading}
            >
              Clear
            </button>
          </div>
          {iserror && <p className="text-red-500 text-sm mt-2">{iserror}</p>}
        </form>

        {/* Table */}
        <div className="border border-[#F5EF1B] rounded-xl overflow-auto shadow-lg">
          <Table>
            <TableHeader>
              <TableRow className=" border-b border-[#F5EF1B] text-[#F5EF1B] text-base">
                {[
                  "Booking Date",
                  "Pickup Time",
                  "Drop-Off Time",
                  "Driver",
                  "Distance",
                  "Waiting Time",
                  "Total Fare",
                  "Pickup",
                  "Drop Off",
                  "Off Record"
                ].map((header) => (
                  <TableHead
                    key={header}
                    className="min-w-[120px] h-[50px] text-[#F5EF1B]"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-8 text-white"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-8 text-white"
                  >
                    {error}
                  </TableCell>
                </TableRow>
              ) : bookings.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-8 text-white"
                  >
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow
                    key={booking.bookingId}
                    className="border-b border-[#F5EF1B]"
                  >
                    <TableCell className="text-white">
                      {booking.pickupDate}
                    </TableCell>
                    <TableCell className="text-white">
                      {booking.pickuptime}
                    </TableCell>
                    <TableCell className="text-white">
                      {booking.dropdownTime}
                    </TableCell>
                    <TableCell className="text-white">
                      {booking.driver?.drivername || "No driver assigned"}
                    </TableCell>
                    <TableCell className="text-white">
                      {booking.distance}
                    </TableCell>
                    <TableCell className="text-white">
                      {booking.wating_time_formated
                        ? booking.wating_time_formated
                        : "00:00:00"}
                    </TableCell>
                    <TableCell className="text-white">
                      {(() => {
                        const fare = booking.totalFare;
                        const fareStr = `$${fare}`;
                        const decimalPart = fare.toString().split(".")[1];
                        if (decimalPart && decimalPart.length === 1) {
                          return fareStr + "0";
                        }
                        return fareStr;
                      })()}
                    </TableCell>
                    <TableCell className="text-white">
                      {booking.pickup?.address}
                    </TableCell>
                    <TableCell className="text-white">
                      {booking.dropOff?.address ? (
                        `${booking.dropOff.address}`
                      ) : (
                        <span className="text-gray-400 italic">
                          No address provided
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={booking.isPTDW}
                        onCheckedChange={(checked) =>
                          handleTogglePTDW(booking.bookingId, checked)
                        }
                        className="data-[state=checked]:bg-[#F5EF1B] data-[state=unchecked]:bg-zinc-800 border-zinc-700"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2 sm:gap-0">
          <Button
            onClick={handlePrev}
              disabled={(page ?? 1) === 1}
            className="text-zinc-800 bg-[#F5EF1B] hover:bg-zinc-800 hover:text-[#F5EF1B] w-full sm:w-auto"
          >
            Previous
          </Button>
          <span className="text-sm text-[#F5EF1B]">
           Page {page ?? 1} - {totalPages ?? 0}
          </span>
          <Button
            onClick={handleNext}
              disabled={!(hasMore ?? true) || loading}
            className="text-zinc-800 bg-[#F5EF1B] hover:bg-zinc-800 hover:text-[#F5EF1B] w-full sm:w-auto"
          >
            Next
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
