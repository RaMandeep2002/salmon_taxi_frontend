"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, Search, Pencil, Trash2, Eye } from "lucide-react";

import { fetchDriverDetailWithVehicle } from "@/app/admin/slices/slice/driverDetailWithVechicle";
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


export default function DriverList() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: drivers,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.driverDetailWithVehicle);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    dispatch(fetchDriverDetailWithVehicle());
  }, [dispatch]);

  const filteredDrivers = drivers?.filter((driver) => {
    const matchesSearch =
      driver.driverId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.vehicle.some((vehicle) =>
        vehicle.registrationNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      filterStatus === "All" ||
      driver.vehicle.some((vehicle) => vehicle.status === filterStatus);

    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-[#F5EF1B]">
          Driver Vehicle List
        </h1>
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search by name or email..."
              className="w-64 text-white border border-[#F5EF1B] placeholder-white"
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
              {["All", "active", "free"].map((status) => (
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
        <div className="border border-[#F5EF1B] rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="text-center border border-[#F5EF1B] ">
                {/* <TableHead className="w-[100px] h-[50px] text-[#F5EF1B] text-lg ">
                  Driver ID
                </TableHead> */}
                <TableHead className="w-[100px] h-[50px] text-[#F5EF1B] text-lg ">
                  Driver Name
                </TableHead>
                <TableHead className="w-[100px] h-[50px]  text-[#F5EF1B] text-lg ">
                  Registration Number
                </TableHead>
                <TableHead className="w-[100px] h-[50px]  text-[#F5EF1B] text-lg ">
                  Company
                </TableHead>
                <TableHead className="w-[100px] h-[50px]  text-[#F5EF1B] text-lg ">
                  Vehicle Model
                </TableHead>
                <TableHead className="w-[100px] h-[50px]  text-[#F5EF1B] text-lg ">
                  Year
                </TableHead>
                <TableHead className="w-[100px] h-[50px] text-[#F5EF1B] text-lg ">
                  Status
                </TableHead>
                <TableHead className="w-[100px] h-[50px]  text-[#F5EF1B] text-lg ">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
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
              ) : filteredDrivers?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No drivers found
                  </TableCell>
                </TableRow>
              ) : (
                filteredDrivers.flatMap((driver) =>
                  driver.vehicle.length > 0 ? (
                    driver.vehicle.map((vehicle) => (
                      <TableRow
                        className="border border-[#F5EF1B]"
                        key={vehicle.registrationNumber}
                      >
                        {/* <TableCell className="font-medium w-[100px] h-[50px] text-white text-lg">
                          {driver.driverId}
                        </TableCell> */}
                        <TableCell className="font-medium w-[100px] h-[50px] text-white text-lg">
                          {driver.drivername}
                        </TableCell>
                        <TableCell className="font-medium w-[100px] h-[50px] text-white text-lg">
                          {vehicle.registrationNumber}
                        </TableCell>
                        <TableCell className="font-medium w-[100px] h-[50px] text-white text-lg">
                          {vehicle?.company}
                        </TableCell>
                        <TableCell className="font-medium w-[100px] h-[50px] text-white text-lg">
                          {vehicle?.vehicleModel}
                        </TableCell>
                        <TableCell className="font-medium w-[100px] h-[50px] text-white text-lg">
                          {vehicle?.year}
                        </TableCell>
                        <TableCell className="font-medium w-[100px] h-[50px] text-white text-lg">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              vehicle?.status === "active"
                                ? "bg-green-100 text-green-800"
                                : vehicle.status === "free"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {vehicle?.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild className="text-[#F5EF1B]">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-[#F5EF1B] border-none">
                              <DialogHeader>
                                <DialogTitle>Driver Details</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right text-lg font-medium text-zinc-800">
                                    Driver ID
                                  </Label>
                                 <div className="col-span-3 text-lg font-medium text-zinc-800">
                                    {driver.driverId}
                                  </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right text-lg font-medium text-zinc-800">
                                    Registration Number
                                  </Label>
                                 <div className="col-span-3 text-lg font-medium text-zinc-800">
                                    {vehicle.registrationNumber}
                                  </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right text-lg font-medium text-zinc-800">
                                  Company
                                  </Label>
                                 <div className="col-span-3 text-lg font-medium text-zinc-800">
                                    {vehicle.company}
                                  </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right text-lg font-medium text-zinc-800">
                                    Vehicle Model
                                  </Label>
                                 <div className="col-span-3 text-lg font-medium text-zinc-800">
                                    {vehicle.vehicleModel}
                                  </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right text-lg font-medium text-zinc-800">
                                    Year
                                  </Label>
                                 <div className="col-span-3 text-lg font-medium text-zinc-800">
                                    {vehicle.year}
                                  </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right text-lg font-medium text-zinc-800">
                                    Status
                                  </Label>
                                 <div className="col-span-3 text-lg font-medium text-zinc-800">
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        vehicle.status === "active"
                                          ? "bg-green-100 text-green-800"
                                          : vehicle.status === "free"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {vehicle.status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Dialog>
                            <DialogTrigger asChild className="text-[#F5EF1B]">
                              <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-[#F5EF1B] border-none">
                              <DialogHeader>
                                <DialogTitle className="text-lg text-zinc-800">Edit Vehicle</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="driverId"
                                    className="text-right text-lg font-medium text-zinc-800"
                                  >
                                    Driver ID
                                  </Label>
                                  <Input
                                    id="driverId"
                                    defaultValue={driver.driverId}
                                      className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="driverName"
                                    className="text-right text-lg font-medium text-zinc-800"
                                  >
                                    Driver Name
                                  </Label>
                                  <Input
                                    id="driverName"
                                    defaultValue={driver.drivername}
                                      className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="company" className="text-right text-lg font-medium text-zinc-800">
                                  Company
                                  </Label>
                                  <Input
                                    id="company"
                                    defaultValue={vehicle.company}
                                      className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="vehicleModel"
                                    className="text-right text-lg font-medium text-zinc-800"
                                  >
                                    Vehicle Model
                                  </Label>
                                  <Input
                                    id="vehicleModel"
                                    defaultValue={vehicle.vehicleModel}
                                      className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="year" className="text-right text-lg font-medium text-zinc-800">
                                    Year
                                  </Label>
                                  <Input
                                    id="year"
                                    defaultValue={vehicle.year}
                                      className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit">Save changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <AlertDialog>
                        <AlertDialogTrigger asChild className="text-white">
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-[#F5EF1B]" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-[#F5EF1B] border-none">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Delete this Vehicle <span className="font-bold">{vehicle.company}</span>
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
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="text-center" key={driver.driverId}>
                      {/* <TableCell
                        colSpan={8}
                        className="text-center text-white text-lg"
                      > */}
                        {/* {driver.drivername} has no registered vehicles */}
                      {/* </TableCell> */}
                    </TableRow>
                  )
                )
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
