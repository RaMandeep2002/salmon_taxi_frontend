import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.API_BASE_URL;
interface DeleteVehicleResponse {
    message: string;
}

interface DeleteVehicleState {
    isDeleteting: boolean;
    isError: string | null;
    succeesMessage: string | null;
}

const initialState: DeleteVehicleState = {
    isDeleteting: false,
    isError: null,
    succeesMessage: null,
}

export const deleteVehicle = createAsyncThunk<DeleteVehicleResponse, string>(
    "drivers/deleteVehcile",
    async (registrationNumber, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No authentication token found.");
            }
            const res = await axios.delete<DeleteVehicleResponse>(`${API_URL}/admin/remove-vehicle/${registrationNumber}`, {
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

const deleteVehicleSlice = createSlice({
    name: "deleteVehicle",
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
            .addCase(deleteVehicle.pending, (state) => {
                state.isDeleteting = true;
                state.isError = null;
                state.succeesMessage = null;
            })
            .addCase(deleteVehicle.fulfilled, (state, action: PayloadAction<DeleteVehicleResponse>) => {
                state.isDeleteting = true;
                state.succeesMessage = action.payload.message;
            })
            .addCase(deleteVehicle.rejected, (state, action) => {
                state.isDeleteting = false;
                state.isError = action.payload as string;
            });
    },
});

export const { clearDeleteState } = deleteVehicleSlice.actions;
export default deleteVehicleSlice.reducer;
