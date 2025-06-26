"use client";

import React, { useState } from "react";
import DashboardLayout from "../../DashBoardLayout";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { scheduleRide } from "../../slices/slice/scheduleRideSlice";
import { useToast } from "@/hooks/use-toast";

export default function ScheduleRide() {
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const [customerName, setCustomerName] = useState("");
  const [customer_phone_number, setcustomer_phone_number] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropOffAddress, setDropOffAddress] = useState("");
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<Date | null>(null);

  const { loading, error, success } = useSelector(
    (state: RootState) => state.scheduleRIde
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (customer_phone_number === undefined) {
      alert("Please enter a valid phone number.");
      return;
    }

    const formattedDate = pickupDate ? format(pickupDate, "MM/dd/yyyy") : "";
    const formattedTime = pickupTime ? format(pickupTime, "hh:mma") : "";

    const resultAction = await dispatch(
      scheduleRide({
        customerName,
        customer_phone_number,
        time: formattedTime,
        date: formattedDate,
        pickupAddress,
        dropOffAddress
      })
    );
    if (scheduleRide.fulfilled.match(resultAction)) {
      toast.toast({
        title: "Ride Scheduled",
        description: "The ride has been scheduled successfully.",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 text-[#F5EF1B] tracking-wider">
          Schedule a Ride
        </h2>

        <div className="max-w-2xl mx-auto bg-[#F5EF1B] p-6 sm:p-8 shadow-xl rounded-md">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {success && (
              <p className="text-black">Ride scheduled successfully!</p>
            )}
            {error && <p className="text-red-600">{error}</p>}
            {/* Customer Name */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-zinc-700 mb-1 tracking-wide">
                Customer Name
              </label>
              <input
                type="text"
                name="name"
                autoComplete="off"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter full name"
                className="w-full px-4 py-3 border border-zinc-800 text-zinc-800 rounded-lg bg-transparent  placeholder:text-zinc-600 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-zinc-700 mb-1 tracking-wide">
                Phone Number
              </label>
              <PhoneInput
                international
                defaultCountry="US"
                placeholder="Enter phone number"
                value={customer_phone_number}
                onChange={(value) => setcustomer_phone_number(value || "")}
                className="PhoneInputInput w-full px-4 py-3 border border-zinc-800 text-zinc-800 rounded-lg bg-transparent  placeholder:text-zinc-500 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm sm:text-base font-semibold text-zinc-700 mb-1 tracking-wide">
                  Pick Up Address
                </label>
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="Enter Pick Up Address"
                  className="w-full px-4 py-3 border border-zinc-800 text-zinc-800 rounded-lg bg-transparent  placeholder:text-zinc-600 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm sm:text-base font-semibold text-zinc-700 mb-1 tracking-wide">
                  Drop Off Address
                </label>
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  value={dropOffAddress}
                  onChange={(e) => setDropOffAddress(e.target.value)}
                  placeholder="Enter Drop Off Address"
                  className="w-full px-4 py-3 border border-zinc-800 text-zinc-800 rounded-lg bg-transparent  placeholder:text-zinc-600 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
              </div>
            </div>

            {/* Date and Time Pickers */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Pickup Date */}
                <div className="flex-1">
                  <label className="block text-sm sm:text-base font-semibold text-zinc-700 mb-1 tracking-wide">
                    Pickup Date
                  </label>
                  <DatePicker
                    value={pickupDate}
                    onChange={setPickupDate}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        placeholder: "MM/DD/YYYY",
                        InputProps: {
                          className:
                            "w-full px-4 py-3 border border-zinc-600 rounded-lg text-zinc-800 bg-transparent  placeholder:text-zinc-500 text-base",
                        },
                      },
                    }}
                  />
                </div>

                {/* Pickup Time */}
                <div className="flex-1">
                  <label className="block text-sm sm:text-base font-semibold text-zinc-700 mb-1 tracking-wide">
                    Pickup Time
                  </label>
                  <TimePicker
                    value={pickupTime}
                    onChange={setPickupTime}
                    ampm
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        InputProps: {
                          className:
                            "w-full px-4 py-3 border border-zinc-600 rounded-lg text-zinc-800 bg-transparent placeholder:text-zinc-500 text-base",
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </LocalizationProvider>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 py-3 text-lg tracking-wide transition duration-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            >
              {loading ? "Scheduling..." : "Schedule Ride"}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
