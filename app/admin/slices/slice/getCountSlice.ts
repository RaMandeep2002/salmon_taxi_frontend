import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type DashboardStats = {
    driverCount: number
    vehicleCount: number
    bookingCount: number
    shiftsCount: number
}

type DashboardStatsState = {
    data: DashboardStats
    isloading: boolean
    iserror: string | null
}

const initialState: DashboardStatsState = {
    data: {
        driverCount: 0,
        vehicleCount: 0,
        bookingCount: 0,
        shiftsCount: 0
    },
    isloading: false,
    iserror: null,
}

// Async thunk
export const fetchDashboardStats = createAsyncThunk(
    'dashboardStats/fetchDashboardStats',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<DashboardStats>(`${API_URL}/customer/getCount`)
            return response.data
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
)

const dashboardStatsSlice = createSlice({
    name: 'dashboardStats',
    initialState,
    reducers: {
        setDashboardStats: (state, action: PayloadAction<DashboardStats>) => {
            state.data = action.payload
            state.iserror = null
        },
        resetDashboardStats: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardStats.pending, (state) => {
                state.isloading = true
                state.iserror = null
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.isloading = false
                state.data = action.payload
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.isloading = false
                state.iserror = action.payload as string
            })
    }
})

export const { setDashboardStats, resetDashboardStats } = dashboardStatsSlice.actions
export default dashboardStatsSlice.reducer
