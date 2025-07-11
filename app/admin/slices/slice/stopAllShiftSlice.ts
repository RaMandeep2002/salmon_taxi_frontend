import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface StopAllShiftPayload {
    endTime: string;
    endDate: string;
}

interface StopAllShiftResponse {
    message: string;
    stoppedShifts:number;
}

interface ShiftActionState {
    isloading: boolean;
    issuccess: boolean;
    iterror: string | null;
    ismessage: string | null;
    stoppedShifts: number | null;
}

const initialState: ShiftActionState = {
    isloading: false,
    issuccess: false,
    iterror: null,
    ismessage: null,
    stoppedShifts: null,
};

export const stopAllShiftByAdmin = createAsyncThunk<
StopAllShiftResponse,
    StopAllShiftPayload,
    { rejectValue: string }
>(
    "shiftActions/stopAllShiftByAdmin",
    async ({ endTime, endDate }, { rejectWithValue }) => {
        try {
            const response = await axios.post<StopAllShiftResponse>(
                `${API_URL}/admin/stopAllShifts/`,
                {
                    endTime,
                    endDate,
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

const stopAllShiftActionsSlice = createSlice({
    name: "stopallshiftActions",
    initialState,
    reducers: {
        resetShiftActionState: (state) => {
            state.isloading = false;
            state.issuccess = false;
            state.iterror = null;
            state.ismessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(stopAllShiftByAdmin.pending, (state) => {
                state.isloading = true;
                state.issuccess = false;
                state.iterror = null;
            })
            .addCase(
                stopAllShiftByAdmin.fulfilled,
                (state, action: PayloadAction<StopAllShiftResponse>) => {
                    state.isloading = false;
                    state.issuccess = true;
                    state.ismessage = action.payload.message;
                    state.stoppedShifts = action.payload.stoppedShifts;
                }
            )
            .addCase(stopAllShiftByAdmin.rejected, (state, action) => {
                state.isloading = false;
                state.iterror = action.payload || "Something went wrong";
            });
    },
});

export const { resetShiftActionState } = stopAllShiftActionsSlice.actions;
export default stopAllShiftActionsSlice.reducer;
