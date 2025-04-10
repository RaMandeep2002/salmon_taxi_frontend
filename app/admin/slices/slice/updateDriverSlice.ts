import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_LOCAL_URL;
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Driver {
  drivername: string;
  email: string;
  driversLicenseNumber: string;
  phoneNumber: string;
  password: string;
}

interface DriverState {
  driver: Driver | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DriverState = {
  driver: null,
  isLoading: false,
  error: null,
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

      const response = await axios.post<Driver>(
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
      console.log(API_URL);
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
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateDriver.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDriver.fulfilled, (state, action: PayloadAction<Driver>) => {
        state.isLoading = false;
        state.driver = action.payload;
      })
      .addCase(updateDriver.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDriverState } = updatedriverSlice.actions;
export default updatedriverSlice.reducer;