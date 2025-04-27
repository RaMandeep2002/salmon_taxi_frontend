import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Vehicle, VehicleState } from "@/app/types/VehicleData";

const API_URL = process.env.API_BASE_URL;

const initialState: VehicleState = {
  vehicles: [],
  isloading: false,
  iserror: null,
};

export const registerVehicle = createAsyncThunk<
  Vehicle,
  Vehicle,
  { rejectValue: string }
>("admin/registerVehicle", async (vehicleData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.post<Vehicle>(
      `${API_URL}/admin/register-vehicle-shared`,
      vehicleData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error ===> ", error);
    return rejectWithValue("Failed to register vehicle");
  }
});

const registerVehicleSlice = createSlice({
  name: "registerVehicle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerVehicle.pending, (state) => {
        state.isloading = true;
        state.iserror = null;
      })
      .addCase(registerVehicle.fulfilled, (state, action) => {
        state.isloading = false;
        state.vehicles.push(action.payload);
      })
      .addCase(registerVehicle.rejected, (state, action) => {
        state.isloading = false;
        state.iserror = action.payload || "An error occurred";
      });
  },
});

export default registerVehicleSlice.reducer;
