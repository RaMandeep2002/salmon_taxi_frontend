import { RootState } from "@/app/store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_LOCAL_URL;
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Setting {
    _id: string;
    base_price: number;
    km_price: number;
    waiting_time_price_per_minutes: number;
}

interface SettingState {
    settings: Setting | null;
    isLoading: boolean;
    isUpdating: boolean;
    error: string | null;
}

const initialState: SettingState = {
    settings: null,
    isLoading: false,
    isUpdating: false,
    error: null,
};

export const UpdateSettings = createAsyncThunk(
    "settings/Updatingsetting",
    async (settingsData: {
        base_price: number;
        km_price: number;
        waiting_time_price_per_minutes: number;
    }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No authentication token found.");
            }

            const response = await axios.put<{ settings: Setting }>(
                `${API_URL}/admin/settings`,
                settingsData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (!response.data) {
                throw new Error("No settings data received");
            }

            return response.data;
        } catch (error) {
            console.error("Error updating settings:", error);
            return rejectWithValue("Failed to update settings");
        }
    }
);

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(UpdateSettings.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(UpdateSettings.fulfilled, (state, action) => {
                state.settings = action.payload.settings;
                state.isLoading = false;
                state.isUpdating = true;
            })
            .addCase(UpdateSettings.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const selectSettings = (state: RootState) => state.settings;

export default settingsSlice.reducer;

