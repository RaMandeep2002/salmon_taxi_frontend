"use client";
import DashboardLayout from "../DashBoardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/app/store/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchBookingHistory } from "../slices/slice/booingHistorySlice";
import { Button } from "@/components/ui/button";
import { BookText, Car, Route, Users } from "lucide-react";
import { fetchDashboardStats } from "../slices/slice/getCountSlice";

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
        <p className="text-xs font-semibold uppercase text-black mb-1 tracking-wider">{title}</p>
        <p className="text-3xl font-extrabold text-black drop-shadow-sm">{value}</p>
      </div>
    </div>  
  );
}

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


    const { bookings, loading, error } = useSelector(
      (state: RootState) => state.fetchBookingHistory
    );
  const { data, iserror } = useSelector(
    (state: RootState) => state.dashboardStats
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchBookingHistory());
  }, [dispatch]);



  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const paginatedBookings = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));


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
        <div className="border border-[#F5EF1B] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow className="text-center border border-[#F5EF1B]">
                  {[
                    "Booking Date",
                    "Booking Time",
                    "Driver",
                    "Distance",
                    "Waiting Time",
                    "Total Fare",
                    "Pickup",
                    "Drop Off",
                  ].map((heading) => (
                    <TableHead
                      key={heading}
                      className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm"
                    >
                      {heading}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                     [...Array(5)].map((_, idx) => (
                      <TableRow key={idx} className="text-center border border-[#F5EF1B]">
                        {Array.from({ length: 8 }).map((__, i) => (
                          <TableCell key={i} className="text-xs sm:text-sm">
                            <div className="animate-pulse bg-gray-700 rounded h-6 w-full mx-auto"></div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-white">
                      {error}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedBookings.length > 0 ? (
                    bookings.map((booking) => (
                      <TableRow
                        className="text-center border border-[#F5EF1B]"
                        key={booking.bookingId}
                      >
                        <TableCell className="text-white text-xs sm:text-sm">
                          {booking.pickupDate || "N/A"}
                        </TableCell>
                        <TableCell className="text-white text-xs sm:text-sm">
                          {booking.pickuptime || "N/A"}
                        </TableCell>
                        <TableCell className="text-white text-xs sm:text-sm">
                          {booking.driver?.drivername || "No driver assigned"}
                        </TableCell>
                        <TableCell className="text-white text-xs sm:text-sm">
                          {booking.distance || "0"}
                        </TableCell>
                        <TableCell className="text-white text-xs sm:text-sm">
                          {booking.wating_time_formated || "0"}
                        </TableCell>
                        <TableCell className="text-white text-xs sm:text-sm">{`$${booking.totalFare}`}</TableCell>
                        <TableCell className="text-white text-xs sm:text-sm">
                          {booking.pickup?.address || "N/A"}
                        </TableCell>
                        <TableCell className="text-white text-xs sm:text-sm">
                          {booking.dropOff?.address || "N/A"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-white">
                        No bookings found.
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
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
