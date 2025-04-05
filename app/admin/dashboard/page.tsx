"use client";
import DashboardLayout from "../DashBoardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAdminInfo } from "../slices/slice/adminslice";
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

// import CardLineChart from "../comman/Charts/page";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { data: admin } = useSelector(
    (state: RootState) => state.admin
  );
  const {
    bookings: bookings,
    loading,
    error,
  } = useSelector((state: RootState) => state.fetchBookingHistory);

  useEffect(() => {
    dispatch(fetchAdminInfo());
    dispatch(fetchBookingHistory());
    // console.log(error, isLoading);
  }, [dispatch]);

  // const [filterStatus, setFilterStatus] = useState("All");
  return (
    <DashboardLayout>
      <div className="max-w-full mx-auto p-8">
        {admin && (
          <h1 className="text-3xl font-bold mb-6 text-[#F5EF1B]">
            Welcome Admin, {admin.name}, {admin.email}
          </h1>
        )}

        <h1 className="font-bold p-4 text-2xl text-[#F5EF1B]">Gross Earning</h1>

        <div>
          <div className="border border-[#F5EF1B] rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="text-center border border-[#F5EF1B] ">
                  <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg ">
                    Booking ID
                  </TableHead>
                  <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                    Customer Name
                  </TableHead>
                  <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                    Booking Date
                  </TableHead>
                  <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                    Assign Driver
                  </TableHead>
                  <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                    Total Fare
                  </TableHead>
                  <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                    Pickup
                  </TableHead>
                  <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                    Drop Off
                  </TableHead>
                  <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                    Payment Status
                  </TableHead>
                  {/* <TableHead className="w-[100px] text-center">
                  Payment Method
                </TableHead> */}
                  <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-red-500">
                      Error: {error}
                    </TableCell>
                  </TableRow>
                ) : (
                  bookings.map((booking) => (
                    <TableRow
                      className="text-center border border-[#F5EF1B]"
                      key={booking.bookingId}
                    >
                      <TableCell className="font-medium w-[100px] h-[50px] text-center text-white text-lg ">
                        {booking.bookingId}
                      </TableCell>
                      <TableCell className="font-medium w-[100px] h-[50px] text-center text-white text-lg">
                        {booking.customerName}
                      </TableCell>
                      <TableCell className="text-center w-[100px] h-[50px]  text-white text-lg">
                        {booking.pickupDate}
                      </TableCell>
                      <TableCell className="text-center w-[100px] h-[50px]  text-white text-lg">
                        {!booking.driver?.drivername
                          ? "No driver assign"
                          : booking.driver?.drivername}
                      </TableCell>
                      <TableCell className="text-center w-[100px] h-[50px]  text-white text-lg">
                        {booking.totalFare}
                      </TableCell>
                      <TableCell className="text-center w-[100px] h-[50px]  text-white text-lg">
                        {/* {`${booking.pickup.latitude}, ${booking.pickup.longitude}`} */}
                        {`${booking.pickup.address}`}
                      </TableCell>
                      <TableCell className="text-center w-[100px] h-[50px]  text-white text-lg">
                        {/* {`${booking.dropOff.latitude}, ${booking.dropOff.longitude}`} */}
                        {`${booking.dropOff.address}`}
                      </TableCell>

                      <TableCell className="text-center w-[100px] h-[50px]  text-white text-lg">
                        {booking.paymentStatus}
                      </TableCell>
                      {/* <TableCell className="text-center">{booking.totalFare}</TableCell> */}
                      {/* "pending", "accepted", "ongoing", "completed", "cancelled" */}
                      <TableCell className="text-center text-white">
                        {" "}
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            booking.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "accepted"
                              ? "bg-yellow-100 text-yellow-800"
                              : booking.status === "ongoing"
                              ? "bg-blue-100 text-blue-800"
                              : booking.status === "pending"
                              ? "bg-gray-100 text-gray-800"
                              : booking.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
