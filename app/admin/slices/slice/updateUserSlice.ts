import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_LOCAL_URL;
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface User {
  naem: string;
  email: string;
  password:string;
}

interface UserState {
  user: User | null;
  isProcessing: boolean;
  iserror: string | null;
}

const initialState: UserState = {
  user: null,
  isProcessing: false,
  iserror: null,
};

export const updateAdmin = createAsyncThunk(
  "admin/update-user",
  async (  {
    userId,
    userData,
  }: {
    userId: string;
    userData: {
      name: string;
      email: string;
      password:string;
    };
  },
    { rejectWithValue }
  ) => {    
    try {
      const response = await axios.put<User>(
        `${API_URL}/api/auth/update_user/${userId}`,
        userData
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const updateAdminSlice = createSlice({
  name: "adminUpdate",
  initialState,
  reducers: {
    clearAdminState: (state) => {
      state.user = null;
      state.iserror = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAdmin.pending, (state) => {
        state.isProcessing = true;
        state.iserror = null;
      })
      .addCase(updateAdmin.fulfilled, (state, action: PayloadAction<User>) => {
        state.isProcessing = false;
        state.user = action.payload;
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.isProcessing = false;
        state.iserror = action.payload as string;
      });
  },
});

export const { clearAdminState } = updateAdminSlice.actions;
export default updateAdminSlice.reducer;