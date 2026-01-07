"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "@/app/admin/DashBoardLayout";
import { AppDispatch, RootState } from "@/app/store/store";
import { registerVehicle } from "../../slices/slice/registerVehicleSlice";
import { useToast } from "@/hooks/use-toast";

export default function RegisterVehicle() {
  const toast = useToast();
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [company, setCompany] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [vehicle_plate_number, setVehiclePlateNumber] = useState<string>("");
  const [vehRegJur, setVehRegJur] = useState<string>("");
  // const [tripTypeCd, setTripTypeCd] = useState<string>("");
  // const [status, setStatus] = useState("active");

  const dispatch = useDispatch<AppDispatch>();
  const { isloading, validationErrors, iserror } = useSelector(
    (state: RootState) => state.registerVehicle
  );
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    console.log({
      company,
      vehicleModel,
      year: Number(year),
      vehicle_plate_number,
      vehRegJur,
      // tripTypeCd,
    });

    try {
      dispatch(
        registerVehicle({
          registrationNumber,
          company,
          vehicleModel,
          year: Number(year),
          vehicle_plate_number,
          vehRegJur,
          // tripTypeCd,
        })
      )
        .unwrap()
        .then(() => {
          setSuccess(true);
          setRegistrationNumber("");
          setCompany("");
          setVehicleModel("");
          setYear("");
          setVehiclePlateNumber("");
          setVehRegJur("");
          // setTripTypeCd("");
          toast.toast({
            title: "Vehicle added successfully!",
            variant: "default",
          });
          // setStatus("active");
        })
        .catch(() => {
          setSuccess(false);
          toast.toast({
            title: `${iserror}`,
            variant: "destructive",
          });
        });
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
          {/* {iserror && (
            <p className="text-red-500 text-center text-sm sm:text-base">
              {iserror}
            </p>
          )} */}
          {success && (
            <p className="text-green-600 text-center text-sm sm:text-base font-semibold">
              Vehicle added successfully!
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {iserror && (
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
                    {iserror}
                  </span>
                </div>
              </div>
            )}
            <div>
              <label className="block text-base sm:text-lg font-medium text-zinc-800">
                Enter Registration Number
              </label>
              <input
                type="text"
                placeholder="e.g. 1HGBH41JXMN109186"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-800 rounded-md"
              />
              {validationErrors
                .filter((err) => err.field === "registrationNumber")
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
                Company
              </label>
              <input
                type="text"
                placeholder="e.g. Toyota"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-800 rounded-md"
              />
              {validationErrors
                .filter((err) => err.field === "company")
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
                Vehicle Model
              </label>
              <input
                type="text"
                placeholder="e.g. Corolla"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-800 rounded-md"
              />
              {validationErrors
                .filter((err) => err.field === "vehicleModel")
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
                Year
              </label>
              <input
                type="number"
                placeholder="e.g. 2021"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-800 rounded-md"
              />
              {validationErrors
                .filter((err) => err.field === "year")
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
                Vehcile Plate Number
              </label>
              <input
                type="text"
                placeholder="e.g. ABC1234"
                value={vehicle_plate_number}
                onChange={(e) => setVehiclePlateNumber(e.target.value)}
                className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-800 rounded-md"
              />
              {validationErrors
                .filter((err) => err.field === "vehicle_plate_number")
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
                Vehicle Registration Jurisdiction
              </label>
              <select
                name="driversLicJur"
                value={vehRegJur}
                onChange={(e) => setVehRegJur(e.target.value)}
                className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-800 rounded-md"
              >
                <option value="" disabled>
                  Select the Vehicle Jurisdiction (e.g. ON, CA)
                </option>
                <option value="AB">Alberta</option>
                <option value="AK">Alaska</option>
                <option value="AL">Alabama</option>
                <option value="AR">Arkansas</option>
                <option value="AZ">Arizona</option>
                <option value="BC">British Columbia</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DC">District of Columbia</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="IA">Iowa</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="MA">Massachusetts</option>
                <option value="MB">Manitoba</option>
                <option value="MD">Maryland</option>
                <option value="ME">Maine</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MO">Missouri</option>
                <option value="MS">Mississippi</option>
                <option value="MT">Montana</option>
                <option value="NB">New Brunswick</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="NE">Nebraska</option>
                <option value="NH">New Hampshire</option>
                <option value="NL">Newfoundland and Labrador</option>
                <option value="NM">New Mexico</option>
                <option value="NS">Nova Scotia</option>
                <option value="NU">Nunavut</option>
                <option value="NV">Nevada</option>
                <option value="NY">New York</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="ON">Ontario</option>
                <option value="OR">Oregon</option>
                <option value="OTH">Other</option>
                <option value="PA">Pennsylvania</option>
                <option value="PE">Prince Edward Island</option>
                <option value="QC">Quebec</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="SK">Saskatchewan</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VA">Virginia</option>
                <option value="VT">Vermont</option>
                <option value="WA">Washington</option>
                <option value="WI">Wisconsin</option>
                <option value="WV">West Virginia</option>
                <option value="WY">Wyoming</option>
                <option value="XX">Unknown</option>
                <option value="YT">Yukon Territory</option>
              </select>
              {validationErrors
                .filter((err) => err.field === "vehRegJur")
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
            {/* <div>
              <label className="block text-base sm:text-lg font-medium text-zinc-800">
                Vehicle Type
              </label>
              <select
                name="driversLicJur"
                value={tripTypeCd}
                onChange={(e) => setTripTypeCd(e.target.value)}
                className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-800 rounded-md"
              >
                <option value="" disabled>
                  Select the Vehicle Type (e.g. ACCES, CNVTL)
                </option>
                <option value="ACCES">Alberta</option>
                <option value="CNVTL">Conventional</option>
                
              </select>
              {validationErrors
                .filter((err) => err.field === "tripTypeCd")
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
            </div> */}

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
