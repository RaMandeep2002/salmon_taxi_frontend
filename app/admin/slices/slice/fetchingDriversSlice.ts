import { Drivers, DriversResponse } from "@/app/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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

export const fetchdriverdetails = createAsyncThunk(
  "admin/fetchdriverdetails",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await axios.get<DriversResponse>(
        "http://localhost:5000/admin/driver-details",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log(response?.data);
      return response.data; // Return admin data
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        "Failed to fetch admin info",
      );
    }
  },
);

const driverDetailSlice = createSlice({
  name: "driverFetching",
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchdriverdetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchdriverdetails.fulfilled,
        (state, action: PayloadAction<DriversResponse>) => {
          state.isLoading = false;
          state.data = action.payload.data;
        },
      )
      .addCase(fetchdriverdetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearData } = driverDetailSlice.actions;
export default driverDetailSlice.reducer;
