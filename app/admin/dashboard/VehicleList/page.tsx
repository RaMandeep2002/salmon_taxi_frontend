"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Trash2, Eye, Plus } from "lucide-react";

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
  DialogTrigger,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

  const itemsPerPage = 10;

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const [filterStatus, setFilterStatus] = useState("All");

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
        <h1 className="text-3xl font-bold mb-6 text-[#F5EF1B]">Vehicle List</h1>
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 w-full sm:w-auto">
            <Input
              placeholder="Search by name or email..."
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
        <div className="border border-[#F5EF1B] rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="text-center border border-[#F5EF1B] ">
                {/* <TableHead className="w-[100px] h-[50px] text-[#F5EF1B] text-lg ">
                  Driver ID
                </TableHead> */}
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Registration Number
                </TableHead>
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Company
                </TableHead>
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Vehicle Model
                </TableHead>
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Year
                </TableHead>
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Vehcile Plate Number
                </TableHead>
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Vehicle Jurisdiction
                </TableHead>
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Type
                </TableHead>
                {/* <TableHead className="w-[100px] h-[50px] text-[#F5EF1B] text-lg ">
                  Status
                </TableHead> */}
                <TableHead className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
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
                  <TableCell colSpan={8} className="text-center text-white">
                    {error}
                  </TableCell>
                </TableRow>
              ) : Vehicles?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No drivers found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedVehicles.map((vehicle) => (
                  <TableRow
                    className="text-white text-center font-medium border border-[#F5EF1B]"
                    key={vehicle._id}
                  >
                    {/* <TableCell className="font-medium w-[100px] h-[50px] text-white text-lg">
                          {driver.driverId}
                        </TableCell> */}

                    <TableCell>{vehicle.registrationNumber}</TableCell>
                    <TableCell>
                      {highlightMatch(vehicle?.company, debouncedsearch)}
                    </TableCell>
                    <TableCell>{vehicle?.vehicleModel}</TableCell>
                    <TableCell>{vehicle?.year}</TableCell>
                    <TableCell>
                      {vehicle?.vehicle_plate_number
                        ? vehicle.vehicle_plate_number
                        : "Not Set"}
                    </TableCell>
                    <TableCell>
                      {vehicle?.vehRegJur ? vehicle.vehRegJur : "Not Set"}
                    </TableCell>
                    <TableCell>
                      {vehicle?.tripTypeCd ? vehicle.tripTypeCd : "Not Set"}
                    </TableCell>
                    {/* <TableCell className="font-medium w-[100px] h-[50px] text-white text-lg">
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
                    </TableCell> */}
                    <TableCell className="text-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-[#F5EF1B] hover:bg-zinc-800"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-xl bg-[#F5EF1B] border-none rounded-2xl shadow-lg">
                          <DialogHeader>
                            <DialogTitle className="text-3xl font-bold text-zinc-900 text-center">
                              🚗 Vehicle Details
                            </DialogTitle>
                          </DialogHeader>

                          <div className="grid gap-5 mt-6 px-2">
                            {[
                              { label: "Company", value: vehicle?.company },
                              {
                                label: "Vehicle Model",
                                value: vehicle?.vehicleModel,
                              },
                              { label: "Year", value: vehicle?.year },
                              {
                                label: "Plate Number",
                                value:
                                  vehicle?.vehicle_plate_number || "Not Set",
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
                        <DialogTrigger asChild className="text-[#F5EF1B]">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedVehicle(vehicle)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
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

                          <form
                            onSubmit={handleSubmit}
                            className="mt-4 space-y-5"
                          >
                            <div className="grid grid-cols-4 items-center gap-3">
                              <Label
                                htmlFor="registrationNumber"
                                className="text-right font-medium text-zinc-700"
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
                                className="col-span-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-700 text-zinc-800"
                              />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-3">
                              <Label
                                htmlFor="company"
                                className="text-right font-medium text-zinc-700"
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
                                className="col-span-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-700 text-zinc-800"
                              />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-3">
                              <Label
                                htmlFor="vehicleModel"
                                className="text-right font-medium text-zinc-700"
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
                                className="col-span-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-700 text-zinc-800"
                              />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-3">
                              <Label
                                htmlFor="year"
                                className="text-right font-medium text-zinc-700"
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
                                className="col-span-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-700 text-zinc-800"
                              />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-3">
                              <Label
                                htmlFor="vehicle_plate_number"
                                className="text-right font-medium text-zinc-700"
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
                                className="col-span-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-700 text-zinc-800"
                              />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-3">
                              <Label
                                htmlFor="vehRegJur"
                                className="text-right font-medium text-zinc-700"
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
                                  <SelectTrigger className="col-span-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-700 text-zinc-800">
                                    <SelectValue placeholder="Select the Drivers License Jurisdiction" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {/* <SelectLabel>Fruits</SelectLabel> */}
                                      <SelectItem value="AB">
                                        Alberta
                                      </SelectItem>
                                      <SelectItem value="AK">Alaska</SelectItem>
                                      <SelectItem value="AL">
                                        Alabama
                                      </SelectItem>
                                      <SelectItem value="AR">
                                        Arkansas
                                      </SelectItem>
                                      <SelectItem value="AZ">
                                        Arizona
                                      </SelectItem>
                                      <SelectItem value="BC">
                                        British Columbia
                                      </SelectItem>
                                      <SelectItem value="CA">
                                        California
                                      </SelectItem>
                                      <SelectItem value="CO">
                                        Colorado
                                      </SelectItem>
                                      <SelectItem value="CT">
                                        Connecticut
                                      </SelectItem>
                                      <SelectItem value="DC">
                                        District of Columbia
                                      </SelectItem>
                                      <SelectItem value="DE">
                                        Delaware
                                      </SelectItem>
                                      <SelectItem value="FL">
                                        Florida
                                      </SelectItem>
                                      <SelectItem value="GA">
                                        Georgia
                                      </SelectItem>
                                      <SelectItem value="HI">Hawaii</SelectItem>
                                      <SelectItem value="IA">Iowa</SelectItem>
                                      <SelectItem value="ID">Idaho</SelectItem>
                                      <SelectItem value="IL">
                                        Illinois
                                      </SelectItem>
                                      <SelectItem value="IN">
                                        Indiana
                                      </SelectItem>
                                      <SelectItem value="KS">Kansas</SelectItem>
                                      <SelectItem value="KY">
                                        Kentucky
                                      </SelectItem>
                                      <SelectItem value="LA">
                                        Louisiana
                                      </SelectItem>
                                      <SelectItem value="MA">
                                        Massachusetts
                                      </SelectItem>
                                      <SelectItem value="MB">
                                        Manitoba
                                      </SelectItem>
                                      <SelectItem value="MD">
                                        Maryland
                                      </SelectItem>
                                      <SelectItem value="ME">Maine</SelectItem>
                                      <SelectItem value="MI">
                                        Michigan
                                      </SelectItem>
                                      <SelectItem value="MN">
                                        Minnesota
                                      </SelectItem>
                                      <SelectItem value="MO">
                                        Missouri
                                      </SelectItem>
                                      <SelectItem value="MS">
                                        Mississippi
                                      </SelectItem>
                                      <SelectItem value="MT">
                                        Montana
                                      </SelectItem>
                                      <SelectItem value="NB">
                                        New Brunswick
                                      </SelectItem>
                                      <SelectItem value="NC">
                                        North Carolina
                                      </SelectItem>
                                      <SelectItem value="ND">
                                        North Dakota
                                      </SelectItem>
                                      <SelectItem value="NE">
                                        Nebraska
                                      </SelectItem>
                                      <SelectItem value="NH">
                                        New Hampshire
                                      </SelectItem>
                                      <SelectItem value="NL">
                                        Newfoundland and Labrador
                                      </SelectItem>
                                      <SelectItem value="NM">
                                        New Mexico
                                      </SelectItem>
                                      <SelectItem value="NS">
                                        Nova Scotia
                                      </SelectItem>
                                      <SelectItem value="NU">
                                        Nunavut
                                      </SelectItem>
                                      <SelectItem value="NV">Nevada</SelectItem>
                                      <SelectItem value="NY">
                                        New York
                                      </SelectItem>
                                      <SelectItem value="OH">Ohio</SelectItem>
                                      <SelectItem value="OK">
                                        Oklahoma
                                      </SelectItem>
                                      <SelectItem value="ON">
                                        Ontario
                                      </SelectItem>
                                      <SelectItem value="OR">Oregon</SelectItem>
                                      <SelectItem value="OTH">Other</SelectItem>
                                      <SelectItem value="PA">
                                        Pennsylvania
                                      </SelectItem>
                                      <SelectItem value="PE">
                                        Prince Edward Island
                                      </SelectItem>
                                      <SelectItem value="QC">Quebec</SelectItem>
                                      <SelectItem value="RI">
                                        Rhode Island
                                      </SelectItem>
                                      <SelectItem value="SC">
                                        South Carolina
                                      </SelectItem>
                                      <SelectItem value="SD">
                                        South Dakota
                                      </SelectItem>
                                      <SelectItem value="SK">
                                        Saskatchewan
                                      </SelectItem>
                                      <SelectItem value="TN">
                                        Tennessee
                                      </SelectItem>
                                      <SelectItem value="TX">Texas</SelectItem>
                                      <SelectItem value="UT">Utah</SelectItem>
                                      <SelectItem value="VA">
                                        Virginia
                                      </SelectItem>
                                      <SelectItem value="VT">
                                        Vermont
                                      </SelectItem>
                                      <SelectItem value="WA">
                                        Washington
                                      </SelectItem>
                                      <SelectItem value="WI">
                                        Wisconsin
                                      </SelectItem>
                                      <SelectItem value="WV">
                                        West Virginia
                                      </SelectItem>
                                      <SelectItem value="WY">
                                        Wyoming
                                      </SelectItem>
                                      <SelectItem value="XX">
                                        Unknown
                                      </SelectItem>
                                      <SelectItem value="YT">
                                        Yukon Territory
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-3">
                              <Label
                                htmlFor="type"
                                className="text-right font-medium text-zinc-700"
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
                                  <SelectTrigger  className="col-span-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-700 text-zinc-800">
                                    <SelectValue placeholder="Select the Drivers License Jurisdiction" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {/* <SelectLabel>Fruits</SelectLabel> */}
                                      <SelectItem value="ACCES">
                                      Accessible
                                      </SelectItem>
                                      <SelectItem value="CNVTL">Conventional</SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                            </div>

                            <DialogFooter>
                              <Button
                                disabled={isSubmitting}
                                className="w-full rounded-xl py-2 font-semibold"
                              >
                                Update Vehicle
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
                              Delete this Vehicle{" "}
                              <span className="font-bold">
                                {vehicle.company}
                              </span>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDeleteVehicle(vehicle.registrationNumber)
                              }
                            >
                              Delete
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
