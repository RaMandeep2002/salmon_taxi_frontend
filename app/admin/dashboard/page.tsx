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
import { fetchBookingHistory, setPage } from "../slices/slice/booingHistorySlice";
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
    <div className=" bg-[#F5EF1B] shadow-xl rounded-xl p-6 flex items-center transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-yellow-300/70">
      <div className="rounded-full shadow-md p-4 mr-5 flex justify-center items-center border-2 border-[#F5EF1B]/60">
        <span className="text-yellow-600 text-3xl">{icon}</span>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase text-yellow-900 mb-1 tracking-wider">{title}</p>
        <p className="text-3xl font-extrabold text-yellow-900 drop-shadow-sm">{value}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();

    const { bookings, loading, error, page, limit,hasMore, totalPages } = useSelector(
      (state: RootState) => state.fetchBookingHistory
    );
  const { data, iserror } = useSelector(
    (state: RootState) => state.dashboardStats
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchBookingHistory({ page, limit }));
  }, [dispatch, page, limit]);

  const handleNext = () => dispatch(setPage(page + 1));
  const handlePrev = () => dispatch(setPage(Math.max(page - 1, 1)));

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
                ) : (
                  bookings.length > 0 ? (
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
            disabled={page === 1 || loading}
            className="text-zinc-800 bg-[#F5EF1B] hover:bg-zinc-800 hover:text-[#F5EF1B] w-full sm:w-auto"
          >
            Previous
          </Button>
          <span className="text-sm text-[#F5EF1B]">
            Page {page} - {totalPages}
          </span>
          <Button
            onClick={handleNext}
            disabled={!hasMore || loading}
            className="text-zinc-800 bg-[#F5EF1B] hover:bg-zinc-800 hover:text-[#F5EF1B] w-full sm:w-auto"
          >
            Next
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
