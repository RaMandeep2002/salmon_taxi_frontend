"use client";
import DashboardLayout from "../../DashBoardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ChevronDown, 
  Calendar, 
  Clock, 
  User, 
  DollarSign, 
  Navigation, 
  Timer, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  Hash
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { useDebounce } from "@/lib/useDebounce";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { fetchPaginatedBookingHistory, setPage } from "../../slices/slice/paginaatedBookingSlice";

// import ServerTime from "@/app/components/LocalTime";
// import ServerTime from "@/app/components/LocalTime";

export default function BookingHistory() {
  const dispatch = useDispatch<AppDispatch>();

  // const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  // const itemsPerPage = 15;

  const [filterStatus, setFilterStatus] = useState("All");


  const {
    bookings: bookings,
    loading,
    error,
      page,limit,hasMore, totalPages 
  } = useSelector((state: RootState) => state.fetchPaginatedBookingHistory);

  useEffect(() => {
    dispatch(fetchPaginatedBookingHistory({ page: page ?? 1, limit: limit ?? 15 }));  
  }, [dispatch, page, limit]);


  const matchesStatus = ["All", ...new Set(bookings.map(b => b.driver?.drivername || "No driver assign"))];

  const filteredBookings =
  bookings?.filter((booking) => {
    const matchesSearch =
    booking.driver?.drivername?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    booking.pickup.address.toLowerCase().includes(debouncedSearch.toLowerCase()) 

    const matchesFilterStatus =
    filterStatus === "All" || booking.driver?.drivername === filterStatus;

  return matchesSearch && matchesFilterStatus;
  }) || [];

  // const totalPages = Math.ceil(bookings.length / itemsPerPage);

  // const paginatedBookings = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  // const totalPages = Math.ceil(bookings.length / itemsPerPage);

  // const paginatedBookings = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


   const handleNext = () => dispatch(setPage((page ?? 1) + 1));
  const handlePrev = () => dispatch(setPage(Math.max((page ?? 1) - 1, 1)));

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-[#F5EF1B]">
          Booking History
        </h1>

        <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
            <Input
              placeholder="Search by Driver Name, Pickup..."
              className="w-full sm:w-64 text-white border border-[#F5EF1B] placeholder-white"
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

        {/* Table - Hidden on small screens */}
        <div className="hidden sm:block border border-[#F5EF1B] rounded-xl overflow-auto shadow-lg">
          <Table>
            <TableHeader className="bg-zinc-900/50">
              <TableRow className="border-b border-[#F5EF1B]/30 hover:bg-transparent">
                {[
                  { label: "Trip ID", icon: <Hash size={14} className="text-[#F5EF1B]/60" /> },
                  { label: "Date", icon: <Calendar size={14} className="text-[#F5EF1B]/60" /> },
                  { label: "Pickup", icon: <Clock size={14} className="text-[#F5EF1B]/60" /> },
                  { label: "Drop-Off", icon: <Clock size={14} className="text-[#F5EF1B]/60" /> },
                  { label: "Driver", icon: <User size={14} className="text-[#F5EF1B]/60" /> },
                  { label: "Fare", icon: <DollarSign size={14} className="text-[#F5EF1B]/60" /> },
                  { label: "Dist.", icon: <Navigation size={14} className="text-[#F5EF1B]/60" /> },
                  { label: "Wait", icon: <Timer size={14} className="text-[#F5EF1B]/60" /> },
                  { label: "Pickup Address", icon: <MapPin size={14} className="text-[#F5EF1B]/60" /> },
                  { label: "Drop Address", icon: <MapPin size={14} className="text-[#F5EF1B]/60" /> }
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
                  <TableRow key={i} className="border-b border-zinc-800 animate-pulse">
                    {Array.from({ length: 9 }).map((_, j) => (
                      <TableCell key={j} className="py-4">
                        <div className="h-4 bg-zinc-800 rounded w-full"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-12 text-red-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-lg font-medium">Error Loading Data</span>
                      <p className="text-sm opacity-70">{error}</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-12 text-zinc-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-lg font-medium">No bookings found</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((booking) => (
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
                            {highlightMatch(booking.driver.drivername, debouncedSearch)}
                          </span>
                        </div>
                      ) : (
                        <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-500 text-xs border border-zinc-700 italic">
                          Unassigned
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-[#F5EF1B] font-bold">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(booking.totalFare)}
                    </TableCell>
                    <TableCell className="text-zinc-300">
                      {booking.distance}
                    </TableCell>
                    <TableCell className="text-zinc-400 text-sm">
                      {booking.wating_time_formated || "00:00:00"}
                    </TableCell>
                    <TableCell className="max-w-[150px]">
                      <div className="text-zinc-300 truncate text-sm" title={booking.pickup?.address}>
                        {highlightMatch(booking.pickup?.address || "", debouncedSearch)}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[150px]">
                      {booking.dropOff?.address ? (
                        <div className="text-zinc-300 truncate text-sm" title={booking.dropOff.address}>
                          {booking.dropOff.address}
                        </div>
                      ) : (
                        <span className="text-zinc-600 italic text-xs">N/A</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Accordion - Shown on small screens */}
        <div className="block sm:hidden">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-16 bg-zinc-900/50 border border-zinc-800 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-400 border border-zinc-800 rounded-xl">
              <p>{error}</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 border border-zinc-800 rounded-xl">
              <p>No bookings found</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredBookings.map((booking) => (
                <AccordionItem
                  key={booking.bookingId}
                  value={booking.bookingId}
                  className="border border-zinc-800 bg-zinc-900/30 rounded-xl px-4 overflow-hidden"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-[#F5EF1B] border border-[#F5EF1B]/20 flex-shrink-0">
                        {booking.driver?.drivername?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[#F5EF1B] font-bold text-sm truncate">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(booking.totalFare)}
                        </span>
                        <span className="text-zinc-400 text-xs truncate">
                          {booking.pickupDate} • {booking.pickuptime}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-2 border-t border-zinc-800/50">
                    <div className="space-y-4 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Driver</p>
                          <p className="text-zinc-200">{booking.driver?.drivername || "Unassigned"}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Distance</p>
                          <p className="text-zinc-200">{booking.distance}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Wait Time</p>
                          <p className="text-zinc-200">{booking.wating_time_formated || "00:00:00"}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Drop-Off</p>
                          <p className="text-zinc-300 text-xs">{booking.dropdownTime}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Pickup Address</p>
                        <p className="text-zinc-300 text-xs leading-relaxed">{booking.pickup?.address}</p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Drop Address</p>
                        <p className="text-zinc-300 text-xs leading-relaxed">{booking.dropOff?.address || "N/A"}</p>
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
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Page</span>
            <span className="text-sm font-bold text-[#F5EF1B]">{page ?? 1}</span>
            <span className="text-zinc-600">/</span>
            <span className="text-sm font-medium text-zinc-400">{totalPages ?? 0}</span>
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



const highlightMatch = (text: string, term: string) => { 
  if(!text) return text;
  const regex = new RegExp(`(${term})`, "gi");
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: text.replace(regex, `<mark class="bg-yellow-300">$1</mark>`),
      }}
    />
  );
};
