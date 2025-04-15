"use client";
import DashboardLayout from "@/app/admin/DashBoardLayout";
import { addDriver } from "@/app/admin/slices/slice/addDriverSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddDriver() {
  const [drivername, setDrivername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [driversLicenseNumber, setDriversLicenseNumber] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false); // State to toggle password visibility
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, error, successMessage } = useSelector(
    (state: RootState) => state.addDriver
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber === undefined) {
      alert("Please enter a valid phone number.");
      return;
    }
    const resultAction = dispatch(
      addDriver({
        drivername,
        email,
        driversLicenseNumber,
        phoneNumber: String(phoneNumber),
        password,
      })
    );
    if (addDriver.fulfilled.match(resultAction)) {
      // setShowSuccessDialog(true);

      // Optional: reset fields here if needed
      setDrivername("");
      setEmail("");
      setDriversLicenseNumber("");
      setPhoneNumber("");
      setPassword("");
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    console.log("value ==> ", value);
    // Remove all non-digit characters

    // Allow +, numbers, spaces, parentheses, and dashes
    const cleanedValue = value.replace(/[^\d+\s()-]/g, "");

    if (value.includes("+")) {
      value = "+" + value.replace(/\+/g, "").trim();
    } else {
      value = "+" + value.trim();
    }
    console.log("cleanedValue ==> ", cleanedValue);
    setPhoneNumber(cleanedValue);
  };

  // Function to generate a random password
  const generatePassword = () => {
    const length = 8; // Length of the generated password
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Only letters and numbers
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <DashboardLayout>
      <div className="max-w-full mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#F5EF1B]">
          Add New Driver
        </h2>
        <div className="max-w-2xl mx-auto bg-[#F5EF1B] p-8 mt-12 border border-slate-500 rounded-2xl">
          {error && <p className="text-red-500 text-center">{error}</p>}

          {successMessage && (
            <p className="text-red-500 text-center">{successMessage}</p>
          )}
          {/* {driver. && (
            <p className="text-green-600 text-center font-semibold">
              Driver added successfully!
            </p>
          )} */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-[#F5EF1B]">
                Driver name
              </label>
              <input
                type="text"
                name="name"
                autoComplete="off"
                placeholder="Enter the name of Driver"
                value={drivername}
                onChange={(e) => setDrivername(e.target.value)}
                required
                className="w-full px-4 py-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg bg-transparent placeholder:text-zinc-800"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-[#F5EF1B]">
                Email
              </label>
              <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Enter the Email of Driver"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg bg-transparent placeholder:text-zinc-800"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-[#F5EF1B]">
                Drivers License Number
              </label>
              <input
                type="text"
                name="driversLicenseNumber"
                autoComplete="off"
                placeholder="Enter the Drivers License Number of Driver"
                value={driversLicenseNumber}
                onChange={(e) => setDriversLicenseNumber(e.target.value)}
                required
                className="w-full px-4 py-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg bg-transparent placeholder:text-zinc-800"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-[#F5EF1B]">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  +
                </span>

                <input
                  type="tel"
                  name="phoneNumber"
                  autoComplete="off"
                  placeholder="Enter the Phone Number of Driver"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  required
                  className="w-full px-8 py-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg bg-transparent placeholder:text-zinc-800"
                />
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium text-[#F5EF1B]">
                Password
              </label>
              <div className="flex items-center gap-2">
                {/* Flex container to align items horizontally */}
                <div className="relative flex-1">
                  {/* Relative container for input and Show/Hide button */}
                  <input
                    type={showPassword ? "text" : "password"} // Toggle between text and password
                    name="password"
                    placeholder="Enter the Password for Driver"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-zinc-800 rounded-lg text-zinc-800 text-lg bg-transparent placeholder:text-zinc-800"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-4 py-3 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={generatePassword}
                  className=" bg-yellow-600 text-white hover:bg-yellow-500 py-3 px-4 text-lg font-semibold rounded-lg  transition duration-300"
                >
                  Generate Password
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 py-3 text-lg font-semibold  transition duration-300"
            >
              {isLoading ? "Adding..." : "Add Driver"}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
