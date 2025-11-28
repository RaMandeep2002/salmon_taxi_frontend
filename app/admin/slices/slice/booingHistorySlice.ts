import { BookingHistory, BookingState } from "@/app/types/BookingHistoryData";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const initialState: BookingState = {
    bookings: [],
    loading: false,
    page: 1,
    limit: 15,
    hasMore: true,
    total: 0,
    totalPages: 0,
    error: null
}

export const fetchBookingHistory = createAsyncThunk<{ bookings: BookingHistory[]; total: number; totalPages: number; hasMore: boolean; page: number; limit: number }, { page: number; limit: number }, { rejectValue: string }>(
    "booking/fetchHistory",
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                return rejectWithValue("No authentication token found.");
            }


            const response = await axios.get(
                `${API_URL}/admin/bookingsone?page=${page}&limit=${limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // Type assertion to fix 'response.data' is of type 'unknown'
            const data = response.data as {
                bookings: BookingHistory[];
                total: number;
                totalPages: number;
                hasMore: boolean;
                page: number;
                limit: number;
            };
            console.log("data =======> ", data)
            return {
                bookings: data.bookings,
                total: data.total,
                totalPages: data.totalPages,
                hasMore: data.hasMore,
                page: data.page,
                limit: data.limit,
            };
        } catch (error: unknown) {
            // @ts-expect-error this is giving no import error
            if (axios.isAxiosError(error)) {
                // @ts-expect-error this is giving no import error
                return rejectWithValue(error.response?.data?.message || "Failed To Get Bookings");
            }

            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }

            return rejectWithValue("An unknown error occurred");
        }
    }
);


const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookingHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookingHistory.fulfilled, (state, action) => {
                state.bookings = action.payload.bookings;
                state.total = action.payload.total;
                state.totalPages = action.payload.totalPages;
                state.page = action.payload.page;
                state.limit = action.payload.limit;
                state.hasMore = action.payload.hasMore;
                state.loading = false;
            })
            .addCase(fetchBookingHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export const { setPage, setLimit } = bookingSlice.actions;

export default bookingSlice.reducer;
