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

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { bookings, loading, error } = useSelector(
    (state: RootState) => state.fetchBookingHistory
  );

  useEffect(() => {
    dispatch(fetchBookingHistory());
  }, [dispatch]);

  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const paginatedBookings = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <DashboardLayout>
      <div className="max-w-full mx-auto p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#F5EF1B]">
          Welcome Admin
        </h1>

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
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-red-500">
                      Error: {error}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedBookings.map((booking) => (
                    <TableRow
                      className="text-center border border-[#F5EF1B]"
                      key={booking.bookingId}
                    >
                      <TableCell className="text-white text-xs sm:text-sm">{booking.pickupDate}</TableCell>
                      <TableCell className="text-white text-xs sm:text-sm">{booking.pickuptime}</TableCell>
                      <TableCell className="text-white text-xs sm:text-sm">
                        {!booking.driver?.drivername
                          ? "No driver assigned"
                          : booking.driver.drivername}
                      </TableCell>
                      <TableCell className="text-white text-xs sm:text-sm">{booking.distance}</TableCell>
                      <TableCell className="text-white text-xs sm:text-sm">{booking.wating_time}</TableCell>
                      <TableCell className="text-white text-xs sm:text-sm">{`$ ${booking.totalFare}`}</TableCell>
                      <TableCell className="text-white text-xs sm:text-sm">{booking.pickup?.address}</TableCell>
                      <TableCell className="text-white text-xs sm:text-sm">{booking.dropOff?.address}</TableCell>
                    </TableRow>
                  ))
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
