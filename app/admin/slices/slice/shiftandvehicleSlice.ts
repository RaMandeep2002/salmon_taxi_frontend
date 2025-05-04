import { ShiftsState, ShiftWithVehicleHistory } from '@/app/types/ShiftAndVechicle';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const initialState: ShiftsState = {
    shifts: [],
    loading: false,
    error: null,
};

// Thunk for fetching shift data
export const fetchShiftsWithVehicles = createAsyncThunk<
    ShiftWithVehicleHistory[],
    void,
    { rejectValue: string }
>(
    'shifts/fetchShiftsWithVehicles',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<{ shifts: ShiftWithVehicleHistory[] }>(
                `${API_URL}/admin/getallshiftwithdriverandvehicle`
            );
            // console.log(response.data.shifts);
            return response.data.shifts;
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

const shiftsWithVehicleSlice = createSlice({
    name: 'shiftsWithVehicle',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShiftsWithVehicles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchShiftsWithVehicles.fulfilled,
                (state, action: PayloadAction<ShiftWithVehicleHistory[]>) => {
                    state.shifts = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchShiftsWithVehicles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch shifts';
            });
    },
});

export default shiftsWithVehicleSlice.reducer;
