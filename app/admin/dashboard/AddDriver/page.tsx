"use client";
import DashboardLayout from "@/app/admin/DashBoardLayout";
import { addDriver } from "@/app/admin/slices/slice/addDriverSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { toast } from "sonner";

export default function AddDriver() {
  const toast = useToast();
  const [drivername, setDrivername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [driversLicenseNumber, setDriversLicenseNumber] = useState<string>("");
  const [driversLicJur, setdriversLicJur] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [success, setSuccess] = useState(false);

  const { isLoading, error, validationErrors, successMessage } = useSelector(
    (state: RootState) => state.addDriver
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    console.log({
      drivername,
      email,
      driversLicenseNumber,
      driversLicJur,
      phoneNumber: String(phoneNumber),
      password,
    });

    // console.log(drivername, email, driversLicenseNumber, driversLicJur);
    if (phoneNumber === undefined) {
      alert("Please enter a valid phone number.");
      return;
    }

    try {
      const resultAction = await dispatch(
        addDriver({
          drivername,
          email,
          driversLicenseNumber,
          driversLicJur,
          phoneNumber: String(phoneNumber),
          password,
        })
      );
      // toast.success("Driver added successfully!");

      if (addDriver.fulfilled.match(resultAction)) {
        setSuccess(true);
        setDrivername("");
        setEmail("");
        setDriversLicenseNumber("");
        setdriversLicJur("");
        setPhoneNumber("");
        setPassword("");
        toast.toast({
          title: "Driver added successfully!",
          variant: "default",
        });
        // router.push("/admin/dashboard/DriverList")
      } else if (addDriver.rejected.match(resultAction)) {
        // Show error from payload if available
        const errorMsg =
          resultAction.payload?.message || "Failed to add driver.";
        toast.toast({
          title: "Error",
          description: errorMsg,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast.toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : String(error) || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const generatePassword = () => {
    const length = 8;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <DashboardLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-[#F5EF1B]">
          Add New Driver
        </h2>
        <div
          className="max-w-2xl w-full mx-auto bg-[#F5EF1B] p-4 sm:p-6 md:p-8 mt-6 sm:mt-12 rounded-md
        "
        >
          {successMessage && (
            <Dialog open={success} onOpenChange={setSuccess}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-green-600 dark:text-yellow-300 text-center">
                    New Driver added successfully!
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    The new Driver has been added.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center mt-4">
                  <Button onClick={() => setSuccess(false)} autoFocus>
                    Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            // <p>{successMessage}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4">
            {error && (
              <div className="flex items-center justify-center mb-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-3 rounded-lg flex items-center gap-2 shadow-sm w-full max-w-full">
                  <svg
                    className="w-5 h-5 text-red-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0ZM12 7v4m0 4h.01"
                    />
                  </svg>
                  <span className="text-sm sm:text-sm font-medium">
                    {error}
                  </span>
                </div>
              </div>
            )}
            <div>
              <label className="block text-base sm:text-lg font-medium text-zinc-800">
                Driver name
              </label>
              <Input
                type="text"
                name="name"
                autoComplete="off"
                placeholder="Enter the name of Driver"
                value={drivername}
                onChange={(e) => setDrivername(e.target.value)}
                className="w-full py-5 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-500 rounded-md"
              />
              {validationErrors
                .filter((err) => err.field === "drivername")
                .map((err, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 mt-1 text-sm text-red-600 bg-red-100 border border-red-300 rounded px-2 py-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                      />
                    </svg>
                    <span>{err.message}</span>
                  </div>
                ))}
            </div>

            <div>
              <label className="block text-base sm:text-lg font-medium text-zinc-800">
                Email
              </label>
              <Input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Enter the Email of Driver"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
             className="w-full py-5 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-500 rounded-md"
              />
              {validationErrors
                .filter((err) => err.field === "email")
                .map((err, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 mt-1 text-sm text-red-600 bg-red-100 border border-red-300 rounded px-2 py-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                      />
                    </svg>
                    <span>{err.message}</span>
                  </div>
                ))}
            </div>
            <div>
              <label className="block text-base sm:text-lg font-medium text-zinc-800">
                Drivers License Number
              </label>
              <Input
                type="text"
                name="driversLicenseNumber"
                autoComplete="off"
                placeholder="Enter the Drivers License Number of Driver"
                value={driversLicenseNumber}
                onChange={(e) => setDriversLicenseNumber(e.target.value)}
              className="w-full py-5 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-500 rounded-md"
              />
              {validationErrors
                .filter((err) => err.field === "driversLicenseNumber")
                .map((err, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 mt-1 text-sm text-red-600 bg-red-100 border border-red-300 rounded px-2 py-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                      />
                    </svg>
                    <span>{err.message}</span>
                  </div>
                ))}
            </div>
            <div>
              <label className="block text-base sm:text-lg font-medium text-zinc-800">
                Driver License Jurisdiction
              </label>
              <Select
                value={driversLicJur}
                onValueChange={setdriversLicJur}
              >
                <SelectTrigger className="w-full py-5 px-4 border border-zinc-800 text-zinc-800  placeholder:text-zinc-500 rounded-lg shadow-sm">
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
              {/* <select
                name="driversLicJur"
                value={driversLicJur}
                onChange={(e) => setdriversLicJur(e.target.value)}
                className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-500 rounded-md"
              >
                <SelectItem value="" disabled>
                  Select the Drivers License Jurisdiction
                </SelectItem>
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
                <SelectItem value="NL">Newfoundland and Labrador</SelectItem>
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
              </select> */}
              {validationErrors
                .filter((err) => err.field === "driversLicJur")
                .map((err, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 mt-1 text-sm text-red-600 bg-red-100 border border-red-300 rounded px-2 py-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                      />
                    </svg>
                    <span>{err.message}</span>
                  </div>
                ))}
            </div>

            <div>
              <label className="block text-base sm:text-lg font-medium text-zinc-800">
                Phone Number
              </label>
              <PhoneInput
                international
                defaultCountry="US"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value || "")}
                className="PhoneInputInput w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-500 rounded-md"
                
              />
              {validationErrors
                .filter((err) => err.field === "phoneNumber")
                .map((err, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 mt-1 text-sm text-red-600 bg-red-100 border border-red-300 rounded px-2 py-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                      />
                    </svg>
                    <span>{err.message}</span>
                  </div>
                ))}
            </div>

            <div>
              <label className="block text-base sm:text-lg font-medium text-zinc-800">
                Password
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <div className="relative flex-1">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter the Password for Driver"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-5 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-500 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={generatePassword}
                  className="w-full sm:w-auto bg-yellow-600 text-white hover:bg-yellow-500 py-3 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-semibold rounded-md transition duration-300"
                >
                  Generate Password
                </button>
              </div>
              {validationErrors
                .filter((err) => err.field === "password")
                .map((err, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 mt-1 text-sm text-red-600 bg-red-100 border border-red-300 rounded px-2 py-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                      />
                    </svg>
                    <span>{err.message}</span>
                  </div>
                ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-600 text-white rounded-md hover:bg-yellow-500 py-2 sm:py-3 text-base sm:text-lg font-semibold transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Adding..." : "Add Driver"}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
