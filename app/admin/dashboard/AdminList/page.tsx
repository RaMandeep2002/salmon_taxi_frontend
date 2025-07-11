"use client";
import { Input } from "@/components/ui/input";
import DashboardLayout from "../../DashBoardLayout";
import { Button } from "@/components/ui/button";
// import { Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { useDebounce } from "@/lib/useDebounce";
import {
  Admins,
  fetchAdminsdetails,
} from "../../slices/slice/fetchingAdminSlice";
import { useSelector } from "react-redux";
import { Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { updateAdmin } from "../../slices/slice/updateUserSlice";
import { useToast } from "@/hooks/use-toast";
import { deleteAdmin } from "../../slices/slice/deleteAdminSlice";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function AdminList() {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);

  const [selectedAdmin, setSelectedAdmin] = useState<Admins | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const {
    data: admins,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.adminFetching);
  const { isProcessing, iserror } = useSelector(
    (state: RootState) => state.updateAdmin
  );
  const { isDeleteting, succeesMessage } = useSelector(
    (state: RootState) => state.deleteAdmins
  );

  //   const [showPassword, setShowPassword] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    dispatch(fetchAdminsdetails());
  }, [dispatch]);

  const filteredAdmins =
    admins?.filter((admin) => {
      const matchesSearch =
        admin.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        admin.email.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchesSearch;
    }) || [];

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (selectedAdmin) {
      setFormData({
        name: selectedAdmin.name,
        email: selectedAdmin.email,
        password: "",
      });
    }
  }, [selectedAdmin]);

  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const paginatedDrivers = filteredAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));




  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedAdmin) {
      return;
    }

    try {
      await dispatch(
        updateAdmin({
          userId: selectedAdmin._id,
          userData: {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          },
        })
      ).unwrap();

      if (!iserror) {
        toast.toast({
          title: "Admin Updated Successfully",
        });
        dispatch(fetchAdminsdetails());
      }
    } catch (error) {
      toast.toast({
        title: "Error",
        description: `Failed to update driver: ${error}`,
        variant: "destructive",
      });
    }
  };


  const handleAdminDriver = (userId: string) => async () => {
    try {
      await dispatch(deleteAdmin(userId));
      if (!isDeleteting) {
        toast.toast({
          title: "Admin Deleted",
          description: succeesMessage,
        });
        dispatch(fetchAdminsdetails());
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
        <h1 className="text-3xl font-bold mb-6 text-[#F5EF1B]">Admins List</h1>

        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 w-full sm:w-auto">
            <Input
              placeholder="Search by name, email..."
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
              onClick={() => router.push("/admin/dashboard/AddAdmin")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Register Admin
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
                  <TableCell colSpan={5} className="text-center text-white">
                    {error}
                  </TableCell>
                </TableRow>
              ) : filteredAdmins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No drivers found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedDrivers.map((admin) => (
                  <TableRow
                    className="text-center border text-yellow-400 border-[#F5EF1B]"
                    key={admin._id}
                  >
                    <TableCell className="text-white text-xs sm:text-sm">
                      {highlightMatch(admin.name, debouncedSearch)}
                    </TableCell>
                    <TableCell className="text-white text-xs sm:text-sm">
                      {admin.email}
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
                            onClick={() => setSelectedAdmin(admin)}
                          >
                            <Eye className="h-4 w-4 text-[#F5EF1B]" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl bg-[#F5EF1B] border-none rounded-2xl shadow-lg">
                          <DialogHeader>
                            <DialogTitle className="text-3xl font-bold text-zinc-900 text-center">
                              Admin Details
                            </DialogTitle>
                          </DialogHeader>

                          <div className="grid gap-5 mt-6 px-2">
                            {[
                              {
                                label: "Name",
                                value: selectedAdmin?.name,
                              },
                              { label: "Email", value: selectedAdmin?.email },
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
                            onClick={() => setSelectedAdmin(admin)}
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
                          <form
                          onSubmit={handleSubmit}
                          >
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="name"
                                  className="text-right     text-zinc-800"
                                >
                                  Admin Name
                                </Label>
                                <Input
                                  id="name"
                                  type="text"
                                  placeholder="Enter Driver Name"
                                  value={formData.name}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      name: e.target.value,
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

                              <h1 className="text-zinc-800">
                                Update Password For {admin.name}
                              </h1>
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
                              <Button
                                type="submit"
                                disabled={isProcessing}
                              >
                                {isProcessing ? "Updating..." : "update Admin"}
                                
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
                                  {admin.name}
                                </span>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleAdminDriver(admin._id)}
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
