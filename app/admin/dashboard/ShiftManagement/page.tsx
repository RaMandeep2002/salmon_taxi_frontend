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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Ban, Car, Clock10, List, User, Shield, Calendar, Activity, Zap, ChevronLeft, ChevronRight } from "lucide-react";
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
        {/* Table - Hidden on small screens */}
        <div className="hidden sm:block border border-[#F5EF1B] rounded-xl overflow-auto shadow-lg">
          <Table>
            <TableHeader className="bg-zinc-900/50">
              <TableRow className="border-b border-[#F5EF1B]/30 hover:bg-transparent">
                {[
                  { label: "Driver", icon: <User size={14} className="text-[#F5EF1B]/60" /> },
                  { label: "Vehicle", icon: <Car size={14} className="text-[#F5EF1B]/60" /> },
                  { label: "Start", icon: <Calendar size={14} className="text-[#F5EF1B]/60" /> },
                  { label: "End", icon: <Calendar size={14} className="text-[#F5EF1B]/60" /> },
                  { label: "Shift Status", icon: <Activity size={14} className="text-[#F5EF1B]/60" /> },
                  { label: "Vehicle Status", icon: <Shield size={14} className="text-[#F5EF1B]/60" /> },
                  { label: "Action", icon: <Zap size={14} className="text-[#F5EF1B]/60" /> }
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
                    {Array.from({ length: 7 }).map((_, j) => (
                      <TableCell key={j} className="py-4">
                        <div className="h-4 bg-zinc-800 rounded w-full"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-12 text-red-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-lg font-medium">Error Loading Data</span>
                      <p className="text-sm opacity-70">{error}</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : paginatedShifts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-12 text-zinc-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-lg font-medium">No shift data available</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedShifts.map((shift, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors group"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[#F5EF1B] border border-[#F5EF1B]/20">
                          {shift.driver.drivername.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-zinc-200 font-medium">
                          {highlightMatch(shift.driver.drivername, debouncedSearch)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-zinc-300">
                      {shift.vehicle.vehicleModel}
                    </TableCell>
                    <TableCell className="text-zinc-400 text-xs">
                      <div className="flex flex-col">
                        <span className="font-bold text-zinc-300">{shift.startTime}</span>
                        <span>{shift.startDate}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-zinc-400 text-xs">
                      {shift.endTime && shift.endDate ? (
                        <div className="flex flex-col">
                          <span className="font-bold text-zinc-300">{shift.endTime}</span>
                          <span>{shift.endDate}</span>
                        </div>
                      ) : (
                        <span className="text-green-500 font-bold italic animate-pulse">Ongoing</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          shift.isActive
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                        }`}
                      >
                        {shift.isActive ? "Active" : "Completed"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          shift.isActive
                            ? shift.vehicle.isAssigned
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : "bg-green-500/10 text-green-500 border-green-500/20"
                            : "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"
                        }`}
                      >
                        {shift.isActive
                          ? shift.vehicle.isAssigned
                            ? "Assigned"
                            : "Available"
                          : "Free"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8 px-4 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-red-900/20 disabled:opacity-30"
                        disabled={
                          !shift.isActive ||
                          stoppingDriverId === shift.driver.driverId
                        }
                        onClick={handleStopShiftDriver(shift.driver.driverId)}
                      >
                        {stoppingDriverId === shift.driver.driverId ? "Stopping..." : "Stop Shift"}
                      </Button>
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
          ) : paginatedShifts.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 border border-zinc-800 rounded-xl">
              <p>No shift data available</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {paginatedShifts.map((shift, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-zinc-800 bg-zinc-900/30 rounded-xl px-4 overflow-hidden"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3 text-left w-full">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-[#F5EF1B] border border-[#F5EF1B]/20 flex-shrink-0">
                        {shift.driver.drivername.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-[#F5EF1B] font-bold text-sm truncate">
                          {shift.driver.drivername}
                        </span>
                        <span className="text-zinc-400 text-xs truncate">
                          {shift.isActive ? "Ongoing Shift" : "Completed Shift"}
                        </span>
                      </div>
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${
                          shift.isActive ? "bg-green-500 animate-pulse" : "bg-zinc-600"
                        }`}
                      ></span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-2 border-t border-zinc-800/50">
                    <div className="space-y-4 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Vehicle</p>
                          <p className="text-zinc-200">{shift.vehicle.vehicleModel}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Shift Status</p>
                          <p className={shift.isActive ? "text-green-500 font-bold" : "text-zinc-500"}>
                            {shift.isActive ? "Active" : "Completed"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Start Time</p>
                          <p className="text-zinc-300">{shift.startTime} - {shift.startDate}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">End Time</p>
                          <p className="text-zinc-300">
                            {shift.endTime && shift.endDate ? `${shift.endTime} - ${shift.endDate}` : "Still Ongoing"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Vehicle Status</p>
                          <p className={`text-xs font-bold ${shift.isActive ? "text-blue-400" : "text-zinc-500"}`}>
                            {shift.isActive ? (shift.vehicle.isAssigned ? "Assigned" : "Available") : "Free"}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8 px-4 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-red-900/20 disabled:opacity-30"
                          disabled={
                            !shift.isActive ||
                            stoppingDriverId === shift.driver.driverId
                          }
                          onClick={handleStopShiftDriver(shift.driver.driverId)}
                        >
                          {stoppingDriverId === shift.driver.driverId ? "Stopping..." : "Stop Shift"}
                        </Button>
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
            disabled={currentPage === 1}
            variant="outline"
            className="border-zinc-700 bg-transparent text-zinc-400 hover:bg-[#F5EF1B] hover:text-zinc-950 hover:border-[#F5EF1B] transition-all rounded-lg px-6"
          >
            <ChevronLeft size={16} className="mr-2" />
            Previous
          </Button>
          
          <div className="flex items-center gap-2 px-4 py-1.5 bg-zinc-800/50 rounded-full border border-zinc-700/50 shadow-inner">
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Page</span>
            <span className="text-sm font-bold text-[#F5EF1B]">{currentPage}</span>
            <span className="text-zinc-600">/</span>
            <span className="text-sm font-medium text-zinc-400">{totalPages}</span>
          </div>

          <Button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="bg-[#F5EF1B] text-zinc-950 hover:bg-[#F5EF1B]/90 transition-all rounded-lg px-8 font-bold shadow-lg shadow-[#F5EF1B]/10"
          >
            Next
            <ChevronRight size={16} className="ml-2" />
          </Button>
        </div>
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
