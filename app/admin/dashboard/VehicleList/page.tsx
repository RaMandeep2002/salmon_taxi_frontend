"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Pencil,
  Eye,
  Plus,
  List,
  Car,
  MoreHorizontal,
  Trash,
} from "lucide-react";

import { fetchDetailWithVehicle } from "@/app/admin/slices/slice/detailWithVechicle";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { updateVehicle } from "../../slices/slice/updateVehicleSlice";
import { Vehicle } from "@/app/types/DriverVechicleData";
import { useToast } from "@/hooks/use-toast";
import { deleteVehicle } from "../../slices/slice/deleteVehicleSlice";
import { useDebounce } from "@/lib/useDebounce";

export default function VechicleList() {
  // const [company, setCompany] = useState<string | "">("");
  // const [vehiclemodel, setVehiclemodel] = useState<string | "">("");
  // const [year, setYear] = useState<number | "">("");
  // const [vehicle_plate_number, setVehicle_plate_number] = useState<string | "">(
  //   ""
  // );

  const [dialogType, setDialogType] = useState<
    "view" | "edit" | "delete" | null
  >(null);

  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: Vehicles,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.detailWithVehicle);

  const { iserror } = useSelector((state: RootState) => state.updateVehcile);
  const { isDeleteting, succeesMessage } = useSelector(
    (state: RootState) => state.deleteVehicle
  );
  // const getsuccessmessage = vehicleinfo.message;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedsearch = useDebounce(searchTerm, 300);

  const itemsPerPage = 15;

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const [filterStatus, setFilterStatus] = useState("All");
  const handleDialogOpen = (
    vehicle: Vehicle,
    type: "view" | "edit" | "delete"
  ) => {
    setSelectedVehicle(vehicle);
    setDialogType(type);
  };

  const handleDialogClose = () => {
    setSelectedVehicle(null);
    setDialogType(null);
  };

  useEffect(() => {
    dispatch(fetchDetailWithVehicle());
  }, [dispatch]);
  const [formData, setFormData] = useState({
    registrationNumber: selectedVehicle?.registrationNumber || "",
    company: selectedVehicle?.company || "",
    vehicleModel: selectedVehicle?.vehicleModel || "",
    year: selectedVehicle?.year || 0,
    vehicle_plate_number: selectedVehicle?.vehicle_plate_number || "",
    vehRegJur: selectedVehicle?.vehRegJur || "",
    tripTypeCd: selectedVehicle?.tripTypeCd || "",
  });
  useEffect(() => {
    if (selectedVehicle) {
      setFormData({
        registrationNumber: selectedVehicle?.registrationNumber || "",
        company: selectedVehicle.company || "",
        vehicleModel: selectedVehicle.vehicleModel || "",
        year: selectedVehicle.year || 0,
        vehicle_plate_number: selectedVehicle.vehicle_plate_number || "",
        vehRegJur: selectedVehicle?.vehRegJur,
        tripTypeCd: selectedVehicle?.tripTypeCd,
      });
    }
  }, [selectedVehicle]);

  const formattedVehicles = Vehicles?.filter((vehicle) => {
    const matchesSearch = vehicle.company
      .toLowerCase()
      .includes(debouncedsearch.toLowerCase());

    // const matchesStatus =
    //   filterStatus === "All" ||
    //   driver.vehicle.some((vehicle) => vehicle.status === filterStatus);

    // return matchesSearch && matchesStatus;
    return matchesSearch;
  });

  const totalPages = Math.ceil(Vehicles.length / itemsPerPage);

  const paginatedVehicles = formattedVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(
        updateVehicle({
          id: selectedVehicle!._id,
          vehicleData: {
            registrationNumber: formData.registrationNumber,
            company: formData.company,
            vehicleModel: formData.vehicleModel,
            year: formData.year,
            vehicle_plate_number: formData.vehicle_plate_number,
            vehRegJur: formData.vehRegJur,
            tripTypeCd: formData.tripTypeCd,
          },
        })
      ).unwrap();

      // if (isUpdating === true) {
      toast.toast({
        title: "Vehicle Updated Successfully",
      });
      dispatch(fetchDetailWithVehicle());
      // }
    } catch (error) {
      alert(`Failed to delete driver. Please try again. ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteVehicle = async (registrationNumber: string) => {
    try {
      await dispatch(deleteVehicle(registrationNumber)).unwrap();
      if (isDeleteting === true) {
        toast.toast({
          title: "Vehicle Deleted Successfully",
          description: succeesMessage,
        });
        dispatch(fetchDetailWithVehicle());
      }
    } catch (error) {
      alert(`Failed to delete driver. Please try again. ${error}`);
      toast.toast({
        title: "Error Deleting Vehicle",
        description: "Failed to delete vehicle. Please try again.",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-white text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <span>
                <List />
              </span>
              <span>Vehicle List</span>
            </h1>
            <p className="text-gray-200 dark:text-white mt-1">
              Manage your taxi fleet and vehicle information
            </p>
            <div className="h-1 w-50 bg-[#F5EF1B] rounded mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <Card className="shadow-xl border border-[#F5EF1B] bg-transparent transition-all hover:scale-[1.03]">
            <CardHeader className="pb-2 flex flex-row items-center gap-3">
              <div className="bg-[#F5EF1B] bg-opacity-20 rounded-full p-2">
                <svg
                  className="h-6 w-6 text-yellow-600 dark:text-yellow-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V4m0 16v-4" />
                </svg>
              </div>
              <CardTitle className="text-lg font-semibold text-[#F5EF1B]">
                Total Vehicles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-white dark:text-[#F5EF1B]">
                {paginatedVehicles.length}
              </div>
              <p className="text-xs text-[#F5EF1B] mt-1 font-medium">
                {paginatedVehicles.length > 0
                  ? `+${Math.floor(paginatedVehicles.length * 0.12)} this month`
                  : "No new vehicles"}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-xl border border-[#F5EF1B] bg-transparent transition-all hover:scale-[1.03]">
            <CardHeader className="pb-2 flex flex-row items-center gap-3">
              <div className="bg-[#F5EF1B] bg-opacity-20 rounded-full p-2">
                <svg
                  className="h-6 w-6 text-[#F5EF1B] dark:text-[#F5EF1B]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <CardTitle className="text-sm font-semibold text-[#F5EF1B]">
                Active
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-white dark:text-[#F5EF1B]">
                {paginatedVehicles.length}
              </div>
              <p className="text-xs text-[#F5EF1B] mt-1 font-medium">
                {paginatedVehicles.length > 0
                  ? `${Math.round(
                      (paginatedVehicles.length / paginatedVehicles.length) *
                        100
                    )}% of fleet`
                  : "No active vehicles"}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 w-full sm:w-auto">
            <Input
              placeholder="Search by Vehicle Name..."
              className="w-full sm:w-72 text-white border border-[#F5EF1B] placeholder-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* <Button
              variant="outline"
              size="icon"
              className="bg-zinc-800 hover:bg-zinc-800 border border-[#F5EF1B]"
            >
              <Search className="h-4 w-4 text-[#F5EF1B]" />
            </Button> */}
          </div>
          {/* <DropdownMenu>
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
          </DropdownMenu> */}

          <div>
            <Button
              className="w-full sm:w-auto text-zinc-800 bg-[#F5EF1B] hover:bg-zinc-800 hover:text-[#F5EF1B]"
              type="submit"
              onClick={() => router.push("/admin/dashboard/RegsiterVehicle")}
            >
              <Plus />
              Register Vehicle
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <Card className="shadow-lg border-[#F5EF1B] bg-tranparent transition">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-white">
                <div>
                  <CardTitle>Fleet Overview</CardTitle>
                  <CardDescription className="text-gray-300">
                    Complete list of all vehicles in your fleet
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Responsive Table/Accordion for Vehicle List */}
              {/* Desktop Table */}
              <div className="hidden sm:block">
                <Table>
                  <TableHeader>
                    <TableRow className="text-[#F5EF1B]">
                      <TableHead className="text-[#F5EF1B]">Company</TableHead>
                      <TableHead className="text-[#F5EF1B]">
                        Vehicle Model
                      </TableHead>
                      <TableHead className="text-[#F5EF1B]">
                        Vehcile Plate Number
                      </TableHead>
                      <TableHead className="text-[#F5EF1B]">Year</TableHead>
                      <TableHead className="text-[#F5EF1B]">
                        Vehicle Jurisdiction
                      </TableHead>
                      <TableHead className="text-[#F5EF1B]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center">
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
                    ) : paginatedVehicles.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center">
                          No vehicle found
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedVehicles.map((vehicle) => (
                        <TableRow key={vehicle._id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#F5EF1B] rounded-full flex items-center justify-center">
                                <span className="text-gray-800 font-semibold text-base">
                                  {vehicle.company ? (
                                    vehicle.company
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                      .toUpperCase()
                                  ) : (
                                    <Car className="h-5 w-5 text-blue-600" />
                                  )}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium text-white">
                                  {highlightMatch(
                                    vehicle?.company,
                                    debouncedsearch
                                  )}
                                </div>
                                {/* <div className="text-sm text-gray-500">
                                  {vehicle.color
                                    ? vehicle.color.charAt(0).toUpperCase() +
                                      vehicle.color.slice(1)
                                    : ""}{" "}
                                  • {vehicle?._id?.slice(0, 8)}
                                </div> */}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-sm">
                                <span className="text-white">
                                  {vehicle?.vehicleModel}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="inline-block text-gray-300 font-bold">
                                  Plate
                                </span>
                                <span className="font-semibold text-white text-base tracking-wide">
                                  {vehicle.vehicle_plate_number || "N/A"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="inline-block text-gray-300 font-bold">
                                  Reg.
                                </span>
                                <span className="text-gray-300 font-mono text-sm">
                                  {vehicle.registrationNumber
                                    ? `${vehicle.registrationNumber.slice(
                                        0,
                                        4
                                      )}...${vehicle.registrationNumber.slice(
                                        -4
                                      )}`
                                    : "N/A"}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-sm">
                                <span className="text-white">
                                  {vehicle?.year}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-sm">
                                <span className="text-white">
                                  {vehicle?.vehRegJur}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          {/* <TableCell>
                            <div className="text-sm">
                              <div className="text-gray-500 dark:text-gray-200">
                                {vehicle?.vehicle_plate_number
                                  ? vehicle.vehicle_plate_number
                                  : "Not Set"}
                              </div>
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
                                    handleDialogOpen(vehicle, "view")
                                  }
                                >
                                  <Eye className="w-4 h-4 opacity-90" />
                                  <span>View Vehicle</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="flex items-center gap-2 rounded-md transition-colors hover:bg-[#fff475]/80 hover:text-zinc-900 font-semibold focus:bg-[#fff475]/90 focus:text-zinc-800"
                                  onClick={() =>
                                    handleDialogOpen(vehicle, "edit")
                                  }
                                >
                                  <Pencil className="w-4 h-4 opacity-90" />
                                  <span>Update Vehicle</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="flex items-center gap-2 rounded-md transition-colors font-semibold text-red-700 hover:bg-red-100 focus:bg-red-200"
                                  onClick={() =>
                                    handleDialogOpen(vehicle, "delete")
                                  }
                                >
                                  <Trash className="w-4 h-4 opacity-90" />
                                  <span>Delete Vehicle</span>
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
              {/* Mobile Accordion */}
              <div className="block sm:hidden">
                {isLoading ? (
                  <div className="text-center py-8 text-gray-500">
                    Loading...
                  </div>
                ) : error ? (
                  <div className="text-center py-8 text-red-600">{error}</div>
                ) : paginatedVehicles.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No vehicle found
                  </div>
                ) : (
                  <Accordion type="single" collapsible>
                    {paginatedVehicles.map((vehicle) => (
                      <AccordionItem key={vehicle._id} value={vehicle._id}>
                        <AccordionTrigger className="text-white">
                          <div className="flex items-center gap-3 w-full">
                            <div className="w-10 h-10 bg-[#F5EF1B] rounded-full flex items-center justify-center">
                              <span className="text-gray-800 font-semibold text-base">
                                {vehicle.company ? (
                                  vehicle.company
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()
                                ) : (
                                  <Car className="h-5 w-5 text-blue-600" />
                                )}
                              </span>
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                              <span className="font-medium text-gray-200 truncate">
                                {highlightMatch(
                                  vehicle?.company,
                                  debouncedsearch
                                )}
                              </span>
                              <span className="text-xs text-gray-300 truncate">
                                {vehicle?.vehicleModel}
                              </span>
                            </div>
                            {/* <span
                              className={`px-2 py-1 mr-2 rounded-full font-semibold text-xs ${
                                vehicle.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : vehicle.status === "inactive"
                                  ? "bg-gray-200 text-gray-700"
                                  : vehicle.status === "maintenance"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {vehicle.status
                                ? vehicle.status.charAt(0).toUpperCase() +
                                  vehicle.status.slice(1)
                                : "Unknown"}
                            </span> */}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="px-2 py-3 space-y-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <Car className="w-4 h-8 text-white" />
                                <span className="block font-medium text-white">
                                  License Plate
                                </span>
                              </div>
                              <span className="font-medium text-white">
                                {vehicle.vehicle_plate_number}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                {/* <IdCardIcon className="w-4 h-8 text-white" /> */}
                                <span className="block font-medium text-white">
                                  Registration Number
                                </span>
                              </div>
                              <span className="font-medium text-white">
                                {vehicle.registrationNumber
                                  ? `${vehicle.registrationNumber}`
                                  : "N/A"}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                {/* <IdCardIcon className="w-4 h-8 text-white" /> */}
                                <span className="block font-medium text-white">
                                  Vehicle Jurisdiction
                                </span>
                              </div>
                              <span className="font-medium text-white">
                                {vehicle.vehRegJur
                                  ? `${vehicle.vehRegJur}`
                                  : "N/A"}
                              </span>
                            </div>
                            <div>
                              {/* <div></div> */}
                              <div className="flex items-center gap-2">
                                <span className="block font-medium text-white">
                                  Year
                                </span>
                                <span className="font-medium text-white">
                                  {vehicle.year}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() =>
                                  handleDialogOpen(vehicle, "view")
                                }
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() =>
                                  handleDialogOpen(vehicle, "edit")
                                }
                              >
                                <Pencil className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="flex-1"
                                onClick={() =>
                                  handleDialogOpen(vehicle, "delete")
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

        <Dialog open={dialogType === "view"} onOpenChange={handleDialogClose}>
          {/* <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#F5EF1B] hover:bg-zinc-800"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger> */}

          <DialogContent className="sm:max-w-xl bg-[#F5EF1B] border-none rounded-2xl shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-zinc-900 text-center">
                🚗 Vehicle Details
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-5 mt-6 px-2">
              {[
                { label: "Company", value: selectedVehicle?.company },
                {
                  label: "Vehicle Model",
                  value: selectedVehicle?.vehicleModel,
                },
                { label: "Year", value: selectedVehicle?.year },
                {
                  label: "Plate Number",
                  value: selectedVehicle?.vehicle_plate_number || "Not Set",
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
          <DialogContent className="bg-[#F5EF1B] border-none rounded-2xl shadow-xl p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-zinc-900">
                Edit Vehicle
              </DialogTitle>
              <DialogDescription className="text-sm text-zinc-500">
                Update vehicle details and save changes.
              </DialogDescription>
            </DialogHeader>

            {iserror && (
              <p className="bg-red-100 border border-red-400 rounded-md text-red-600 text-center text-sm py-2 mt-3">
                {iserror}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-2">
              <div>
                <Label
                  htmlFor="registrationNumber"
                  className="text-right text-lg font-medium text-zinc-700"
                >
                  Registration No.
                </Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      registrationNumber: e.target.value,
                    })
                  }
                  className="col-span-3 rounded-xl border border-black focus:border-zinc-700 text-zinc-800"
                />
              </div>

              <div>
                <Label
                  htmlFor="company"
                  className="text-right text-lg font-medium text-zinc-700"
                >
                  Company
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      company: e.target.value,
                    })
                  }
                  className="col-span-3 rounded-xl text-zinc-800  border-black focus:border-zinc-700"
                />
              </div>

              <div>
                <Label
                  htmlFor="vehicleModel"
                  className="text-right text-lg font-medium text-zinc-700"
                >
                  Model
                </Label>
                <Input
                  id="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vehicleModel: e.target.value,
                    })
                  }
                  className="col-span-3 rounded-xl text-zinc-800  border-black focus:border-zinc-700"
                />
              </div>

              <div>
                <Label
                  htmlFor="year"
                  className="text-right text-lg font-medium text-zinc-700"
                >
                  Year
                </Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      year: Number(e.target.value),
                    })
                  }
                  className="col-span-3 rounded-xl text-zinc-800  border-black focus:border-zinc-700"
                />
              </div>

              <div>
                <Label
                  htmlFor="vehicle_plate_number"
                  className="text-right text-lg font-medium text-zinc-700"
                >
                  Plate Number
                </Label>
                <Input
                  id="vehicle_plate_number"
                  value={formData.vehicle_plate_number}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vehicle_plate_number: e.target.value,
                    })
                  }
                  className="col-span-3 rounded-xl text-zinc-800  border-black focus:border-zinc-700"
                />
              </div>

              <div>
                <Label
                  htmlFor="vehRegJur"
                  className="text-right text-lg font-medium text-zinc-700"
                >
                  Jurisdiction
                </Label>
                <Select
                  value={formData.vehRegJur}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      vehRegJur: value,
                    })
                  }
                >
                  <SelectTrigger className="col-span-3 rounded-xl text-zinc-800  border-black focus:border-zinc-700">
                    <SelectValue placeholder="Select the Drivers License Jurisdiction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>Fruits</SelectLabel> */}
                      <SelectItem value="AB">Alberta</SelectItem>
                      <SelectItem value="AK">Alaska</SelectItem>
                      <SelectItem value="AL">Alabama</SelectItem>
                      <SelectItem value="AR">Arkansas</SelectItem>
                      <SelectItem value="AZ">Arizona</SelectItem>
                      <SelectItem value="BC">British Columbia</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="CO">Colorado</SelectItem>
                      <SelectItem value="CT">Connecticut</SelectItem>
                      <SelectItem value="DC">District of Columbia</SelectItem>
                      <SelectItem value="DE">Delaware</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="GA">Georgia</SelectItem>
                      <SelectItem value="HI">Hawaii</SelectItem>
                      <SelectItem value="IA">Iowa</SelectItem>
                      <SelectItem value="ID">Idaho</SelectItem>
                      <SelectItem value="IL">Illinois</SelectItem>
                      <SelectItem value="IN">Indiana</SelectItem>
                      <SelectItem value="KS">Kansas</SelectItem>
                      <SelectItem value="KY">Kentucky</SelectItem>
                      <SelectItem value="LA">Louisiana</SelectItem>
                      <SelectItem value="MA">Massachusetts</SelectItem>
                      <SelectItem value="MB">Manitoba</SelectItem>
                      <SelectItem value="MD">Maryland</SelectItem>
                      <SelectItem value="ME">Maine</SelectItem>
                      <SelectItem value="MI">Michigan</SelectItem>
                      <SelectItem value="MN">Minnesota</SelectItem>
                      <SelectItem value="MO">Missouri</SelectItem>
                      <SelectItem value="MS">Mississippi</SelectItem>
                      <SelectItem value="MT">Montana</SelectItem>
                      <SelectItem value="NB">New Brunswick</SelectItem>
                      <SelectItem value="NC">North Carolina</SelectItem>
                      <SelectItem value="ND">North Dakota</SelectItem>
                      <SelectItem value="NE">Nebraska</SelectItem>
                      <SelectItem value="NH">New Hampshire</SelectItem>
                      <SelectItem value="NL">
                        Newfoundland and Labrador
                      </SelectItem>
                      <SelectItem value="NM">New Mexico</SelectItem>
                      <SelectItem value="NS">Nova Scotia</SelectItem>
                      <SelectItem value="NU">Nunavut</SelectItem>
                      <SelectItem value="NV">Nevada</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="OH">Ohio</SelectItem>
                      <SelectItem value="OK">Oklahoma</SelectItem>
                      <SelectItem value="ON">Ontario</SelectItem>
                      <SelectItem value="OR">Oregon</SelectItem>
                      <SelectItem value="OTH">Other</SelectItem>
                      <SelectItem value="PA">Pennsylvania</SelectItem>
                      <SelectItem value="PE">Prince Edward Island</SelectItem>
                      <SelectItem value="QC">Quebec</SelectItem>
                      <SelectItem value="RI">Rhode Island</SelectItem>
                      <SelectItem value="SC">South Carolina</SelectItem>
                      <SelectItem value="SD">South Dakota</SelectItem>
                      <SelectItem value="SK">Saskatchewan</SelectItem>
                      <SelectItem value="TN">Tennessee</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="UT">Utah</SelectItem>
                      <SelectItem value="VA">Virginia</SelectItem>
                      <SelectItem value="VT">Vermont</SelectItem>
                      <SelectItem value="WA">Washington</SelectItem>
                      <SelectItem value="WI">Wisconsin</SelectItem>
                      <SelectItem value="WV">West Virginia</SelectItem>
                      <SelectItem value="WY">Wyoming</SelectItem>
                      <SelectItem value="XX">Unknown</SelectItem>
                      <SelectItem value="YT">Yukon Territory</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="type"
                  className="text-right text-lg font-medium text-zinc-700"
                >
                  Type
                </Label>
                <Select
                  value={formData.tripTypeCd}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      tripTypeCd: value,
                    })
                  }
                >
                  <SelectTrigger className="col-span-3 rounded-xl text-zinc-800  border-black focus:border-zinc-700">
                    <SelectValue placeholder="Select the Drivers License Jurisdiction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>Fruits</SelectLabel> */}
                      <SelectItem value="ACCES">Accessible</SelectItem>
                      <SelectItem value="CNVTL">Conventional</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className="mt-4">
                <Button
                  disabled={isSubmitting}
                  className=" rounded-xl py-2 font-semibold mt-4"
                >
                  Update Vehicle
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={dialogType === "delete"}
          onOpenChange={handleDialogClose}
        >
          <AlertDialogContent className="bg-[#F5EF1B] border-none">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Delete this Vehicle{" "}
                <span className="font-bold">{selectedVehicle?.company}</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (selectedVehicle?.registrationNumber) {
                    handleDeleteVehicle(selectedVehicle.registrationNumber);
                  }
                }}
              >
              
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
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
