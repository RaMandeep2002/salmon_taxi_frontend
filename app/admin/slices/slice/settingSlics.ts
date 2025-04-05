import { RootState } from "@/app/store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Setting {
    _id: string;
    basePrice: number;
    pricePerKm: number;
}

interface SettingState {
    settings: Setting | null,
    isLoading: boolean;
    error: string | null
}

const initialState: SettingState = {
    settings: null,
    isLoading: false,
    error: null,
}

export const fetchSettings = createAsyncThunk("settings/fetchingsetting", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("No authentication token found.");
        }

        const response = await axios.get<{ settings: Setting[] }>(
            "http://localhost:5000/admin/settings",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        console.log(response.data.settings[0])
        return response.data.settings[0];
    } catch (error) {
        console.error(error);
        return rejectWithValue(
         "Failed to fetch settings info",
        );
    }
});

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.settings = action.payload;
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const selectSettings = (state: RootState) => state.settings;


export default settingsSlice.reducer;

