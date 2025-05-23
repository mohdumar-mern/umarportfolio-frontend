import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_API_URL;

// Async thunk to send contact message
export const sendContactRequest = createAsyncThunk(
  "contact/sendContactRequest",
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}contacts/add`, contactData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data; // only message is returned
    } catch (error) {
      const err = error.response?.data;
      return rejectWithValue(
        err?.message || err?.errors?.[0]?.msg || error.message || "Failed to send message"
      );
    }
  }
);

// Initial state
const initialState = {
  loading: false,
  error: null,
  message: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearContactStatus: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(sendContactRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Message sent successfully.";
        state.error = null;
      })
      .addCase(sendContactRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong.";
        state.message = null;
      });
  },
});

export const { clearContactStatus } = contactSlice.actions;
export default contactSlice.reducer;
