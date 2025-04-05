import { BookingHistory, BookingState } from "@/app/types/BookingHistoryData";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState: BookingState = {
    bookings: [],
    loading: false,
    error: null
}

export const fetchBookingHistory = createAsyncThunk<BookingHistory[], void, { rejectValue: string }>(
    "booking/fetchHistory",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<{ bookings: BookingHistory[] }>("http://localhost:5000/customer/bookingHistory");
            console.log("Data: - ",response.data.bookings)
            return response.data.bookings;
        } catch (error) {
            console.error(error);
            return rejectWithValue("Failed to fetch bookings");
        }
    }
);


const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookingHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookingHistory.fulfilled, (state, action: PayloadAction<BookingHistory[]>) => {
                state.bookings = action.payload;
                state.loading = false;
            })
            .addCase(fetchBookingHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default bookingSlice.reducer;
