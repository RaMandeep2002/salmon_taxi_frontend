// features/driver/resetPasswordSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ResetPasswordState {
    loading: boolean;
    success: boolean;
    isError: string | null;
}

const initialState: ResetPasswordState = {
    loading: false,
    success: false,
    isError: null,
};

export const resetDriverPassword = createAsyncThunk<
    void, // return type
    { email: string; newPassword: string }, // payload type
    { rejectValue: string } // reject value
>("driver/resetPassword", async ({ email, newPassword }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            return rejectWithValue("No authentication token found.");
        }
        await axios.post(`${API_URL}/admin/resetPassword`, { email, newPassword, }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
    } catch (error: unknown) {
        // @ts-expect-error this is giving no import error
        if (axios.isAxiosError(error)) {
            // @ts-expect-error this is giving no import error
            return rejectWithValue(error.response?.data?.message || "API Error");
        }

        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }

        return rejectWithValue("An unknown error occurred");
    }
});

const resetPasswordSlice = createSlice({
    name: "resetPassword",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.loading = false;
            state.success = false;
            state.isError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetDriverPassword.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.isError = null;
            })
            .addCase(resetDriverPassword.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(resetDriverPassword.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.isError = action.payload || "Something went wrong";
            });
    },
});

export const { resetStatus } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
