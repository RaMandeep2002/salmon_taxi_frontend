"use client"; // Ensures this runs only on the client side

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface LoginResponse {
  token: string;
  // Add other response fields if they exist
}

interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

// Safe localStorage access with proper typing
const getTokenFromLocalStorage = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const initialState: AuthState = {
  token: getTokenFromLocalStorage(),
  isLoading: false,
  error: null,
};

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("api ---> ", API_URL);
      const response = await axios.post<LoginResponse>(
        `${API_URL}/api/auth/login`,
        { email, password }
      );

      const token = response.data.token;
      
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }

      return token;
    } catch (error) {
      console.error(error)
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;