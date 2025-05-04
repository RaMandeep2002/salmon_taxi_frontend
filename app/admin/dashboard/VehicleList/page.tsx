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

  const { iserror } = useSelector(
    (state: RootState) => state.updateVehcile
  );
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
    company: selectedVehicle?.company || "",
    vehicleModel: selectedVehicle?.vehicleModel || "",
    year: selectedVehicle?.year || 0,
    vehicle_plate_number: selectedVehicle?.vehicle_plate_number || "",
  });
  useEffect(() => {
    if (selectedVehicle) {
      setFormData({
        company: selectedVehicle.company || "",
        vehicleModel: selectedVehicle.vehicleModel || "",
        year: selectedVehicle.year || 0,
        vehicle_plate_number: selectedVehicle.vehicle_plate_number || "",
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
          registrationNumber: selectedVehicle!.registrationNumber,
          vehicleData: {
            company: formData.company,
            vehicleModel: formData.vehicleModel,
            year: formData.year,
            vehicle_plate_number: formData.vehicle_plate_number,
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
    }
    finally {
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
                {/*    <TableHead  className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Registration Number
                </TableHead> */}
                   <TableHead  className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Company
                </TableHead>
                   <TableHead  className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Vehicle Model
                </TableHead>
                   <TableHead  className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Year
                </TableHead>
                   <TableHead  className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
                  Vehcile Plate Number
                </TableHead>
                {/* <TableHead className="w-[100px] h-[50px] text-[#F5EF1B] text-lg ">
                  Status
                </TableHead> */}
                   <TableHead  className="w-[100px] text-center text-[#F5EF1B] text-xs sm:text-sm">
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
              ) : Vehicles?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No drivers found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedVehicles.map((vehicle) => (
                  <TableRow
                    className="border border-[#F5EF1B]"
                    key={vehicle._id}
                  >
                    {/* <TableCell className="font-medium w-[100px] h-[50px] text-white text-lg">
                          {driver.driverId}
                        </TableCell> */}

                    {/* <TableCell className="font-medium w-[100px] h-[50px] text-white text-lg">
                      {vehicle.registrationNumber}
                    </TableCell> */}
                  <TableCell className="font-medium w-[100px] text-center text-white text-base">
                      {highlightMatch(vehicle?.company, debouncedsearch)}
                    </TableCell>
                  <TableCell className="font-medium w-[100px] text-center text-white text-base">
                      {vehicle?.vehicleModel}
                    </TableCell>
                  <TableCell className="font-medium w-[100px] text-center text-white text-base">
                      {vehicle?.year}
                    </TableCell>
                  <TableCell className="font-medium w-[100px] text-center text-white text-base">
                      {vehicle?.vehicle_plate_number
                        ? vehicle.vehicle_plate_number
                        : "Not Set"}
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
                    <TableCell>
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

                        <DialogContent className="bg-[#F5EF1B] border-none rounded-2xl shadow-xl max-w-2xl px-6 py-6">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-semibold text-zinc-800">
                              Vehicle Detail
                            </DialogTitle>
                          </DialogHeader>

                          <div className="grid gap-y-4 mt-4">
                            {[
                              // {
                              //   label: "Registration Number",
                              //   value: vehicle.registrationNumber,
                              // },
                              { label: "Company", value: vehicle.company },
                              {
                                label: "Vehicle Model",
                                value: vehicle.vehicleModel,
                              },
                              { label: "Year", value: vehicle.year },
                              {
                                label: "Vehicle Plate Number",
                                value:
                                  vehicle.vehicle_plate_number || "Not Set",
                              },
                            ].map((item, index) => (
                              <div
                                key={index}
                                className="grid grid-cols-4 items-center gap-2 py-2 border-b last:border-none"
                              >
                                <Label className="col-span-1 text-right text-sm font-medium text-zinc-600">
                                  {item.label}
                                </Label>
                                <div className="col-span-3 text-base font-semibold text-zinc-800">
                                  {item.value}
                                </div>
                              </div>
                            ))}

                            {/* Uncomment if you want to add status badge again */}
                            {/* <div className="grid grid-cols-4 items-center gap-2 py-2">
        <Label className="text-right text-sm font-medium text-zinc-600">
          Status
        </Label>
        <div className="col-span-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
      </div> */}
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
                        <DialogContent className="bg-[#F5EF1B] border-none">
                          <DialogHeader>
                            <DialogTitle className="text-lg text-zinc-800">
                              Edit Vehicle
                            </DialogTitle>
                          </DialogHeader>
                          {iserror && (
                            <p className="text-red-500 text-center">
                              {iserror}
                            </p>
                          )}
                          <form
                            onSubmit={handleSubmit} // Uncomment when ready to use
                          >
                            <div className="grid gap-4 py-4">
                              {/* <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="driverId"
                                className="text-right text-lg font-medium text-zinc-800"
                              >
                                Driver ID
                              </Label>
                              <Input
                                id="driverId"
                                // defaultValue={driver.driverId}
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
                                // defaultValue={driver.drivername}
                                className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                              />
                            </div> */}
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="company"
                                  className="text-right text-lg font-medium text-zinc-800"
                                >
                                  Company
                                </Label>
                                <Input
                                  id="company"
                                  type="text"
                                  value={formData.company}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      company: e.target.value,
                                    })
                                  }
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
                                  type="text"
                                  value={formData.vehicleModel}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      vehicleModel: e.target.value,
                                    })
                                  }
                                  // defaultValue={vehicle.vehicleModel}
                                  className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="year"
                                  className="text-right text-lg font-medium text-zinc-800"
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
                                  // defaultValue={vehicle.year}
                                  className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="Plate-Number"
                                  className="text-right text-lg font-medium text-zinc-800"
                                >
                                  Vehicle Plate Number
                                </Label>
                                <Input
                                  id="vehicle_plate_number"
                                  type="text"
                                  value={formData.vehicle_plate_number}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      vehicle_plate_number: e.target.value,
                                    })
                                  }
                                  // defaultValue={vehicle.vehicle_plate_number}
                                  className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit" disabled={isSubmitting}>Update Vehicle</Button>
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