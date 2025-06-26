"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Trash2, Eye, Plus, EyeOff } from "lucide-react";

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
import { useDebounce } from "@/lib/useDebounce";
// import { resetDriverPassword } from "../../slices/slice/resetPasswordSlice";

interface FormData {
  drivername: string;
  email: string;
  phoneNumber: string;
  driversLicenseNumber: string;
  password: string;
}

export default function DriverList() {
  const toast = useToast();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

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

  // const { success } = useSelector((state: RootState) => state.resetPassword);
  const [selectedDriver, setSelectedDriver] = useState<Drivers | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const [formData, setFormData] = useState<FormData>({
    drivername: "",
    email: "",
    phoneNumber: "",
    driversLicenseNumber: "",
    password: "",
  });

  // const [newPassword, setNewPassword] = useState("");

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
        password: "",
      });
    }
  }, [selectedDriver]);

  const filteredDrivers =
    drivers?.filter((driver) => {
      const matchesSearch =
        driver.drivername
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()) ||
        driver.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        driver.driverId.toLowerCase().includes(debouncedSearch.toLowerCase());
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

    setFormData((prev) => ({
      ...prev,
      phoneNumber: cleanedValue,
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
            password: formData.password,
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

  // const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!selectedDriver) {
  //     return;
  //   }
  //   if (!newPassword.trim()) {
  //     // alert("Please enter a new password.");
  //     toast.toast({
  //       title: "Please enter a new password.",
  //       // description: succeesMessage,
  //     });
  //     return;
  //   }
  //   try {
  //     dispatch(
  //       resetDriverPassword({
  //         email: selectedDriver.email,
  //         newPassword,
  //       })
  //     );

  //     if (success) {
  //       toast.toast({
  //         title: "Password Update Successfully",
  //         // description: succeesMessage,
  //       });
  //       dispatch(fetchdriverdetails());
  //     }
  //     setNewPassword("");
  //   } catch (isError) {
  //     toast.toast({
  //       title: "Error",
  //       description: `Failed to Update the Password ${isError}`,
  //       variant: "destructive",
  //     });
  //   }
  // };

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-[#F5EF1B]">Driver List</h1>

        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 w-full sm:w-auto">
            <Input
              placeholder="Search by name, email, or driver ID..."
              className="w-full sm:w-72 text-white border border-[#F5EF1B] placeholder-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* <Button
              variant="outline"
              size="icon"
              className="bg-zinc-800 hover:bg-zinc-800 border border-[#F5EF1B] flex-shrink-0"
            >
              <Search className="h-4 w-4 text-[#F5EF1B]" />
            </Button> */}
          </div>

          <div className="w-full sm:w-auto flex justify-end">
            <Button
              className="w-full sm:w-auto text-zinc-800 bg-[#F5EF1B] hover:bg-zinc-800 hover:text-[#F5EF1B]"
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
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Name
                </TableHead>
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Email
                </TableHead>
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Phone Number
                </TableHead>
                {/* <TableHead  className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  License Number
                </TableHead> */}
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Actions
                </TableHead>
                {/* <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Reset Passsword
                </TableHead> */}
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
                  <TableCell colSpan={5} className="text-center text-white">
                    {error}
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
                    className="text-center border text-yellow-400 border-[#F5EF1B]"
                    key={driver._id}
                  >
                    <TableCell className="text-white text-xs sm:text-sm">
                      {highlightMatch(driver.drivername, debouncedSearch)}
                    </TableCell>
                    <TableCell className="text-white text-xs sm:text-sm">
                      {driver.email}
                    </TableCell>
                    <TableCell className="text-white text-xs sm:text-sm">
                      <a href={`tel:${driver.phoneNumber}`}>
                        {driver.phoneNumber}
                      </a>
                    </TableCell>
                    {/* <TableCell className="text-center text-white">
                      {driver.driversLicenseNumber}
                    </TableCell> */}
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
                        <DialogContent className="sm:max-w-xl bg-[#F5EF1B] border-none rounded-2xl shadow-lg">
                          <DialogHeader>
                            <DialogTitle className="text-3xl font-bold text-zinc-900 text-center">
                              🧑‍✈️ Driver Details
                            </DialogTitle>
                          </DialogHeader>

                          <div className="grid gap-5 mt-6 px-2">
                            {[
                              {
                                label: "Name",
                                value: selectedDriver?.drivername,
                              },
                              { label: "Email", value: selectedDriver?.email },
                              {
                                label: "Phone",
                                value: selectedDriver?.phoneNumber,
                              },
                              {
                                label: "License No.",
                                value:
                                  selectedDriver?.driversLicenseNumber ||
                                  "Not Provided",
                              },
                            ].map(({ label, value }, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between items-center border-b border-black pb-2"
                              >
                                <span className="text-lg font-medium text-zinc-700">
                                  {label}
                                </span>
                                <span className="text-lg font-semibold text-zinc-900">
                                  {value}
                                </span>
                              </div>
                            ))}
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
                            <DialogTitle className="  text-zinc-800">
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
                                  className="text-right     text-zinc-800"
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
                                  className="col-span-3 border border-zinc-800 rounded-lg text-zinc-800  "
                                />
                              </div>

                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="email"
                                  className="text-right     text-zinc-800"
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
                                  className="col-span-3 border border-zinc-800 rounded-lg text-zinc-800  "
                                />
                              </div>

                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="phoneNumber"
                                  className="text-right     text-zinc-800"
                                >
                                  Phone Number
                                </Label>
                                <Input
                                  type="tel"
                                  placeholder="Enter Phone Number"
                                  value={formData.phoneNumber}
                                  onChange={handlePhoneNumberChange}
                                  className="col-span-3 border border-zinc-800 rounded-lg text-zinc-800  "
                                />
                              </div>

                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="driversLicenseNumber"
                                  className="text-right     text-zinc-800"
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
                                  className="col-span-3 border border-zinc-800 rounded-lg text-zinc-800  "
                                />
                              </div>

                              <h1 className="text-zinc-800">Update Password For {driver.drivername}</h1>
                              <div className="grid grid-cols-4 items-center gap-4 relative">
                                <Label
                                  htmlFor="password"
                                  className="text-right text-zinc-800"
                                >
                                  Password
                                </Label>
                                <div className="col-span-3 relative">
                                  <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Updated Password"
                                    value={formData.password}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        password: e.target.value,
                                      })
                                    }
                                    className="w-full border border-zinc-800 rounded-lg text-zinc-800 pr-10"
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-zinc-600 hover:text-zinc-800"
                                  >
                                    {showPassword ? (
                                      <EyeOff size={18} />
                                    ) : (
                                      <Eye size={18} />
                                    )}
                                  </button>
                                </div>
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

                    {/* <TableCell className="text-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="w-full sm:w-auto text-zinc-800 bg-[#F5EF1B] hover:bg-zinc-800 hover:text-[#F5EF1B]"
                            onClick={() => setSelectedDriver(driver)}
                          >
                            Reset Password
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md bg-[#F5EF1B] border-none">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-semibold text-zinc-800">
                              Reset Password
                            </DialogTitle>
                          </DialogHeader>

                          <form
                            onSubmit={handleResetPassword}
                            className="grid gap-3 mt-4"
                          >
                            <div className="grid grid-cols-4 items-center gap-4 relative">
                              <Label
                                htmlFor="new-password"
                                className="text-right text-zinc-800"
                              >
                                New Password
                              </Label>
                              <div className="col-span-3 relative">
                                <input
                                  id="new-password"
                                  type={showPassword ? "text" : "password"}
                                  className="w-full px-3 py-2 pr-10 bg-white rounded-md border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-700"
                                  placeholder="Enter new password"
                                  value={newPassword}
                                  onChange={(e) =>
                                    setNewPassword(e.target.value)
                                  }
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-800"
                                  tabIndex={-1}
                                >
                                  {showPassword ? (
                                    <EyeOff size={18} />
                                  ) : (
                                    <Eye size={18} />
                                  )}
                                </button>
                              </div>
                            </div>

                            <div className="flex justify-end">
                              <button
                                type="submit"
                                className="px-4 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition"
                              >
                                Reset Password
                              </button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </TableCell> */}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
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
