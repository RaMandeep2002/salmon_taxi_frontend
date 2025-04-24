"use client";
import DashboardLayout from "../../DashBoardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { fetchBookingHistory } from "@/app/admin/slices/slice/booingHistorySlice";

export default function BookingHistory() {
  const dispatch = useDispatch<AppDispatch>();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 15;


  const {
    bookings: bookings,
    loading,
    error,
  } = useSelector((state: RootState) => state.fetchBookingHistory);
  useEffect(() => {
    dispatch(fetchBookingHistory());
  }, [dispatch]);

  const filteredBookings =
  bookings?.filter((booking) => {
    const matchesSearch =
    booking.driver?.drivername?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.pickup.address.toLowerCase().includes(searchTerm.toLowerCase()) 

    // const matchesStatus =
    //   filterStatus === "All" || driver.status === filterStatus;
    return matchesSearch;
  }) || [];


  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const paginatedBookings = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  // const [filterStatus, setFilterStatus] = useState("All");
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-[#F5EF1B]">
          Booking History
        </h1>

        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search by Driver Name, Pickup..."
              className="w-64 text-white border border-[#F5EF1B] placeholder-white"
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Button
              variant="outline"
              size="icon"
              className="bg-zinc-800 hover:bg-zinc-800 border border-[#F5EF1B]"
            >
              <Search className="h-4 w-4 text-[#F5EF1B]" />
            </Button>
          </div>

          {/* <DropdownMenu>
          <DropdownMenuTrigger asChild className="text-white bg-zinc-800 border border-[#F5EF1B]">
              <Button
                variant="outline"
                className="bg-zinc-800 hover:bg-zinc-800 text-white hover:text-white"
              >
                {filterStatus === "All" ? "Filter by Status" : filterStatus}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-zinc-800 hover:bg-zinc-800 text-white hover:text-white border border-[#F5EF1B]"
            >
              {["All", "completed", "busy", "not working"].map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={filterStatus === status}
                  onCheckedChange={() => setFilterStatus(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>

        <div className="border border-[#F5EF1B] rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="text-center border border-[#F5EF1B] ">
                {/* <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg ">
                  Booking ID
                </TableHead>
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                  Customer Name
                </TableHead> */}
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                  Booking Date
                </TableHead>
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                  Booking Time
                </TableHead>
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                  Driver
                </TableHead>
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                  Total Fare
                </TableHead>
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                  Distance
                </TableHead>
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                  Waiting Time
                </TableHead>
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                  Pickup
                </TableHead>
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                  Drop Off
                </TableHead>
                {/* <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                  Payment Status
                </TableHead> */}
                {/* <TableHead className="w-[100px] text-center">
                  Payment Method
                </TableHead> */}
                {/* <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                  Status
                </TableHead> */}
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
                paginatedBookings.map((booking) => (
                  <TableRow
                    className="text-center border border-[#F5EF1B]"
                    key={booking.bookingId}
                  >
                    {/* <TableCell className="font-medium w-[100px] h-[50px] text-center text-white text-lg ">
                      {booking.bookingId}
                    </TableCell>
                    <TableCell className="font-medium w-[100px] h-[50px] text-center text-white text-lg">
                      {booking.customerName}
                    </TableCell> */}
                    <TableCell className="text-center w-[100px] h-[50px]  text-white text-lg">
                      {`${booking.pickupDate}`}
                    </TableCell>
                    <TableCell className="text-center w-[100px] h-[50px]  text-white text-lg">
                      {`${booking.pickuptime}`}
                    </TableCell>
                    <TableCell className="text-center w-[100px] h-[50px]  text-white text-lg">
                      {!booking.driver?.drivername
                        ? "No driver assign"
                        : booking.driver?.drivername}
                    </TableCell>
                    <TableCell className="text-center w-[100px] h-[50px]  text-white text-lg">
                    {`$ ${booking.totalFare}`}
                    </TableCell>
                    <TableCell className="text-center w-[100px] h-[50px]  text-white text-lg">
                      {booking.distance}
                    </TableCell>
                    <TableCell className="text-center w-[100px] h-[50px]  text-white text-lg">
                      {booking.wating_time_formated}
                    </TableCell>
                    <TableCell className="text-center w-[100px] h-[50px]  text-white text-lg">
                      {/* {`${booking.pickup.latitude}, ${booking.pickup.longitude}`} */}
                      {`${booking.pickup.address}`}
                    </TableCell>
                    <TableCell className="text-center w-[100px] h-[50px]  text-white text-lg">
                      {/* {`${booking.dropOff.latitude}, ${booking.dropOff.longitude}`} */}
                      {`${booking.dropOff.address}`}
                    </TableCell>

                    {/* <TableCell className="text-center w-[100px] h-[50px]  text-white text-lg">
                      {booking.paymentStatus}
                    </TableCell> */}
                    {/* <TableCell className="text-center">{booking.totalFare}</TableCell> */}
                    {/* "pending", "accepted", "ongoing", "completed", "cancelled" */}
                    {/* <TableCell className="text-center text-white">
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
                    </TableCell> */}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="text-zinc-800 bg-[#F5EF1B] hover:bg-zinc-800 hover:text-[#F5EF1B]"
          >
            Previous
          </Button>
          <span className="text-sm text-[#F5EF1B]">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="text-zinc-800 bg-[#F5EF1B] hover:bg-zinc-800 hover:text-[#F5EF1B]"
          >
            Next
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
