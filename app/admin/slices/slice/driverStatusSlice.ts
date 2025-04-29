// src/redux/slices/driverStatusSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface DriverStatusState {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: DriverStatusState = {
  loading: false,
  error: null,
  successMessage: null,
};

// 👉 Async Thunks

export const disableDriver = createAsyncThunk(
  "driverStatus/disableDriver",
  async (driverId: string, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/admin/disable-Driver/${driverId}`);
      return response.data;
    } catch (error: unknown) {
      // @ts-expect-error this is giving no import error
      if (axios.isAxiosError(error)) {
        // @ts-expect-error this is giving no import error
        return rejectWithValue(error.response?.data?.message);
      }
    
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const activateDriver = createAsyncThunk(
  "driverStatus/activateDriver",
  async (driverId: string, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/admin/activate-Driver/${driverId}`);
      return response.data;
    } catch (error: unknown) {
       // @ts-expect-error this is giving no import error
       if (axios.isAxiosError(error)) {
        // @ts-expect-error this is giving no import error
        return rejectWithValue(error.response?.data?.message);
      }
    
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// 👉 Slice

const driverStatusSlice = createSlice({
  name: "driverStatus",
  initialState,
  reducers: {
    clearDriverStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Disable Driver
      .addCase(disableDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(disableDriver.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload as string;
      })
      .addCase(disableDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Activate Driver
      .addCase(activateDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(activateDriver.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload as string;
      })
      .addCase(activateDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDriverStatus } = driverStatusSlice.actions;
export default driverStatusSlice.reducer;
