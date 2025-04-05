import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Vehicle, VehicleState } from "@/app/types/VehicleData";

const initialState: VehicleState = {
    vehicles: [],
    isloading: false,
    iserror: null,
};

export const registerVehicle = createAsyncThunk<
  Vehicle, // Return type
  { driverId: string; vehicle: Vehicle }, // Argument type
  { rejectValue: string } // Error type
>(
  "admin/registerVehicle",
  async ({ driverId, vehicle }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await axios.post<Vehicle>(
        `http://localhost:5000/admin/register-vehicle/${driverId}`,
        vehicle,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("Error ===> ", error);
      return rejectWithValue("Failed to register vehicle");
    }
  }
);

const registerVehicleSlice = createSlice({
    name: "registerVehicle",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerVehicle.pending, (state) => {
            state.isloading = true;
            state.iserror = null;
        });
        builder.addCase(registerVehicle.fulfilled, (state, action) => {
            state.isloading = false;
            if (action.payload) {
                state.vehicles.push(action.payload as Vehicle);
            }
            
        });
        builder.addCase(registerVehicle.rejected, (state, action) => {
            state.isloading = false;
            state.iserror = action.error.message || null;
        });
    },
});

export default registerVehicleSlice.reducer;