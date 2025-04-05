"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, Search, Pencil, Trash2, Eye } from "lucide-react";

import { fetchdriverdetails } from "@/app/admin/slices/slice/fetchingDriversSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import DashboardLayout from "@/app/admin/DashBoardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Drivers } from "@/app/types/types";
import { useRouter } from "next/navigation";

export default function DriverList() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: drivers,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.driversFetching);

  const [selectedDriver, setSelectedDriver] = useState<Drivers | null>(null);

  const router = useRouter();

  // Local state for search & filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All"); // Default to "All"

  useEffect(() => {
    dispatch(fetchdriverdetails());
  }, [dispatch]);

  // Filtered & searched drivers
  const filteredDrivers = drivers?.filter((driver) => {
    // Search filter (by name, email, or driver ID)
    const matchesSearch =
      driver.drivername.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.driverId.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter (Only apply if filterStatus is not "All")
    const matchesStatus =
      filterStatus === "All" || driver.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-[#F5EF1B]">Driver List</h1>

        {/* Search & Filter Section */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search by name, email, or driver ID..."
              className="w-64  text-white border border-[#F5EF1B] placeholder-white"
              value={searchTerm}
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

          {/* Filter Dropdown */}
          <DropdownMenu>
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
              {["All", "available", "busy", "not working"].map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={filterStatus === status}
                  onCheckedChange={() => setFilterStatus(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Driver Table */}
        <div className="border border-[#F5EF1B] rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
            <TableRow className="text-center border border-[#F5EF1B] ">
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg ">
                  Driver Id
                </TableHead>
                {/* <TableHead className="w-[100px]">Driver ID</TableHead> */}
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg ">
                  Name
                </TableHead>
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg ">
                  Email
                </TableHead>
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg ">
                  Phone Number
                </TableHead>
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg ">
                  License Number
                </TableHead>
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg ">
                  Status
                </TableHead>
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg ">
                  Actions
                </TableHead>
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg ">
                  Register Vehicle
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
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
              ) : filteredDrivers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No drivers found
                  </TableCell>
                </TableRow>
              ) : (
                filteredDrivers.map((driver) => (
                  <TableRow className="text-center border border-[#F5EF1B]" key={driver._id}>
                    <TableCell className="font-medium w-[100px] h-[50px] text-center text-white text-lg">
                      {driver._id}
                    </TableCell>
                    {/* <TableCell className="font-medium">
                      {driver.driverId}
                    </TableCell> */}
                    <TableCell className="font-medium w-[100px] h-[50px] text-center text-white text-lg">
                      {driver.drivername}
                    </TableCell>
                    <TableCell className="font-medium w-[100px] h-[50px] text-center text-white text-lg">
                      {driver.email}
                    </TableCell>
                    <TableCell className="font-medium w-[100px] h-[50px] text-center text-white text-lg">
                      {driver.phoneNumber}
                    </TableCell>
                    <TableCell className="font-medium w-[100px] h-[50px] text-center text-white text-lg">
                      {driver.driversLicenseNumber}
                    </TableCell>
                    <TableCell className="font-medium w-[100px] h-[50px] text-center text-white text-lg">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          driver.status === "available"
                            ? "bg-green-100 text-green-800"
                            : driver.status === "busy"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {driver.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Dialog>
                        <DialogTrigger asChild className="text-white">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedDriver(driver)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Driver Details</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right font-bold">
                                Driver ID
                              </Label>
                              <div className="col-span-3">
                                {selectedDriver?.driverId}
                              </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right font-bold">
                                Name
                              </Label>
                              <div className="col-span-3">
                                {selectedDriver?.drivername}
                              </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right font-bold">
                                Email
                              </Label>
                              <div className="col-span-3">
                                {selectedDriver?.email}
                              </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right font-bold">
                                Phone
                              </Label>
                              <div className="col-span-3">
                                {selectedDriver?.phoneNumber}
                              </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right font-bold">
                                License
                              </Label>
                              <div className="col-span-3">
                                {selectedDriver?.driversLicenseNumber}
                              </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right font-bold">
                                Status
                              </Label>
                              <div className="col-span-3">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    selectedDriver?.status === "Active"
                                      ? "bg-green-100 text-green-800"
                                      : selectedDriver?.status === "Inactive"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {selectedDriver?.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild className="text-white">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedDriver(driver)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Driver</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Name
                              </Label>
                              <Input
                                id="name"
                                defaultValue={selectedDriver?.drivername}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="email" className="text-right">
                                Email
                              </Label>
                              <Input
                                id="email"
                                defaultValue={selectedDriver?.email}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="phone" className="text-right">
                                Phone
                              </Label>
                              <Input
                                id="phone"
                                defaultValue={selectedDriver?.phoneNumber}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="license" className="text-right">
                                License
                              </Label>
                              <Input
                                id="license"
                                defaultValue={
                                  selectedDriver?.driversLicenseNumber
                                }
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="status" className="text-right">
                                Status
                              </Label>
                              <Input
                                id="status"
                                defaultValue={selectedDriver?.status}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              type="submit"
                              // onClick={() =>
                              //   handleUpdateDriver(selectedDriver!)
                              // }
                            >
                              Save changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild className="text-white">
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the drivers account and remove
                              their data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                            // onClick={() => handleDeleteDriver(driver._id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        // variant="ghost"
                        // size="icon"
                        onClick={() =>
                          router.push(
                            `/admin/DashboardPages/DriverPage/RegisterVehcile/${driver.driverId}`
                          )
                        }
                      >
                        <p>Register Vehicle</p>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
