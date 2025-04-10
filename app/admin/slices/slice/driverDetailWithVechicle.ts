import { Drivers, DriversResponse } from "@/app/types/DriverVechicleData";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


// const API_URL = process.env.NEXT_PUBLIC_API_LOCAL_URL;
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface DriverState {
  data: Drivers[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DriverState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchDriverDetailWithVehicle = createAsyncThunk<Drivers[]>(
  "admin/fetchDriverDetailWithVehicle",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await axios.get<DriversResponse>(
        `${API_URL}/admin/getDriverWithVehicleexculudeDriver`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("Drivers with Vehicles:", response.data.formattedDrivers);

      return response.data.formattedDrivers;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
         "Failed to fetch driver details"
      );
    }
  }
);

const driverDetailWithVehicleSlice = createSlice({
  name: "driverDetailWithVehicle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDriverDetailWithVehicle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchDriverDetailWithVehicle.fulfilled,
        (state, action: PayloadAction<Drivers[]>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchDriverDetailWithVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default driverDetailWithVehicleSlice.reducer;
