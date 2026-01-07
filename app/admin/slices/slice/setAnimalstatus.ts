import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// The response structure from your controller is { message: string, booking: Booking }
interface AnimalStatusResponse {
  message: string;
  booking: {
    bookingId: string;
    isSvcAnimalYN: boolean;
    // ...other booking fields as needed
  };
}

interface UpdateStatusState {
  data: AnimalStatusResponse | null;
  isProcessing: boolean;
  iserror: string | null;
  success: boolean;
}

const initialState: UpdateStatusState = {
  data: null,
  isProcessing: false,
  iserror: null,
  success: false,
};

export const updateStatusanimal = createAsyncThunk(
  "admin/update-animal-status",
  async (
    {
      bookingId,
      updateStatusData,
    }: {
      bookingId: string;
      updateStatusData: {
        isSvcAnimalYN: boolean;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found.");
      }

      // Per your controller, endpoint is PATCH /admin/booking-animal-status/:bookingId
      // and payload: { isSvcAnimalYN: boolean }
      const response = await axios.put<AnimalStatusResponse>(
        `${API_URL}/admin/setTripStatusAnimalandTriptype/${bookingId}`,
        updateStatusData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error: unknown) {
        // @ts-expect-error error type
         if (axios.isAxiosError(error)) {
           // @ts-expect-error error type
           const data = error.response?.data as ApiErrorResponse;
   
           // Handle validation errors from backend
           if (data?.errors) {
             return rejectWithValue({ validationErrors: data.errors });
           }
           // Handle other API errors
           const errorMessage = data?.message || data?.error || "API Error";
           return rejectWithValue({ error: errorMessage });
         }
   
         // Handle non-Axios errors
         if (error instanceof Error) {
           return rejectWithValue({ error: error.message });
         }
   
         return rejectWithValue({ error: "An unknown error occurred" });
       }
  }
);

const updatedStatusDataSlice = createSlice({
  name: "animalStatus",
  initialState,
  reducers: {
    clearUpdateStatusState: (state) => {
      state.data = null;
      state.iserror = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateStatusanimal.pending, (state) => {
        state.data = null;
        state.iserror = null;
        state.success = false;
      })
      .addCase(updateStatusanimal.fulfilled, (state, action: PayloadAction<AnimalStatusResponse>) => {
        state.isProcessing = false;
        state.data = action.payload;
        state.success = true;
      })
      .addCase(updateStatusanimal.rejected, (state, action) => {
        state.isProcessing = false;
        state.iserror = action.payload as string;
        state.success = false;
      });
  },
});

export const { clearUpdateStatusState } = updatedStatusDataSlice.actions;
export default updatedStatusDataSlice.reducer;