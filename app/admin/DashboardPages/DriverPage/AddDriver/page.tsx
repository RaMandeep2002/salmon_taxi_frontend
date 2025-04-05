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
  const [phoneNumber, setPhoneNumber] = useState<number | undefined>(undefined);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false); // State to toggle password visibility
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, error } = useSelector(
    (state: RootState) => state.addDriver,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber === undefined) {
      alert("Please enter a valid phone number.");
      return;
    }
    dispatch(
      addDriver({
        drivername,
        email,
        driversLicenseNumber,
        phoneNumber: String(phoneNumber),
        password,
      }),
    );
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove any non-digit characters except +
    const cleanedValue = value.replace(/[^\d+]/g, '');
    // Ensure + is only at the start if present
    const formattedValue = cleanedValue.startsWith('+') 
      ? cleanedValue
      : '+' + cleanedValue;
    // Convert to number after removing +
    const numberValue = formattedValue.replace('+', '') 
      ? parseInt(formattedValue.replace('+', ''), 10) 
      : undefined;
    if (!isNaN(numberValue as number)) {
      setPhoneNumber(numberValue);
    }
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
      <div className="max-w-2xl mx-auto bg-zinc-800 p-8 mt-12">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-white">
              Driver name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter the name of Driver"
              value={drivername}
              onChange={(e) => setDrivername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-zinc-800 text-lg bg-zinc-200"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter the Email of Driver"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-zinc-800 text-lg bg-zinc-200"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-white">
              Drivers License Number
            </label>
            <input
              type="text"
              name="driversLicenseNumber"
              placeholder="Enter the Drivers License Number of Driver"
              value={driversLicenseNumber}
              onChange={(e) => setDriversLicenseNumber(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-zinc-800 text-lg bg-zinc-200"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-white">
              Phone Number
            </label>
            <div className="relative">
              {/* <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">+</span> */}
             
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter the Phone Number of Driver"
                value={phoneNumber ?? ""}
                onChange={handlePhoneNumberChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-zinc-800 text-lg bg-zinc-200"
              />
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium text-white">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-zinc-800 text-lg bg-zinc-200"
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
                className=" bg-yellow-600 text-white  hover:bg-yellow-500 py-3 px-4 text-lg font-semibold rounded-lg  transition duration-300"
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
