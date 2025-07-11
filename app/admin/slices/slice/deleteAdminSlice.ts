import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


interface DeleteAdminresponse {
    message: string;
}

interface DeleteAdminState {
    isDeleteting: boolean;
    isError: string | null;
    succeesMessage: string | null;
}

const initialState: DeleteAdminState = {
    isDeleteting: false,
    isError: null,
    succeesMessage: null,
}

export const deleteAdmin = createAsyncThunk<DeleteAdminresponse, string>(
    "admins/deleteAdmin",
    async (userId, { rejectWithValue }) => {
        try {
            const res = await axios.delete<DeleteAdminresponse>(`${API_URL}/api/auth/delete_user/${userId}`);
            return res.data;
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

const deleteAdminsSlice = createSlice({
    name: "deleteAdmin",
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
            .addCase(deleteAdmin.pending, (state) => {
                state.isDeleteting = true;
                state.isError = null;
                state.succeesMessage = null;
            })
            .addCase(deleteAdmin.fulfilled, (state, action: PayloadAction<DeleteAdminresponse>) => {
                state.isDeleteting = false;
                state.succeesMessage = action.payload.message;
            })
            .addCase(deleteAdmin.rejected, (state, action) => {
                state.isDeleteting = false;
                state.isError = action.payload as string;
            });
    },
});

export const { clearDeleteState } = deleteAdminsSlice.actions;
export default deleteAdminsSlice.reducer;
