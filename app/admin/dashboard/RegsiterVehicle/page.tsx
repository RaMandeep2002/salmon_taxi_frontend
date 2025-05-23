"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "@/app/admin/DashBoardLayout";
import { AppDispatch, RootState } from "@/app/store/store";
import { registerVehicle } from "../../slices/slice/registerVehicleSlice";


export default function RegisterVehicle() {
  const [company, setCompany] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [vehicle_plate_number, setVehiclePlateNumber] = useState<string>("")
  // const [status, setStatus] = useState("active");

  const dispatch = useDispatch<AppDispatch>();
  const { isloading, iserror } = useSelector(
    (state: RootState) => state.registerVehicle
  );
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    dispatch(registerVehicle({ company, vehicleModel, year: Number(year),vehicle_plate_number }))
      .unwrap()
      .then(() => {
        setSuccess(true);
        setCompany("");
        setVehicleModel("");
        setYear("");
        setVehiclePlateNumber("");
        // setStatus("active");
      })
      .catch(() => {
        setSuccess(false);
      });
  };

  return (
    <DashboardLayout>
     <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
     <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-[#F5EF1B]">
          Add New Vehicle
        </h2>
        <div
          className="max-w-2xl w-full mx-auto bg-[#F5EF1B] p-4 sm:p-6 md:p-8 mt-6 sm:mt-12 rounded-md
        "
        >
          {iserror &&  <p className="text-red-500 text-center text-sm sm:text-base">{iserror}</p>}
          {success && (
             <p className="text-green-600 text-center text-sm sm:text-base font-semibold">
              Vehicle added successfully!
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
               <label className="block text-base sm:text-lg font-medium text-zinc-800">
                Company
              </label>
              <input
                type="text"
                placeholder="Enter the company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                  className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-800 rounded-md"
              />
            </div>

            <div>
               <label className="block text-base sm:text-lg font-medium text-zinc-800">
                Vehicle Model
              </label>
              <input
                type="text"
                placeholder="Enter the vehicle model"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                required
                  className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-800 rounded-md"
              />
            </div>

            <div>
               <label className="block text-base sm:text-lg font-medium text-zinc-800">
                Year
              </label>
              <input
                type="number"
                placeholder="Enter the year"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                required
                  className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-800 rounded-md"
              />
            </div>
            <div>
               <label className="block text-base sm:text-lg font-medium text-zinc-800">
                Vehcile Plate Number
              </label>
              <input
                type="text"
                placeholder="Enter the Plate Number"
                value={vehicle_plate_number}
                onChange={(e) => setVehiclePlateNumber(e.target.value)}
                required
                  className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-800 rounded-md"
              />
            </div>

            {/* <div>
               <label className="block text-base sm:text-lg font-medium text-zinc-800">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 border border-zinc-800 rounded-lg text-zinc-800 bg-transparent"
              >
                <option value="active">Active</option>
                <option value="free">Free</option>
              </select>
            </div> */}

            <button
              type="submit"
                 className="w-full bg-yellow-600 text-white rounded-md hover:bg-yellow-500 py-2 sm:py-3 text-base sm:text-lg font-semibold transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isloading ? "Adding..." : "Add Vehicle"}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
