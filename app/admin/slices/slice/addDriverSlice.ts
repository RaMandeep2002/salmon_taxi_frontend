import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
  successMessage: string | null;
}

interface DriverResponse {
  message: string;
  driver: Driver;
}

const initialState: DriverState = {
  driver: null,
  isLoading: false,
  error: null,
  successMessage: null,
};

// ✅ Async thunk to add a driver
export const addDriver = createAsyncThunk<
  DriverResponse,                      // ✅ Return type on success
  Driver,                              // ✅ Argument type passed to the thunk
  { rejectValue: string }              // ✅ Custom reject type
>(
  "driver/addDriver",
  async (driverData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("No authentication token found.");
      }

      const response = await axios.post<DriverResponse>(
        `${API_URL}/admin/add-driver`,
        driverData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error:unknown) {
     
      if (error instanceof Error) {
        return rejectWithValue(error.message);
    }
    return rejectWithValue('An unknown error occurred');
    }
  }
);

const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    clearDriverState: (state) => {
      state.driver = null;
      state.error = null;
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDriver.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(
        addDriver.fulfilled,
        (state, action: PayloadAction<DriverResponse>) => {
          state.isLoading = false;
          state.driver = action.payload.driver;
          state.successMessage = action.payload.message;
        }
      )
      .addCase(addDriver.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Unknown error occurred.";
      });
  },
});

export const { clearDriverState } = driverSlice.actions;
export default driverSlice.reducer;
