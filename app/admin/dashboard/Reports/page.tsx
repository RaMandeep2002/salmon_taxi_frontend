"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "../../DashBoardLayout";
import { Button } from "@/components/ui/button";
import {
  Download,
  Calendar,
  Clock,
  User,
  Navigation,
  Timer,
  DollarSign,
  MapPin,
  Activity,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Hash,
} from "lucide-react";
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
import {
  fetchPaginatedBookingHistory,
  setPage,
} from "../../slices/slice/paginaatedBookingSlice";
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
  const { bookings, loading, error, page, limit, hasMore, totalPages } =
    useSelector((state: RootState) => state.fetchPaginatedBookingHistory);
  const { isDownloading, iserror } = useSelector(
    (state: RootState) => state.getBookingReport,
  );
  const { toast } = useToast();

  // Convert YYYY-MM-DD to MM/DD/YYYY for comparison and API consistency
  const convertDateFormat = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    if (!year || !month || !day) return "";
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    const formattedFrom = convertDateFormat(fromDate);
    const formattedTo = convertDateFormat(toDate);

    dispatch(
      fetchPaginatedBookingHistory({
        page: page ?? 1,
        limit: limit ?? 15,
        fromDate: formattedFrom,
        toDate: formattedTo,
        pickup: debouncedPickupSearch,
        drivername: debouncedDriverSearch,
      }),
    );
  }, [
    dispatch,
    page,
    limit,
    fromDate,
    toDate,
    debouncedPickupSearch,
    debouncedDriverSearch,
  ]);

  // Reset page to 1 whenever filters change
  useEffect(() => {
    dispatch(setPage(1));
  }, [
    dispatch,
    fromDate,
    toDate,
    debouncedPickupSearch,
    debouncedDriverSearch,
  ]);

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

    try {
      dispatch(
        getBookingReport({
          fromDate: convertDateFormat(fromDate),
          toDate: convertDateFormat(toDate),
          pickup,
          drivername,
        }),
      ).unwrap();
      toast({
        title: "Success",
        description: "Report downloaded successfully.",
        variant: "default",
      });
    } catch (err: unknown) {
      toast({
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to download report.",
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

      dispatch(
        fetchPaginatedBookingHistory({
          page: page ?? 1,
          limit: limit ?? 15,
          fromDate: formattedFrom,
          toDate: formattedTo,
          pickup: debouncedPickupSearch,
          drivername: debouncedDriverSearch,
        }),
      );
    } catch (err: unknown) {
      toast({
        title: "Error",
        description:
          err instanceof Error
            ? err.message
            : "Failed to update booking status.",
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
        <form onSubmit={handleDownload} className="w-full mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-zinc-500 flex items-center gap-1">
                <Calendar size={10} /> From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3 py-2 text-white border border-zinc-800 bg-zinc-900/50 hover:border-[#F5EF1B]/50 focus:border-[#F5EF1B] outline-none rounded-lg transition-all appearance-none [&::-webkit-calendar-picker-indicator]:invert placeholder:text-zinc-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-zinc-500 flex items-center gap-1">
                <Calendar size={10} /> To Date
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-3 py-2 text-white border border-zinc-800 bg-zinc-900/50 hover:border-[#F5EF1B]/50 focus:border-[#F5EF1B] outline-none rounded-lg transition-all appearance-none [&::-webkit-calendar-picker-indicator]:invert placeholder:text-zinc-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-zinc-500 flex items-center gap-1">
                <MapPin size={10} /> Pickup
              </label>
              <input
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Search pickup..."
                className="w-full px-3 py-2 text-white border border-zinc-800 bg-zinc-900/50 hover:border-[#F5EF1B]/50 focus:border-[#F5EF1B] outline-none rounded-lg transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-zinc-500 flex items-center gap-1">
                <User size={10} /> Driver
              </label>
              <input
                value={drivername}
                onChange={(e) => setDrivername(e.target.value)}
                placeholder="Search driver..."
                className="w-full px-3 py-2 text-white border border-zinc-800 bg-zinc-900/50 hover:border-[#F5EF1B]/50 focus:border-[#F5EF1B] outline-none rounded-lg transition-all"
              />
            </div>
            <button
              type="submit"
              className="h-[42px] px-4 bg-[#F5EF1B] hover:bg-[#F5EF1B]/90 text-zinc-950 font-bold flex items-center justify-center gap-2 rounded-lg transition-all active:scale-[0.98] disabled:opacity-50"
              disabled={isDownloading}
            >
              <Download size={18} />
              {isDownloading ? "..." : "Export"}
            </button>
            <button
              type="button"
              className="h-[42px] px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium flex items-center justify-center gap-2 rounded-lg transition-all active:scale-[0.98]"
              onClick={() => {
                setFromDate("");
                setToDate("");
                setPickup("");
                setDrivername("");
              }}
              disabled={isDownloading}
            >
              <Trash2 size={18} />
              Clear
            </button>
          </div>
          {iserror && <p className="text-red-500 text-sm mt-2">{iserror}</p>}
        </form>

        {/* Table */}
        <div className="border border-[#F5EF1B] rounded-xl overflow-auto shadow-lg">
          <Table>
            <TableHeader className="bg-zinc-900/50">
              <TableRow className="border-b border-[#F5EF1B]/30 hover:bg-transparent">
                {[
                  {
                    label: "Trip ID",
                    icon: <Hash size={14} className="text-[#F5EF1B]/60" />,
                  },
                  {
                    label: "Date",
                    icon: <Calendar size={14} className="text-[#F5EF1B]/60" />,
                  },
                  {
                    label: "Pickup",
                    icon: <Clock size={14} className="text-[#F5EF1B]/60" />,
                  },
                  {
                    label: "Drop-Off",
                    icon: <Clock size={14} className="text-[#F5EF1B]/60" />,
                  },
                  {
                    label: "Driver",
                    icon: <User size={14} className="text-[#F5EF1B]/60" />,
                  },
                  {
                    label: "Dist.",
                    icon: (
                      <Navigation size={14} className="text-[#F5EF1B]/60" />
                    ),
                  },
                  {
                    label: "Wait",
                    icon: <Timer size={14} className="text-[#F5EF1B]/60" />,
                  },
                  {
                    label: "Fare",
                    icon: (
                      <DollarSign size={14} className="text-[#F5EF1B]/60" />
                    ),
                  },
                  {
                    label: "Pickup Address",
                    icon: <MapPin size={14} className="text-[#F5EF1B]/60" />,
                  },
                  {
                    label: "Drop Address",
                    icon: <MapPin size={14} className="text-[#F5EF1B]/60" />,
                  },
                  {
                    label: "OFF RECORD",
                    icon: <Activity size={14} className="text-[#F5EF1B]/60" />,
                  },
                ].map((header) => (
                  <TableHead
                    key={header.label}
                    className="py-4 font-semibold text-[#F5EF1B] uppercase text-[10px] tracking-wider"
                  >
                    <div className="flex items-center gap-2">
                      {header.icon}
                      {header.label}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow
                    key={i}
                    className="border-b border-zinc-800 animate-pulse"
                  >
                    {Array.from({ length: 10 }).map((_, j) => (
                      <TableCell key={j} className="py-4">
                        <div className="h-4 bg-zinc-800 rounded w-full"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-12 text-red-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-lg font-medium">
                        Error Loading Data
                      </span>
                      <p className="text-sm opacity-70">{error}</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : bookings.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-12 text-zinc-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-lg font-medium">
                        No bookings found
                      </span>
                      <p className="text-sm">Try adjusting your filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow
                    key={booking.bookingId}
                    className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors group"
                  >
                    <TableCell className="text-zinc-300 font-medium whitespace-nowrap">
                      {booking.bookingId}
                    </TableCell>
                    <TableCell className="text-zinc-300 font-medium whitespace-nowrap">
                      {booking.pickupDate}
                    </TableCell>
                    <TableCell className="text-zinc-400 text-sm">
                      {booking.pickuptime}
                    </TableCell>
                    <TableCell className="text-zinc-400 text-sm">
                      {booking.dropdownTime}
                    </TableCell>
                    <TableCell>
                      {booking.driver?.drivername ? (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[#F5EF1B] border border-[#F5EF1B]/20">
                            {booking.driver.drivername.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-zinc-200">
                            {booking.driver.drivername}
                          </span>
                        </div>
                      ) : (
                        <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-500 text-xs border border-zinc-700 italic">
                          Unassigned
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-zinc-300">
                      {booking.distance}
                    </TableCell>
                    <TableCell className="text-zinc-400 text-sm">
                      {booking.wating_time_formated || "00:00:00"}
                    </TableCell>
                    <TableCell className="text-[#F5EF1B] font-bold">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(booking.totalFare)}
                    </TableCell>
                    <TableCell className="max-w-[150px]">
                      <div
                        className="text-zinc-300 truncate text-sm"
                        title={booking.pickup?.address}
                      >
                        {booking.pickup?.address}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[150px]">
                      {booking.dropOff?.address ? (
                        <div
                          className="text-zinc-300 truncate text-sm"
                          title={booking.dropOff.address}
                        >
                          {booking.dropOff.address}
                        </div>
                      ) : (
                        <span className="text-zinc-600 italic text-xs">
                          N/A
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={booking.isPTDW}
                          onCheckedChange={(checked) =>
                            handleTogglePTDW(booking.bookingId, checked)
                          }
                          className="data-[state=checked]:bg-[#F5EF1B] data-[state=unchecked]:bg-zinc-800 border-zinc-700 scale-90"
                        />
                        <span className="text-[10px] uppercase tracking-tighter text-zinc-500 font-bold group-hover:text-zinc-400">
                          {booking.isPTDW ? "OFF RECORD" : "ON RECORD"}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 p-4 bg-zinc-900/30 rounded-xl border border-zinc-800/50 gap-4 sm:gap-0">
          <Button
            onClick={handlePrev}
            disabled={(page ?? 1) === 1}
            variant="outline"
            className="border-zinc-700 bg-transparent text-zinc-400 hover:bg-[#F5EF1B] hover:text-zinc-950 hover:border-[#F5EF1B] transition-all rounded-lg px-6"
          >
            <ChevronLeft size={16} className="mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2 px-4 py-1.5 bg-zinc-800/50 rounded-full border border-zinc-700/50 shadow-inner">
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">
              Page
            </span>
            <span className="text-sm font-bold text-[#F5EF1B]">
              {page ?? 1}
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-sm font-medium text-zinc-400">
              {totalPages ?? 0}
            </span>
          </div>

          <Button
            onClick={handleNext}
            disabled={!(hasMore ?? true) || loading}
            className="bg-[#F5EF1B] text-zinc-950 hover:bg-[#F5EF1B]/90 transition-all rounded-lg px-8 font-bold shadow-lg shadow-[#F5EF1B]/10"
          >
            Next
            <ChevronRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
