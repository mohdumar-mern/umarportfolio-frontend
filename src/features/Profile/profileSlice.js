import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthHeaders } from "../../utils/AuthHeaders"; // ✅ Import this

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_API_URL;

// Fetch Profile
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}profile`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

// Fetch avatar
export const fetchAvatar = createAsyncThunk(
  "profile/fetchAvatar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}profile/avatar`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch avatar"
      );
    }
  }
);

// Fetch resume
export const fetchResume = createAsyncThunk(
  "profile/fetchResume",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}profile/resume`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch resume"
      );
    }
  }
);

// Fetch social links
export const fetchSocialLinks = createAsyncThunk(
  "profile/fetchSocialLinks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}profile/social-links`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch social links"
      );
    }
  }
);

// Add profile
export const addProfile = createAsyncThunk(
  "profile/addProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.post(`${API_URL}profile/add`, formData, {
        headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add profile"
      );
    }
  }
);

// Update profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.put(
        `${API_URL}profile/${id}/edit`,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

// Initial state
const initialState = {
  avatar: null,
  resume: null,
  socialLinks: [],
  profile: null,
  loading: false,
  error: null,
  message: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
        state.message = action.payload.message || "Fetched profile successfully";
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Avatar
      .addCase(fetchAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.avatar = action.payload.avatar;
        state.message = action.payload.message || "Fetched avatar successfully";
      })
      .addCase(fetchAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Resume
      .addCase(fetchResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resume = action.payload.resume;
        state.message = action.payload.message || "Fetched resume successfully";
      })
      .addCase(fetchResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Social Links
      .addCase(fetchSocialLinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSocialLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.socialLinks = action.payload.socialLinks;
        state.message =
          action.payload.message || "Fetched social links successfully";
      })
      .addCase(fetchSocialLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Profile
      .addCase(addProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
        state.message = action.payload.message || "Profile added successfully";
      })
      .addCase(addProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
        state.message = action.payload.message || "Profile updated successfully";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
