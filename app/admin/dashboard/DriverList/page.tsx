"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Pencil, Trash2, Eye, Plus } from "lucide-react";

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
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Drivers } from "@/app/types/types";
import { useRouter } from "next/navigation";
import { updateDriver } from "../../slices/slice/updateDriverSlice";
import { deleteDriver } from "../../slices/slice/deleteDriverSlice";

interface FormData {
  drivername: string;
  email: string;
  phoneNumber: string;
  driversLicenseNumber: string;
}

export default function DriverList() {
  const toast = useToast();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const dispatch = useDispatch<AppDispatch>();
  const {
    data: drivers,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.driversFetching);
  const { isProcessing, iserror } = useSelector(
    (state: RootState) => state.updateDriverinfo
  );
  const { isDeleteting, succeesMessage } = useSelector(
    (state: RootState) => state.deleteDriver
  );

  const [selectedDriver, setSelectedDriver] = useState<Drivers | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<FormData>({
    drivername: "",
    email: "",
    phoneNumber: "",
    driversLicenseNumber: "",
  });

  useEffect(() => {
    dispatch(fetchdriverdetails());
  }, [dispatch]);

  useEffect(() => {
    if (selectedDriver) {
      setFormData({
        drivername: selectedDriver.drivername,
        email: selectedDriver.email,
        phoneNumber: selectedDriver.phoneNumber.toString(),
        driversLicenseNumber: selectedDriver.driversLicenseNumber,
      });
    }
  }, [selectedDriver]);

  const filteredDrivers =
    drivers?.filter((driver) => {
      const matchesSearch =
        driver.drivername.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.driverId.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    }) || [];

  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);
  const paginatedDrivers = filteredDrivers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
 
    // Remove all non-digit characters

    // Allow +, numbers, spaces, parentheses, and dashes
    const cleanedValue = value.replace(/[^\d+\s()-]/g, "");

    if (value.includes("+")) {
      value = "+" + value.replace(/\+/g, "").trim();
    } else {
      value = "+" + value.trim();
    }

    
    setFormData(prev => ({
      ...prev,
      phoneNumber: cleanedValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedDriver) {
      return;
    }

    try {
      await dispatch(
        updateDriver({
          driverId: selectedDriver.driverId,
          driverData: {
            drivername: formData.drivername,
            email: formData.email,
            driversLicenseNumber: formData.driversLicenseNumber,
            phoneNumber: formData.phoneNumber,
          },
        })
      ).unwrap();
      
      if (!iserror) {
        toast.toast({
          title: "Driver Updated Successfully",
        });
        dispatch(fetchdriverdetails());
      }
    } catch (error) {
      toast.toast({
        title: "Error",
        description: `Failed to update driver: ${error}`,
        variant: "destructive",
      });
    }
  };

  const handleDeleteDriver = (driverId: string) => async () => {
    try {
      await dispatch(deleteDriver(driverId));
      if (!isDeleteting) {
        toast.toast({
          title: "Driver Deleted",
          description: succeesMessage,
        });
        dispatch(fetchdriverdetails());
      }
    } catch (error) {
      toast.toast({
        title: "Error",
        description: `Failed to delete driver: ${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-[#F5EF1B]">Driver List</h1>

        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search by name, email, or driver ID..."
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

          <div>
            <Button
              className="text-zinc-800 bg-[#F5EF1B] hover:bg-zinc-800 hover:text-[#F5EF1B]"
              onClick={() => router.push("/admin/dashboard/AddDriver")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Register Driver
            </Button>
          </div>
        </div>

        <div className="border border-[#F5EF1B] rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="text-center border border-[#F5EF1B]">
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                  Name
                </TableHead>
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                  Email
                </TableHead>
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                  Phone Number
                </TableHead>
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                  License Number
                </TableHead>
                <TableHead className="w-[100px] h-[50px] text-center text-[#F5EF1B] text-lg">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-red-500">
                    Error: {error}
                  </TableCell>
                </TableRow>
              ) : filteredDrivers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No drivers found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedDrivers.map((driver) => (
                  <TableRow
                    className="text-center border border-[#F5EF1B]"
                    key={driver._id}
                  >
                    <TableCell className="font-medium w-[100px] h-[50px] text-center text-white text-lg">
                      {driver.drivername}
                    </TableCell>
                    <TableCell className="font-medium w-[100px] h-[50px] text-center text-white text-lg">
                      {driver.email}
                    </TableCell>
                    <TableCell className="font-medium w-[100px] h-[50px] text-center text-white text-lg">
                      <a href={`tel:${driver.phoneNumber}`}>
                        {driver.phoneNumber}
                      </a>
                    </TableCell>
                    <TableCell className="font-medium w-[100px] h-[50px] text-center text-white text-lg">
                      {driver.driversLicenseNumber}
                    </TableCell>
                    <TableCell className="text-center">
                      <Dialog>
                        <DialogTrigger asChild className="text-white">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedDriver(driver)}
                          >
                            <Eye className="h-4 w-4 text-[#F5EF1B]" />
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
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedDriver(driver)}
                          >
                            <Pencil className="h-4 w-4 text-[#F5EF1B]" />
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="bg-[#F5EF1B] border-none">
                          <DialogHeader>
                            <DialogTitle className="text-lg text-zinc-800">
                              Edit Driver
                            </DialogTitle>
                          </DialogHeader>
                          {iserror && (
                            <p className="text-red-500 text-center">
                              {iserror}
                            </p>
                          )}
                          <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="drivername"
                                  className="text-right text-lg font-medium text-zinc-800"
                                >
                                  Driver Name
                                </Label>
                                <Input
                                  id="drivername"
                                  type="text"
                                  placeholder="Enter Driver Name"
                                  value={formData.drivername}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      drivername: e.target.value,
                                    })
                                  }
                                  className="col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
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
                                  type="email"
                                  placeholder="Enter Email"
                                  value={formData.email}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      email: e.target.value,
                                    })
                                  }
                                  className="col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                                />
                              </div>

                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="phoneNumber"
                                  className="text-right text-lg font-medium text-zinc-800"
                                >
                                  Phone Number
                                </Label>
                                <Input
                                  type="tel"
                                  placeholder="Enter Phone Number"
                                  value={formData.phoneNumber}
                                  onChange={handlePhoneNumberChange}
                                  className="col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                                />
                              </div>

                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="driversLicenseNumber"
                                  className="text-right text-lg font-medium text-zinc-800"
                                >
                                  License No.
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Enter Driver's License Number"
                                  value={formData.driversLicenseNumber}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      driversLicenseNumber: e.target.value,
                                    })
                                  }
                                  className="col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                                />
                              </div>
                            </div>

                            <DialogFooter>
                              <Button type="submit" disabled={isProcessing}>
                                {isProcessing ? "Updating..." : "Update Driver"}
                              </Button>
                            </DialogFooter>
                          </form>
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
                              Delete this User{" "}
                              <span className="font-bold">
                                {driver.drivername}
                              </span>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteDriver(driver.driverId)}
                              disabled={isDeleteting}
                            >
                              {isDeleteting ? "Deleting..." : "Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
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