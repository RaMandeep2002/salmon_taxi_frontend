"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RequestData {
  bookingId: string;
  isPTDW: boolean;
}

interface ReportState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ReportState = {
  isLoading: false,
  error: null,
  success: false,
//   updatedBooking: null,
};

export const updateIsIncludeInReport = createAsyncThunk(
  "admin/updateIsIncludeInReport",
  async ({ bookingId, isPTDW }: RequestData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await axios.put(
        `${API_URL}/admin/isIncludeinSubmission/${bookingId}`,
        { isPTDW },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: unknown) {
            // @ts-expect-error this is giving no import error
            if (axios.isAxiosError(error)) {
                // @ts-expect-error this is giving no import error
                return rejectWithValue(error.response?.data?.message || "Failed To Get Bookings");
            }

            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }

            return rejectWithValue("An unknown error occurred");
        }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    //   state.updatedBooking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateIsIncludeInReport.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateIsIncludeInReport.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        // state.updatedBooking = action.payload.booking;
      })
      .addCase(updateIsIncludeInReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetState } = reportSlice.actions;
export default reportSlice.reducer;
