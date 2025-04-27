"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.API_BASE_URL;

interface Admin {
  name: string;
  email: string;
  role: string;
}

interface AdminState {
  data: Admin | null;
  isLoading: boolean;
  error: string | null;
}

interface ApiResponse {
  admin: Admin;
}

const initialState: AdminState = {
  data: null,
  isLoading: false,
  error: null,
};

export const fetchAdminInfo = createAsyncThunk(
  "admin/fetchAdminInfo",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await axios.get<ApiResponse>(
        `${API_URL}/admin/adminInfo`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data?.admin) {
        throw new Error("Invalid response structure");
      }

      return response.data.admin;
    } catch (error) {
      console.log(error)
      return rejectWithValue("An unexpected error occurred") || "Failed to fetch admin info";
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminInfo.fulfilled, (state, action: PayloadAction<Admin>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAdminInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminSlice.reducer;