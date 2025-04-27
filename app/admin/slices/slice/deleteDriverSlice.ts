import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.API_BASE_URL;
interface DeleteDriverResponse {
    message: string;
}

interface DeleteDriverState {
    isDeleteting: boolean;
    isError: string | null;
    succeesMessage: string | null;
}

const initialState: DeleteDriverState = {
    isDeleteting: false,
    isError: null,
    succeesMessage: null,
}

export const deleteDriver = createAsyncThunk<DeleteDriverResponse, string>(
    "drivers/deleteDriver",
    async (driverId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No authentication token found.");
            }
            const res = await axios.delete<DeleteDriverResponse>(`${API_URL}/admin/delete-driver/${driverId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data;
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

const deleteDriverSlice = createSlice({
    name: "deleteDriver",
    initialState,
    reducers: {
        clearDeleteState: (state) => {
            state.isDeleteting = false;
            state.isError = null;
            state.succeesMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteDriver.pending, (state) => {
                state.isDeleteting = true;
                state.isError = null;
                state.succeesMessage = null;
            })
            .addCase(deleteDriver.fulfilled, (state, action: PayloadAction<DeleteDriverResponse>) => {
                state.isDeleteting = false;
                state.succeesMessage = action.payload.message;
            })
            .addCase(deleteDriver.rejected, (state, action) => {
                state.isDeleteting = false;
                state.isError = action.payload as string;
            });
    },
});

export const { clearDeleteState } = deleteDriverSlice.actions;
export default deleteDriverSlice.reducer;
