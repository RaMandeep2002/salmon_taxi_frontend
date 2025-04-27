import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_LOCAL_URL;
const API_URL = process.env.API_BASE_URL;

interface Driver {
  drivername: string;
  email: string;
  driversLicenseNumber: string;
  phoneNumber: string;
}

interface DriverState {
  driver: Driver | null;
  isProcessing: boolean;
  iserror: string | null;
}

const initialState: DriverState = {
  driver: null,
  isProcessing: false,
  iserror: null,
};

export const updateDriver = createAsyncThunk(
  "driver/update-driver",
  async (  {
    driverId,
    driverData,
  }: {
    driverId: string;
    driverData: {
      drivername: string;
      email: string;
      driversLicenseNumber: string;
      phoneNumber: string;
      password: string;
    };
  },
    { rejectWithValue }
  ) => {    
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await axios.put<Driver>(
        `${API_URL}/admin/update-driver/${driverId}`,
        driverData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const updatedriverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    clearDriverState: (state) => {
      state.driver = null;
      state.iserror = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateDriver.pending, (state) => {
        state.isProcessing = true;
        state.iserror = null;
      })
      .addCase(updateDriver.fulfilled, (state, action: PayloadAction<Driver>) => {
        state.isProcessing = false;
        state.driver = action.payload;
      })
      .addCase(updateDriver.rejected, (state, action) => {
        state.isProcessing = false;
        state.iserror = action.payload as string;
      });
  },
});

export const { clearDriverState } = updatedriverSlice.actions;
export default updatedriverSlice.reducer;