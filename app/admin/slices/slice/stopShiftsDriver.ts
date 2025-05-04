import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface StopShiftPayload {
    driverId: string;
    endTime: string;
    endDate: string;
}

interface StopShiftResponse {
    message: string;
    shiftDuration?: string;
}

interface ShiftActionState {
    isloading: boolean;
    success: boolean;
    iserror: string | null;
    message: string | null;
    shiftDuration: string | null;
}

const initialState: ShiftActionState = {
    isloading: false,
    success: false,
    iserror: null,
    message: null,
    shiftDuration: null,
};

export const stopShiftByAdmin = createAsyncThunk<
    StopShiftResponse,
    StopShiftPayload,
    { rejectValue: string }
>(
    "shiftActions/stopShiftByAdmin",
    async ({ driverId, endTime, endDate }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return rejectWithValue("No authentication token found.");
            }
            const response = await axios.put<StopShiftResponse>(
                `${API_URL}/admin/stopshiftbyadmin/${driverId}`,
                {
                    endTime,
                    endDate,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
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
    }
);

const shiftActionsSlice = createSlice({
    name: "shiftActions",
    initialState,
    reducers: {
        resetShiftActionState: (state) => {
            state.isloading = false;
            state.success = false;
            state.iserror = null;
            state.message = null;
            state.shiftDuration = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(stopShiftByAdmin.pending, (state) => {
                state.isloading = true;
                state.success = false;
                state.iserror = null;
            })
            .addCase(
                stopShiftByAdmin.fulfilled,
                (state, action: PayloadAction<StopShiftResponse>) => {
                    state.isloading = false;
                    state.success = true;
                    state.message = action.payload.message;
                    state.shiftDuration = action.payload.shiftDuration || null;
                }
            )
            .addCase(stopShiftByAdmin.rejected, (state, action) => {
                state.isloading = false;
                state.iserror = action.payload || "Something went wrong";
            });
    },
});

export const { resetShiftActionState } = shiftActionsSlice.actions;
export default shiftActionsSlice.reducer;
