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
import { registerVehicle } from "@/app/admin/slices/slice/registerVehicleSlice";
import { Vehicle } from "@/app/types/VehicleData";

export default function DriverList() {
  const [company, setCompany] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [year, setYear] = useState<string>("");
  const [status, setStatus] = useState<Vehicle["status"]>("active");
  const [driverId, setDriverId] = useState<string>("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const dispatch = useDispatch<AppDispatch>();
  const { data: drivers } = useSelector(
    (state: RootState) => state.driversFetching
  );

  const [selectedDriver, setSelectedDriver] = useState<Drivers | null>(null);

  // Local state for search & filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All"); // Default to "All"

  useEffect(() => {
    dispatch(fetchdriverdetails());
  }, [dispatch]);

  // Filtered & searched drivers
  const filteredDrivers = drivers?.filter((driver) => {
    const matchesSearch =
      driver.drivername.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.driverId.toLowerCase().includes(searchTerm.toLowerCase());
  
    const matchesStatus = filterStatus === "All" || driver.status === filterStatus;
    return matchesSearch && matchesStatus;
  }) || [];
  
  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);
  
  const paginatedDrivers = filteredDrivers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await dispatch(
        registerVehicle({
          vehicle: {
            driverId: driverId || selectedDriver?.driverId,
            company,
            vehicleModel,
            year: Number(year),
            status,
          },
        })
      ).unwrap();

      alert("Vehicle registered successfully");
      setCompany("");
      setVehicleModel("");
      setYear("");
      setStatus("active");
      setDriverId("");
    } catch (err) {
      console.error(err);
      setError("Error happens!!");
    } finally {
      setIsLoading(false);
    }
  };

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
            <DropdownMenuTrigger
              asChild
              className="text-white bg-zinc-800 border border-[#F5EF1B]"
            >
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
                {/* <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg ">
                  Driver Id
                </TableHead> */}
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
                paginatedDrivers.map((driver) => (
                  <TableRow
                    className="text-center border border-[#F5EF1B]"
                    key={driver._id}
                  >
                    {/* <TableCell className="font-medium w-[100px] h-[50px] text-center text-white text-lg">
                      {driver._id}
                    </TableCell> */}
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
                        <DialogContent className="sm:max-w-[425px] bg-[#F5EF1B] border-none">
                          <DialogHeader>
                            <DialogTitle>Driver Details</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right text-lg font-medium text-zinc-800">
                                Driver ID
                              </Label>
                              <div className="col-span-3 text-lg font-medium text-zinc-800">
                                {selectedDriver?.driverId}
                              </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right text-lg font-medium text-zinc-800">
                                Name
                              </Label>
                              <div className="col-span-3 text-lg font-medium text-zinc-800">
                                {selectedDriver?.drivername}
                              </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right text-lg font-medium text-zinc-800">
                                Email
                              </Label>
                              <div className="col-span-3 text-lg font-medium text-zinc-800">
                                {selectedDriver?.email}
                              </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right text-lg font-medium text-zinc-800">
                                Phone
                              </Label>
                              <div className="col-span-3 text-lg font-medium text-zinc-800">
                                {selectedDriver?.phoneNumber}
                              </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right text-lg font-medium text-zinc-800">
                                License
                              </Label>
                              <div className="col-span-3 text-lg font-medium text-zinc-800">
                                {selectedDriver?.driversLicenseNumber}
                              </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right text-lg font-medium text-zinc-800">
                                Status
                              </Label>
                              <div className="col-span-3 text-lg font-medium text-zinc-800">
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
                        <DialogContent className="bg-[#F5EF1B] border-none">
                          <DialogHeader>
                            <DialogTitle className="text-lg text-zinc-800">
                              Edit Driver
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="name"
                                className="text-right text-lg font-medium text-zinc-800"
                              >
                                Name
                              </Label>
                              <Input
                                id="name"
                                defaultValue={selectedDriver?.drivername}
                                className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="email"
                                className="text-right text-lg font-medium text-zinc-800"
                              >
                                Email
                              </Label>
                              <Input
                                id="email"
                                defaultValue={selectedDriver?.email}
                                className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="phone"
                                className="text-right text-lg font-medium text-zinc-800"
                              >
                                Phone
                              </Label>
                              <Input
                                id="phone"
                                defaultValue={selectedDriver?.phoneNumber}
                                className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="license"
                                className="text-right text-lg font-medium text-zinc-800"
                              >
                                License
                              </Label>
                              <Input
                                id="license"
                                defaultValue={
                                  selectedDriver?.driversLicenseNumber
                                }
                                className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="status"
                                className="text-right text-lg font-medium text-zinc-800"
                              >
                                Status
                              </Label>
                              <Input
                                id="status"
                                defaultValue={selectedDriver?.status}
                                className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
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
                        <AlertDialogContent className="bg-[#F5EF1B] border-none">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Delete this User{" "}
                              <span className="font-bold">
                                {driver.drivername}
                              </span>
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
                      <Dialog>
                        <DialogTrigger
                          asChild
                          className="text-zinc-800 bg-[#F5EF1B] hover:bg-zinc-800 hover:text-[#F5EF1B]"
                        >
                          <Button
                            // variant="ghost"
                            // size="icon"
                            onClick={() => setSelectedDriver(driver)}
                          >
                            <p>Register Vehicle</p>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#F5EF1B] border-none">
                          <DialogHeader>
                            <DialogTitle className="text-lg text-zinc-800">
                              Add Vehicle
                            </DialogTitle>
                          </DialogHeader>

                          <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="name"
                                  className="text-right text-lg font-medium text-zinc-800"
                                >
                                  Driver Id
                                </Label>
                                <input
                                  type="text"
                                  name="driverId"
                                  value={
                                    driverId || selectedDriver?.driverId || ""
                                  }
                                  onChange={(e) => setDriverId(e.target.value)}
                                  className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="email"
                                  className="text-right text-lg font-medium text-zinc-800"
                                >
                                  Company
                                </Label>
                                <input
                                  type="text"
                                  name="make"
                                  placeholder="Enter Vehicle Make"
                                  value={company}
                                  onChange={(e) => setCompany(e.target.value)}
                                  required
                                  className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="phone"
                                  className="text-right text-lg font-medium text-zinc-800"
                                >
                                  Vehicle Model
                                </Label>
                                <input
                                  type="text"
                                  name="vehicleModel"
                                  placeholder="Enter Vehicle Model"
                                  value={vehicleModel}
                                  onChange={(e) =>
                                    setVehicleModel(e.target.value)
                                  }
                                  required
                                  className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="license"
                                  className="text-right text-lg font-medium text-zinc-800"
                                >
                                  Year
                                </Label>
                                <input
                                  type="number"
                                  name="year"
                                  placeholder="Enter Year of Manufacture"
                                  value={year}
                                  onChange={(e) => setYear(e.target.value)}
                                  required
                                  min="1900"
                                  max="2099"
                                  className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="status"
                                  className="text-right text-lg font-medium text-zinc-800"
                                >
                                  Status
                                </Label>
                                <select
                                  value={status}
                                  onChange={(e) =>
                                    setStatus(
                                      e.target.value as Vehicle["status"]
                                    )
                                  }
                                  required
                                  className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                                >
                                  <option value="active">Active</option>
                                  <option value="free">Free</option>
                                </select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                // className="hover:text-zinc-800 hover:bg-[#F5EF1B] bg-zinc-800 text-[#F5EF1B]"
                                type="submit"
                                // onClick={() =>
                                //   handleUpdateDriver(selectedDriver!)
                                // }
                              >
                                {isLoading
                                  ? "Registering..."
                                  : "Register Vehicle"}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between items-center mt-4">
            <Button onClick={handlePrev} disabled={currentPage === 1} className="text-zinc-800 bg-[#F5EF1B] hover:bg-zinc-800 hover:text-[#F5EF1B]">
              Previous
            </Button>
            <span className="text-sm text-[#F5EF1B]">
              Page {currentPage} of {totalPages}
            </span>
            <Button onClick={handleNext} disabled={currentPage === totalPages} className="text-zinc-800 bg-[#F5EF1B] hover:bg-zinc-800 hover:text-[#F5EF1B]">
              Next
            </Button>
          </div>
      </div>
    </DashboardLayout>
  );
}
