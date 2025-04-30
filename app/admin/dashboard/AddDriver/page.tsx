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
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
      setDrivername("");
      setEmail("");
      setDriversLicenseNumber("");
      setPhoneNumber("");
      setPassword("");
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const cleanedValue = value.replace(/[^\d+\s()-]/g, "");

    if (value.includes("+")) {
      value = "+" + value.replace(/\+/g, "").trim();
    } else {
      value = "+" + value.trim();
    }

    setPhoneNumber(cleanedValue);
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
          {error && (
            <p className="text-red-500 text-center text-sm sm:text-base">
              {error}
            </p>
          )}
          {successMessage && (
            <p className="text-green-600 text-center text-sm sm:text-base font-semibold">
              {successMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-base sm:text-lg font-medium text-zinc-800">
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
                className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-800 rounded-md"
              />
            </div>

            <div>
              <label className="block text-base sm:text-lg font-medium text-zinc-800">
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
                className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-800 rounded-md"
              />
            </div>
            <div>
              <label className="block text-base sm:text-lg font-medium text-zinc-800">
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
                className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-800 rounded-md"
              />
            </div>

            <div>
              <label className="block text-base sm:text-lg font-medium text-zinc-800">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                autoComplete="off"
                placeholder="Enter the Phone Number of Driver"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
                className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-800 rounded-md"
              />
            </div>

            <div>
              <label className="block text-base sm:text-lg font-medium text-zinc-800">
                Password
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <div className="relative flex-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter the Password for Driver"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-800 rounded-md"
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
