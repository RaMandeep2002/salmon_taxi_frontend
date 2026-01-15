"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Pencil,
  Eye,
  Plus,
  EyeOff,
  List,
  User,
  BadgeCheck,
  Search,
  Trash,
  Mail,
  MoreHorizontal,
} from "lucide-react";
// import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  DialogFooter,
  // DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Drivers } from "@/app/types/types";
import { useRouter } from "next/navigation";
import { updateDriver } from "../../slices/slice/updateDriverSlice";
import { deleteDriver } from "../../slices/slice/deleteDriverSlice";
import { useDebounce } from "@/lib/useDebounce";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { resetDriverPassword } from "../../slices/slice/resetPasswordSlice";

interface FormData {
  drivername: string;
  email: string;
  phoneNumber: string;
  driversLicenseNumber: string;
  driversLicJur: string;
  password: string;
}

export default function DriverList() {
  const toast = useToast();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [dialogType, setDialogType] = useState<
    "profile" | "edit" | "delete" | null
  >(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const handleDialogOpen = (
    driver: Drivers,
    type: "profile" | "edit" | "delete"
  ) => {
    setSelectedDriver(driver);
    setDialogType(type);
  };

  const handleDialogClose = () => {
    setSelectedDriver(null);
    setDialogType(null);
  };

  const [formData, setFormData] = useState<FormData>({
    drivername: "",
    email: "",
    phoneNumber: "",
    driversLicenseNumber: "",
    driversLicJur: "",
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
        driversLicJur: selectedDriver.driversLicJur,
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
            driversLicJur: formData.driversLicJur,
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
        <div className="mb-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            <span>
              <List />
            </span>
            <span>Driver List</span>
          </h1>
          <p className="text-gray-300 mt-1">
            Manage your taxi drivers and their performance
          </p>
          <div className="h-1 w-50 bg-[#F5EF1B] rounded mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-8">
          {/* Total Drivers */}
          {/* <Card className="shadow-xl border-0 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 transition-all hover:scale-[1.03]"> */}
          <Card className="shadow-xl border border-[#F5EF1B] bg-transparent transition-all hover:scale-[1.03]">
            <CardHeader className="pb-2 flex flex-row items-center gap-3">
              <div className="bg-[#F5EF1B] bg-opacity-20 rounded-full p-2">
                <User className="h-6 w-6 text-[#F5EF1B] dark:text-[#F5EF1B]" />
              </div>
              <CardTitle className="text-sm font-semibold text-[#F5EF1B]">
                Total Drivers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-white dark:text-[#F5EF1B]">
                {filteredDrivers.length}
              </div>
              <p className="text-xs text-[#F5EF1B] mt-1 font-medium">
                {filteredDrivers.length > 0
                  ? `+${Math.floor(filteredDrivers.length * 0.12)} this month`
                  : "No new drivers"}
              </p>
            </CardContent>
          </Card>

          {/* Active Now */}
          <Card className="shadow-xl border border-[#F5EF1B] bg-transparent transition-all hover:scale-[1.03]">
            <CardHeader className="pb-2 flex flex-row items-center gap-3">
              <div className="bg-[#F5EF1B] bg-opacity-20 rounded-full p-2">
                <BadgeCheck className="h-6 w-6 text-[#F5EF1B] dark:text-[#F5EF1B]" />
              </div>
              <CardTitle className="text-sm font-semibold text-[#F5EF1B]">
                Active Now
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-white dark:text-[#F5EF1B]">
                {/* {filteredDrivers.length} */}
                {filteredDrivers.filter((d) => d.status === "available").length}
              </div>
              <p className="text-xs text-[#F5EF1B] mt-1 font-medium">
                {filteredDrivers.length > 0
                  ? `${Math.round(
                      (filteredDrivers.filter((d) => d.status === "available")
                        .length /
                        filteredDrivers.length) *
                        100
                    )}% of total`
                  : "No active drivers"}
              </p>
            </CardContent>
          </Card>
          {/* Total Earnings */}
        </div>

        <div className="mb-6">
          <Card className="shadow-xl border-[#F5EF1B] bg-transparent transition-all">
            <CardHeader className="pb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col xs:flex-row xs:items-center gap-3 w-full xs:w-auto">
                <div className="flex-shrink-0 flex items-center justify-center bg-[#F5EF1B] bg-opacity-20 rounded-full p-2">
                  <User className="h-6 w-6 text-[#F5EF1B] dark:text-[#F5EF1B]" />
                </div>
                <div>
                  <CardTitle className="text-base xs:text-lg font-semibold text-[#F5EF1B]">
                    All Drivers
                  </CardTitle>
                  <CardDescription className="text-xs text-[#F5EF1B]">
                    Complete list of registered drivers
                  </CardDescription>
                </div>
              </div>
              <div className="flex flex-col xs:flex-row items-stretch gap-2 w-full sm:w-auto">
                <div className="relative w-full xs:w-64">
                  <Input
                    placeholder="Search drivers..."
                    className="pl-10 w-full border border-[#F5EF1B] text-white focus:ring-2 focus:ring-[#F5EF1B] min-w-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Search className="text-[#F5EF1B] h-4 w-4" />
                  </span>
                </div>
                <Button
                  className="w-full xs:w-auto whitespace-nowrap text-zinc-800 bg-[#F5EF1B] hover:bg-zinc-800 hover:text-[#F5EF1B] flex items-center justify-center"
                  onClick={() => router.push("/admin/dashboard/AddDriver")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span className="hidden xs:inline">Register Driver</span>
                  <span className="inline xs:hidden">Add</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="hidden sm:block">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-[#F5EF1B]">
                      <TableHead className="text-[#F5EF1B]">Driver</TableHead>
                      <TableHead className="text-[#F5EF1B]">Email</TableHead>
                      <TableHead className="text-[#F5EF1B]">License</TableHead>
                      {/* <TableHead className="text-[#F5EF1B]">Status</TableHead> */}
                      <TableHead className="text-[#F5EF1B]">Trips</TableHead>
                      {/* <TableHead className="text-[#F5EF1B]">Earnings</TableHead> */}
                      <TableHead className="w-[50px] text-[#F5EF1B]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center text-white"
                        >
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : error ? (
                      <TableRow>
                        <TableCell
                          colSpan={9}
                          className="text-center text-black dark:text-white"
                        >
                          {error}
                        </TableCell>
                      </TableRow>
                    ) : filteredDrivers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center">
                          No drivers found
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedDrivers.map((driver) => (
                        <TableRow
                          key={driver._id}
                          className="border-b border-[#F5EF1B]"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#F5EF1B] rounded-full flex items-center justify-center">
                                <span className="text-gray-600 font-semibold text-base">
                                  {driver.drivername
                                    ? driver.drivername
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()
                                    : "D"}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium text-white">
                                  {highlightMatch(
                                    driver.drivername,
                                    debouncedSearch
                                  )}
                                </div>
                                {/* <div className="text-sm text-gray-500">
                                  {(driver.driverId || driver._id)?.slice(0, 8)}
                                </div> */}
                              </div>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-[#F5EF1B]" />
                                <span className="font-semibold text-sm text-white break-all">
                                  {driver.email}
                                </span>
                              </div>
                              {/* <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-[#F5EF1B]" />
                                <a
                                  href={`tel:${driver.phoneNumber}`}
                                  className="font-semibold text-sm text-white underline decoration-dotted hover:text-[#F5EF1B] transition"
                                >
                                  {driver.phoneNumber}
                                </a>
                              </div> */}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center gap-2">
                                {/* <Mail className="h-4 w-4 text-[#F5EF1B]" /> */}
                                <span className="font-semibold text-sm text-white break-all">
                                  <span className="text-gray-300">
                                    License No:
                                  </span>{" "}
                                  {driver.driversLicenseNumber || "N/A"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                {/* <Phone className="h-4 w-4 text-[#F5EF1B]" /> */}
                                <span className="font-semibold text-sm text-white break-all">
                                  <span className="text-gray-300">
                                    Driver License Jurisdiction:
                                  </span>{" "}
                                  {driver.driversLicJur || "N/A"}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          {/* <TableCell>
                            <Badge
                              variant={
                                driver.status === "available"
                                  ? "default"
                                  : driver.status === "busy"
                                  ? "secondary"
                                  : "outline"
                              }
                              className={
                                driver.status === "available"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-100 hover:text-green-800 hover:dark:bg-green-900 hover:dark:text-green-200"
                                  : driver.status === "busy"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 hover:bg-yellow-100 hover:text-yellow-800 hover:dark:bg-yellow-900 hover:dark:text-yellow-200"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-100 hover:text-gray-800 hover:dark:bg-gray-800 hover:dark:text-gray-200"
                              }
                            >
                              {driver.status === "available"
                                ? "Available"
                                : driver.status === "busy"
                                ? "Busy"
                                : "Not Working"}
                            </Badge>
                          </TableCell> */}
                          <TableCell>
                            <div className="font-bold text-white">
                              {driver.totalTrips
                                ? driver.totalTrips.toLocaleString()
                                : "0"}
                            </div>
                          </TableCell>
                          {/* <TableCell>
                            <div className="font-bold text-yellow-300">
                              {driver.totalEarnings !== undefined &&
                              driver.totalEarnings !== null
                                ? driver.totalEarnings.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                  })
                                : "$0"}
                            </div>
                          </TableCell> */}
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-full bg-[#F5EF1B] hover:bg-zinc-800 transition-colors duration-200 shadow-md border border-zinc-300 dark:bg-zinc-900 dark:hover:bg-[#F5EF1B] group"
                                  aria-label="Open menu"
                                >
                                  <MoreHorizontal className="h-5 w-5 text-zinc-800 group-hover:text-[#F5EF1B] dark:text-[#F5EF1B] dark:group-hover:text-zinc-800 transition-colors duration-200" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="rounded-md min-w-[180px] border border-zinc-200 shadow-2xl bg-[#F5EF1B] text-zinc-900 dark:text-zinc-900 py-2 px-1"
                              >
                                <DropdownMenuItem
                                  className="flex items-center gap-2 rounded-md transition-colors hover:bg-[#fff475]/80 hover:text-zinc-900 font-semibold focus:bg-[#fff475]/90 focus:text-zinc-800"
                                  onClick={() =>
                                    handleDialogOpen(driver, "profile")
                                  }
                                >
                                  <Eye className="w-4 h-4 opacity-90" />
                                  <span>View Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="flex items-center gap-2 rounded-md transition-colors hover:bg-[#fff475]/80 hover:text-zinc-900 font-semibold focus:bg-[#fff475]/90 focus:text-zinc-800"
                                  onClick={() =>
                                    handleDialogOpen(driver, "edit")
                                  }
                                >
                                  <Pencil className="w-4 h-4 opacity-90" />
                                  <span>Update Driver</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="flex items-center gap-2 rounded-md transition-colors font-semibold text-red-700 hover:bg-red-100 focus:bg-red-200"
                                  onClick={() =>
                                    handleDialogOpen(driver, "delete")
                                  }
                                >
                                  <Trash className="w-4 h-4 opacity-90" />
                                  <span>Delete Driver</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="block sm:hidden">
                {isLoading ? (
                  <div
                    className="text-center py-8 text-gray-500
                  "
                  >
                    Loading...
                  </div>
                ) : error ? (
                  <div className="text-center py-8 text-red-600">{error}</div>
                ) : filteredDrivers.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No Driver found
                  </div>
                ) : (
                  <Accordion type="single" collapsible>
                    {paginatedDrivers.map((driver) => (
                      <AccordionItem key={driver._id} value={driver._id}>
                        <AccordionTrigger>
                          <div className="flex items-center gap-3 w-full">
                            <div className="w-10 h-10 bg-[#F5EF1B] rounded-full flex items-center justify-center">
                              <span className="text-gray-600 font-semibold text-base">
                                {driver.drivername
                                  ? driver.drivername
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                      .toUpperCase()
                                  : "D"}
                              </span>
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                              <span className="font-medium text-gray-200 truncate">
                                {highlightMatch(
                                  driver.drivername,
                                  debouncedSearch
                                )}
                              </span>
                              {/* <span className="text-xs text-gray-500 truncate">
                                {(driver.driverId || driver._id)?.slice(0, 8)}
                              </span> */}
                            </div>
                            {/* <div className="mr-2">
                              <Badge
                                variant={
                                  driver.status === "available"
                                    ? "default"
                                    : driver.status === "busy"
                                    ? "secondary"
                                    : "outline"
                                }
                                className={
                                  driver.status === "available"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-100 hover:text-green-800 hover:dark:bg-green-900 hover:dark:text-green-200"
                                    : driver.status === "busy"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 hover:bg-yellow-100 hover:text-yellow-800 hover:dark:bg-yellow-900 hover:dark:text-yellow-200"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-100 hover:text-gray-800 hover:dark:bg-gray-800 hover:dark:text-gray-200"
                                }
                              >
                                {driver.status === "available"
                                  ? "Available"
                                  : driver.status === "busy"
                                  ? "Busy"
                                  : "Not Working"}
                              </Badge>
                            </div> */}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="px-2 py-3 space-y-2">
                            <div>
                              <span className="block text-xs text-gray-300">
                                Email
                              </span>
                              <span className="font-medium text-white">
                                {driver.email}
                              </span>
                            </div>
                            {/* <div>
                                <span className="block text-xs text-gray-300">
                                Phone
                              </span>
                            <span className="font-medium text-white">
                                <a href={`tel:${driver.phoneNumber}`}>
                                  {driver.phoneNumber}
                                </a>
                              </span>
                            </div> */}
                            <div>
                                <span className="block text-xs text-gray-300">
                                License No.
                              </span>
                            <span className="font-medium text-white">
                                {driver?.driversLicenseNumber}
                              </span>
                            </div>
                            <div>
                                <span className="block text-xs text-gray-300">
                                Driver License Jurisdiction
                              </span>
                            <span className="font-medium text-white">
                                {driver?.driversLicJur}
                              </span>
                            </div>
                            <div>
                                <span className="block text-xs text-gray-300">
                                Trips
                              </span>
                            <span className="font-medium text-white">
                                {driver.totalTrips ?? 0}
                              </span>
                            </div>
                            {/* <div>
                                <span className="block text-xs text-gray-300">
                                Earnings
                              </span>
                              <div className="font-medium text-green-600 dark:text-yellow-300">
                                {driver.totalEarnings !== undefined &&
                                driver.totalEarnings !== null
                                  ? driver.totalEarnings.toLocaleString(
                                      "en-US",
                                      {
                                        style: "currency",
                                        currency: "USD",
                                      }
                                    )
                                  : "$0"}
                              </div>
                            </div> */}
                            <div className="flex gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() =>
                                  handleDialogOpen(driver, "profile")
                                }
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => handleDialogOpen(driver, "edit")}
                              >
                                <Pencil className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="flex-1"
                                onClick={() =>
                                  handleDialogOpen(driver, "delete")
                                }
                              >
                                <Trash className="w-4 h-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog
          open={dialogType === "profile"}
          onOpenChange={handleDialogClose}
        >
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
                  value: selectedDriver?.driversLicenseNumber || "Not Provided",
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
        <Dialog open={dialogType === "edit"} onOpenChange={handleDialogClose}>
          <DialogContent className="bg-[#F5EF1B] border-none">
            <DialogHeader>
              <DialogTitle className="text-zinc-800">
                <span className="text-zinc-800 text-xl font-semibold">
                  Update Data for{" "}
                  <span className="font-bold">
                    {selectedDriver?.drivername}
                  </span>
                </span>
              </DialogTitle>
            </DialogHeader>
            {iserror && <p className="text-red-500 text-center">{iserror}</p>}
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
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="driversLicJur"
                    className="text-right text-zinc-800"
                  >
                    Driver License Jurisdiction
                  </Label>
                  <div className="col-span-3">
                    <Select
                      value={formData.driversLicJur}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          driversLicJur: value,
                        })
                      }
                    >
                      <SelectTrigger className="w-full py-4 px-4 border border-zinc-800 text-zinc-800 placeholder:text-zinc-500 rounded-lg shadow-sm bg-[#F5EF1B] focus:outline-none">
                        <SelectValue placeholder="Select the Drivers License Jurisdiction" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#F5EF1B] max-h-60 overflow-y-auto shadow-xl border border-zinc-200 rounded-lg z-50">
                        <SelectGroup>
                          {[
                            { value: "AB", label: "Alberta" },
                            { value: "AK", label: "Alaska" },
                            { value: "AL", label: "Alabama" },
                            { value: "AR", label: "Arkansas" },
                            { value: "AZ", label: "Arizona" },
                            { value: "BC", label: "British Columbia" },
                            { value: "CA", label: "California" },
                            { value: "CO", label: "Colorado" },
                            { value: "CT", label: "Connecticut" },
                            { value: "DC", label: "District of Columbia" },
                            { value: "DE", label: "Delaware" },
                            { value: "FL", label: "Florida" },
                            { value: "GA", label: "Georgia" },
                            { value: "HI", label: "Hawaii" },
                            { value: "IA", label: "Iowa" },
                            { value: "ID", label: "Idaho" },
                            { value: "IL", label: "Illinois" },
                            { value: "IN", label: "Indiana" },
                            { value: "KS", label: "Kansas" },
                            { value: "KY", label: "Kentucky" },
                            { value: "LA", label: "Louisiana" },
                            { value: "MA", label: "Massachusetts" },
                            { value: "MB", label: "Manitoba" },
                            { value: "MD", label: "Maryland" },
                            { value: "ME", label: "Maine" },
                            { value: "MI", label: "Michigan" },
                            { value: "MN", label: "Minnesota" },
                            { value: "MO", label: "Missouri" },
                            { value: "MS", label: "Mississippi" },
                            { value: "MT", label: "Montana" },
                            { value: "NB", label: "New Brunswick" },
                            { value: "NC", label: "North Carolina" },
                            { value: "ND", label: "North Dakota" },
                            { value: "NE", label: "Nebraska" },
                            { value: "NH", label: "New Hampshire" },
                            { value: "NL", label: "Newfoundland and Labrador" },
                            { value: "NM", label: "New Mexico" },
                            { value: "NS", label: "Nova Scotia" },
                            { value: "NU", label: "Nunavut" },
                            { value: "NV", label: "Nevada" },
                            { value: "NY", label: "New York" },
                            { value: "OH", label: "Ohio" },
                            { value: "OK", label: "Oklahoma" },
                            { value: "ON", label: "Ontario" },
                            { value: "OR", label: "Oregon" },
                            { value: "OTH", label: "Other" },
                            { value: "PA", label: "Pennsylvania" },
                            { value: "PE", label: "Prince Edward Island" },
                            { value: "QC", label: "Quebec" },
                            { value: "RI", label: "Rhode Island" },
                            { value: "SC", label: "South Carolina" },
                            { value: "SD", label: "South Dakota" },
                            { value: "SK", label: "Saskatchewan" },
                            { value: "TN", label: "Tennessee" },
                            { value: "TX", label: "Texas" },
                            { value: "UT", label: "Utah" },
                            { value: "VA", label: "Virginia" },
                            { value: "VT", label: "Vermont" },
                            { value: "WA", label: "Washington" },
                            { value: "WI", label: "Wisconsin" },
                            { value: "WV", label: "West Virginia" },
                            { value: "WY", label: "Wyoming" },
                            { value: "XX", label: "Unknown" },
                            { value: "YT", label: "Yukon Territory" },
                          ].map((item) => (
                            <SelectItem
                              key={item.value}
                              value={item.value}
                              className="hover:bg-[#f5ef1b]/10 focus:bg-[#f5ef1b]/20 transition-colors"
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* <h1 className="text-zinc-800">
                                Update Password For {driver.drivername}
                              </h1> */}
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
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 text-zinc-600 hover:text-zinc-800"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
        <AlertDialog
          open={dialogType === "delete"}
          onOpenChange={handleDialogClose}
        >
          <AlertDialogContent className="border-none p-0 overflow-hidden rounded-2xl shadow-lg max-w-lg bg-[#F5EF1B] dark:bg-zinc-900">
            <div className="px-8 py-6 flex flex-col items-center">
              <div className="bg-white dark:bg-zinc-800 rounded-full p-3 shadow-md mb-3 border-4 border-yellow-200 dark:border-yellow-500">
                <svg
                  className="w-10 h-10 text-red-600 dark:text-yellow-300"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="opacity-30"
                  />
                  <path
                    d="M15 9l-6 6M9 9l6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <AlertDialogTitle className="text-2xl font-bold text-zinc-900 dark:text-[#F5EF1B] mb-1 text-center">
                Delete Driver?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-800 dark:text-zinc-200 text-base text-center font-medium">
                Are you sure you want to{" "}
                <span className="font-bold text-yellow-700 dark:text-yellow-300">
                  permanently delete
                </span>{" "}
                the driver <br />
                <span className="font-bold text-white bg-red-600/80 dark:bg-red-700/80 px-2 py-1 rounded shadow">
                  {selectedDriver?.drivername}
                </span>
                ?
                <br />
                <span className="text-sm text-yellow-700 dark:text-yellow-200 font-normal">
                  This action cannot be undone.
                </span>
              </AlertDialogDescription>
            </div>
            <div className="bg-[#F5EF1B] dark:bg-zinc-800 px-8 py-6 flex flex-col sm:flex-row gap-3 justify-end rounded-b-2xl">
              <AlertDialogCancel className="w-full sm:w-auto px-6 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-[#F5EF1B] font-semibold hover:bg-zinc-100 hover:dark:bg-zinc-800 transition">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={
                  selectedDriver?.driverId
                    ? handleDeleteDriver(selectedDriver.driverId)
                    : undefined
                }
                disabled={isDeleteting || !selectedDriver?.driverId}
                className="w-full sm:w-auto px-6 py-2 rounded-lg bg-gradient-to-r from-red-600 to-yellow-400 dark:from-red-900 dark:to-yellow-600 text-white dark:text-[#F5EF1B] font-bold shadow hover:from-red-700 hover:to-yellow-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isDeleteting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Deleting...
                  </span>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-1 -ml-1 inline-block"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M15 9l-6 6M9 9l6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Delete
                  </>
                )}
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>

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
