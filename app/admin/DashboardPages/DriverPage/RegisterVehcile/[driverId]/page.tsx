"use client";

import DashboardLayout from "@/app/admin/DashBoardLayout";
import { registerVehicle } from "@/app/admin/slices/slice/registerVehicleSlice";
import { AppDispatch } from "@/app/store/store";
import { Vehicle } from "@/app/types/VehicleData";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function RegisterVehcile() {
  const [make, setMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [year, setYear] = useState<string>("");
  const [status, setStatus] = useState<Vehicle["status"]>("active");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { driverId } = useParams(); //

  const dispatch = useDispatch<AppDispatch>();

  // const { vehicles, isloading, iserror } = useSelector(
  //   (state: RootState) => state.registerVehicle
  // );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("year ==> ", year);
      await dispatch(
        registerVehicle({
          driverId: driverId as string,
          vehicle: { make, vehicleModel, year: Number(year), status },
        })
      ).unwrap();

      alert("Vehicle registered successfully");
      setMake("");
      setVehicleModel("");
      setYear("");
      setStatus("active");
    }catch (err) {
      console.error(err);
      setError("Error happens!!")
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <DashboardLayout>
      <div className="max-w-full mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#F5EF1B]">
          Register New Vehicle
        </h2>
        <div className="max-w-2xl mx-auto p-8 mt-12">
          {error && <p className="text-red-500 text-center">{String(error)}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-[#F5EF1B]">
                Driver ID
              </label>
              <input
                type="text"
                name="driverId"
                // placeholder="Enter Registration Number"
                value={driverId}
                // readOnly
                // onChange={(e) => setRegistrationNumber(e.target.value)}
                className="w-full px-4 py-3 border border-[#F5EF1B] rounded-lg  text-[#F5EF1B] text-lg bg-transparent"
              />
            </div>
            {/* <div>
              <label className="block text-lg font-medium text-gray-700">
                Registration Number
              </label>
              <input
                type="text"
                name="registrationNumber"
                placeholder="Enter Registration Number"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-lg"
              />
            </div> */}
            <div>
              <label className="block text-lg font-medium text-[#F5EF1B]">
                Make
              </label>
              <input
                type="text"
                name="make"
                placeholder="Enter Vehicle Make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                required
              className="w-full px-4 py-3 border border-[#F5EF1B] rounded-lg  text-[#F5EF1B] text-lg bg-transparent placeholder:text-[#F5EF1B]/50"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-[#F5EF1B]">
                Model
              </label>
              <input
                type="text"
                name="vehicleModel"
                placeholder="Enter Vehicle Model"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                required
               className="w-full px-4 py-3 border border-[#F5EF1B] rounded-lg  text-[#F5EF1B] text-lg bg-transparent placeholder:text-[#F5EF1B]/50"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-[#F5EF1B]">
                Year
              </label>
              <input
                type="number"
                name="year"
                placeholder="Enter Year of Manufacture"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                min="1900"
                max="2099"
                className="w-full px-4 py-3 border border-[#F5EF1B] rounded-lg  text-[#F5EF1B] text-lg bg-transparent placeholder:text-[#F5EF1B]/50"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-[#F5EF1B]">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Vehicle["status"])}
                required
               className="w-full px-4 py-3 border border-[#F5EF1B] rounded-lg  text-[#F5EF1B] text-lg bg-transparent placeholder:text-[#F5EF1B]/50"
              >
                <option value="active">Active</option>
                <option value="free">Free</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 py-3 text-lg font-semibold  transition duration-300"
            >
              {isLoading ? "Registering..." : "Register Vehicle"}
            </button>
          </form>
        </div>
        {/* Add your users-related content here */}
      </div>
    </DashboardLayout>
  );
}
