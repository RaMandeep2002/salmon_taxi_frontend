import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Vehicle, VehicleState } from "@/app/types/VehicleData";

// const API_URL = process.env.NEXT_PUBLIC_API_LOCAL_URL;
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const initialState: VehicleState = {
    vehicles: [],
    isloading: false,
    iserror: null,
};

export const registerVehicle = createAsyncThunk<
  Vehicle, // Return type
  { vehicle: Vehicle }, // Argument type
  { rejectValue: string } // Error type
>(
  "admin/registerVehicle",
  async ({ vehicle }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await axios.post<Vehicle>(
        `${API_URL}/admin/register-vehicle`,
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