// driverReportSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.API_BASE_URL;

interface ReportState {
    isDownloading: boolean;
    iserror: string | null;
}

const initialState: ReportState = {
    isDownloading: false,
    iserror: null,
};

// Thunk to get report CSV
export const getBookingReport = createAsyncThunk<void, {
    fromDate?: string,
    toDate?: string,
    pickup?: string,
    drivername?: string,
}, { rejectValue: string }>(
    "report/getBookingReport",
    async (filters, { rejectWithValue }) => {
        try {


            const token = localStorage.getItem("token");

            if (!token) {
                return rejectWithValue("No token found.");
            }
            const query = new URLSearchParams(filters).toString();
            console.log("query -------> ", query)
            const response = await axios.get(`${API_URL}/admin/report-csv?${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: "blob", // Important to handle file download
            });
            // Create a blob link to download
            const blob = new Blob([response.data as BlobPart], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "bookings.csv");
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error: unknown) {
            // @ts-expect-error this is giving no import error
            if (axios.isAxiosError(error)) {
                // @ts-expect-error this is giving no import error
                return rejectWithValue(error.response?.data?.message || "CSV download failed.");
            }
            return rejectWithValue("An unexpected error occurred while downloading report.");
        }
    }
);

const BookingReportSlice = createSlice({
    name: "driverReport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBookingReport.pending, (state) => {
                state.isDownloading = true;
                state.iserror = null;
            })
            .addCase(getBookingReport.fulfilled, (state) => {
                state.isDownloading = false;
            })
            .addCase(getBookingReport.rejected, (state, action) => {
                state.isDownloading = false;
                state.iserror = action.payload || "Download failed";
            });
    },
});

export default BookingReportSlice.reducer;
