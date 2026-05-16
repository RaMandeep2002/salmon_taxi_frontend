"use client";
import DashboardLayout from "../DashBoardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/app/store/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { fetchBookingHistory } from "../slices/slice/booingHistorySlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  BookText,
  Car,
  Route,
  Users,
  Calendar,
  Clock,
  User,
  Navigation,
  Timer,
  DollarSign,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Hash,
} from "lucide-react";
import { fetchDashboardStats } from "../slices/slice/getCountSlice";
import {
  fetchPaginatedBookingHistory,
  setPage,
} from "../slices/slice/paginaatedBookingSlice";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
};

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-[#F5EF1B] shadow-xl rounded-xl p-6 flex items-center transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-yellow-300/70 hover:shadow-yellow-500/50">
      <div className="p-4 mr-5 flex justify-center items-center border-2 border-[#F5EF1B]/60">
        <span className="text-4xl">{icon}</span>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase text-black mb-1 tracking-wider">
          {title}
        </p>
        <p className="text-3xl font-extrabold text-black drop-shadow-sm">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();

  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 15;

  const { bookings, loading, error, page, limit, hasMore, totalPages } =
    useSelector((state: RootState) => state.fetchPaginatedBookingHistory);
  const { data, iserror } = useSelector(
    (state: RootState) => state.dashboardStats,
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchPaginatedBookingHistory({ page: page ?? 1, limit: limit ?? 15 }),
    );
  }, [dispatch, page, limit]);

  // const totalPages = Math.ceil(bookings.length / itemsPerPage);
  // const paginatedBookings = bookings.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  // const handleNext = () =>
  //   setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  // const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleNext = () => dispatch(setPage((page ?? 1) + 1));
  const handlePrev = () => dispatch(setPage(Math.max((page ?? 1) - 1, 1)));

  return (
    <DashboardLayout>
      <div className="max-w-full mx-auto p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#F5EF1B]">
          Welcome Admin
        </h1>
        <div className="mb-5">
          {iserror ? (
            <p className="text-white text-center text-sm sm:text-base col-span-3">
              {iserror}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <StatCard
                title="Total Drivers"
                value={data.driverCount}
                icon={<Users className="h-6 w-6" />}
              />
              <StatCard
                title="Total Vehicles"
                value={data.vehicleCount}
                icon={<Car className="h-6 w-6" />}
              />
              <StatCard
                title="Total Rides"
                value={data.bookingCount}
                icon={<Route className="h-6 w-6" />}
              />
              <StatCard
                title="Total Shifts"
                value={data.shiftsCount}
                icon={<BookText className="h-6 w-6" />}
              />
            </div>
          )}
        </div>

        <h4 className="text-xl sm:text-xl font-bold mb-4 sm:mb-6 text-[#F5EF1B]">
          Bookings
        </h4>
        <div className="hidden sm:block border border-[#F5EF1B] rounded-xl overflow-auto shadow-lg">
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
                    label: "Time",
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
                    label: "Pickup",
                    icon: <MapPin size={14} className="text-[#F5EF1B]/60" />,
                  },
                  {
                    label: "Drop-off",
                    icon: <MapPin size={14} className="text-[#F5EF1B]/60" />,
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
                    {Array.from({ length: 8 }).map((_, j) => (
                      <TableCell key={j} className="py-4">
                        <div className="h-4 bg-zinc-800 rounded w-full"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
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
                    colSpan={8}
                    className="text-center py-12 text-zinc-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-lg font-medium">
                        No bookings found
                      </span>
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
                      {booking.bookingId || "N/A"}
                    </TableCell>
                    <TableCell className="text-zinc-300 font-medium whitespace-nowrap">
                      {booking.pickupDate || "N/A"}
                    </TableCell>
                    <TableCell className="text-zinc-400 text-sm">
                      {booking.pickuptime || "N/A"}
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
                      {booking.distance || "0"}
                    </TableCell>
                    <TableCell className="text-zinc-400 text-sm">
                      {booking.wating_time_formated || "00:00:00"}
                    </TableCell>
                    <TableCell className="text-[#F5EF1B] font-bold">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(booking.totalFare || 0)}
                    </TableCell>
                    <TableCell className="max-w-[150px]">
                      <div
                        className="text-zinc-300 truncate text-sm"
                        title={booking.pickup?.address}
                      >
                        {booking.pickup?.address || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[150px]">
                      <div
                        className="text-zinc-300 truncate text-sm"
                        title={booking.dropOff?.address}
                      >
                        {booking.dropOff?.address || "N/A"}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Accordion - Mobile View */}
        <div className="block sm:hidden">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-zinc-900/50 border border-zinc-800 animate-pulse rounded-lg"
                ></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-400 border border-zinc-800 rounded-xl">
              <p>{error}</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 border border-zinc-800 rounded-xl">
              <p>No bookings found</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {bookings.map((booking) => (
                <AccordionItem
                  key={booking.bookingId}
                  value={booking.bookingId}
                  className="border border-zinc-800 bg-zinc-900/30 rounded-xl px-4 overflow-hidden"
                >
                  <AccordionTrigger className="group w-full hover:no-underline px-4 py-4 sm:px-5 sm:py-5">
                    <div className="w-full min-w-0 space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-zinc-500">
                            <Hash size={13} className="text-[#F5EF1B]" />
                            <span>Trip</span>
                            <span className="truncate text-zinc-300">
                              {booking.bookingId}
                            </span>
                          </div>
                        </div>

                        {booking.driver?.drivername && (
                          <div className="flex max-w-[130px] shrink-0 items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-2 py-1">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F5EF1B] text-[10px] font-black text-black">
                              {booking.driver.drivername
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                            <span className="truncate text-[11px] font-semibold text-zinc-300">
                              {booking.driver.drivername}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Journey */}
                      <div className="grid grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)]">
                        {/* Pickup */}
                        <div className="min-w-0">
                          <div className="text-[11px] font-bold uppercase tracking-wide text-zinc-500">
                            Pickup
                          </div>
                          <div className="mt-1 truncate text-2xl font-black leading-none text-white sm:text-3xl">
                            {booking.pickuptime}
                          </div>
                          <div className="mt-2 truncate text-[10px] font-extrabold uppercase tracking-wide text-[#F5EF1B]">
                            {booking.pickup?.address?.split(",")[0] || "---"}
                          </div>
                        </div>

                        {/* Middle path */}
                        <div className="flex min-w-0 flex-col items-center justify-center">
                          <div className="mb-1 max-w-full truncate text-[10px] font-bold text-zinc-500">
                            {booking.distance || "0 km"}
                          </div>

                          <div className="relative flex w-full items-center justify-center">
                            <div className="h-px w-full border-t border-dashed border-zinc-700" />
                            <div className="absolute flex h-8 w-8 items-center justify-center">
                              <Car size={15} className="text-[#F5EF1B]" />
                            </div>
                          </div>

                          <div className="mt-2 text-[10px] font-semibold text-zinc-500">
                            Taxi
                          </div>
                        </div>

                        {/* Dropoff */}
                        <div className="min-w-0 text-right">
                          <div className="text-[11px] font-bold uppercase tracking-wide text-zinc-500">
                            Drop
                          </div>
                          <div className="mt-1 truncate text-2xl font-black leading-none text-white sm:text-3xl">
                            {booking.dropdownTime || "0"}
                          </div>
                          <div className="mt-2 truncate text-[10px] font-extrabold uppercase tracking-wide text-[#F5EF1B]">
                            {booking.dropOff?.address?.split(",")[0] || "---"}
                          </div>
                        </div>
                      </div>

                      {/* Addresses */}
                      <div className="grid gap-2 border-t border-zinc-800/70 pt-3 text-[11px] font-medium text-zinc-500 sm:grid-cols-2 sm:gap-4">
                        <div className="flex min-w-0 items-center gap-2 rounded-md bg-zinc-950/40 px-2.5 py-2">
                          <MapPin
                            size={13}
                            className="shrink-0 text-[#F5EF1B]"
                          />
                          <span className="truncate">
                            {booking.pickup?.address || "No pickup address"}
                          </span>
                        </div>

                        <div className="flex min-w-0 items-center gap-2 rounded-md bg-zinc-950/40 px-2.5 py-2 sm:justify-end">
                          <MapPin
                            size={13}
                            className="shrink-0 text-[#F5EF1B] sm:order-2"
                          />
                          <span className="truncate sm:text-right">
                            {booking.dropOff?.address || "No drop address"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pb-4 pt-2 border-t border-zinc-800/50">
                    <div className="space-y-4 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">
                            Driver
                          </p>
                          <p className="text-zinc-200">
                            {booking.driver?.drivername || "Unassigned"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">
                            Distance
                          </p>
                          <p className="text-zinc-200">
                            {booking.distance || "0"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">
                            Wait Time
                          </p>
                          <p className="text-zinc-200">
                            {booking.wating_time_formated || "00:00:00"}
                          </p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-zinc-800/50">
                        <div className="flex items-start gap-2 mb-3">
                          <MapPin
                            size={14}
                            className="text-zinc-500 mt-0.5 flex-shrink-0"
                          />
                          <p className="text-zinc-300 text-xs leading-relaxed">
                            {booking.pickup?.address || "N/A"}
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin
                            size={14}
                            className="text-zinc-500 mt-0.5 flex-shrink-0"
                          />
                          <p className="text-zinc-300 text-xs leading-relaxed">
                            {booking.dropOff?.address || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
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
