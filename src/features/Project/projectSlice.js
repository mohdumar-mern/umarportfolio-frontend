import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_API_URL;

// Async Thunk: Fetch Projects with Pagination
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async ({ page = 1, limit = 6 } = {}, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}projects/?page=${page}&limit=${limit}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || "Failed to fetch projects"
      );
    }
  }
);

// Initial State
const initialState = {
  projects: [],
  project: null,
  loading: false,
  error: null,
  message: null,
  totalProjects: 0,
  totalPages: 0,
  currentPage: 1,
  projectsPerPage: 6,
};

// Project Slice
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.project = null;
      })

      // Fulfilled
      .addCase(fetchProjects.fulfilled, (state, action) => {
        const { data, totalDocs, totalPages, currentPage, limit } = action.payload;
        state.projects = data;
        state.totalProjects = totalDocs;
        state.totalPages = totalPages;
        state.currentPage = currentPage;
        state.projectsPerPage = limit;
        state.loading = false;
        state.message = "Projects fetched successfully.";
        state.error = null;
      })

      // Rejected
      .addCase(fetchProjects.rejected, (state, action) => {
        state.projects = [];
        state.loading = false;
        state.error = action.payload || "Something went wrong while fetching projects.";
        state.message = null;
        state.totalProjects = 0;
        state.totalPages = 0;
        state.currentPage = 1;
      });
  },
});

export default projectSlice.reducer;
