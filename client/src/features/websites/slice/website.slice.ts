import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { websiteApi, userApi } from "../services/website.service";
import type { Website, Category, DashboardStats } from "../../../types";
import type { AxiosError } from "axios";

interface WebsiteState {
  trending: Website[];
  categories: Category[];
  userStats: DashboardStats | null;
  myContributions: Website[];
  currentWebsite: Website | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: WebsiteState = {
  trending: [],
  categories: [],
  userStats: null,
  myContributions: [],
  currentWebsite: null,
  isLoading: false,
  error: null,
};

export const fetchTrendingWebsites = createAsyncThunk(
  "websites/fetchTrending",
  async (_, { rejectWithValue }) => {
    try {
      const response = await websiteApi.getTrending();
      return response.data;
    } catch (error: unknown) {
      let errorMessage = "Failed to fetch trending";

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as AxiosError<{ message: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "websites/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await websiteApi.getCategories();
      return response.data;
    } catch (error: unknown) {
      let errorMessage = "Failed to fetch categories";

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as AxiosError<{ message: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchWebsiteDetails = createAsyncThunk(
  "websites/fetchDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await websiteApi.getById(id);
      return response.data;
    } catch (error: unknown) {
      let errorMessage = "Failed to fetch website details";

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as AxiosError<{ message: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchDashboardData = createAsyncThunk(
  "websites/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const [statsRes, contributionsRes] = await Promise.all([
        userApi.getDashboardStats(),
        userApi.getMyContributions(),
      ]);
      return {
        stats: statsRes.data.data.stats,
        contributions: contributionsRes.data.data,
      };
    } catch (error: unknown) {
      let errorMessage = "Failed to fetch dashboard data";

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as AxiosError<{ message: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

const websiteSlice = createSlice({
  name: "websites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Trending
      .addCase(fetchTrendingWebsites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTrendingWebsites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trending = action.payload.data;
      })
      // Categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data;
      })
      // Dashboard
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userStats = action.payload.stats;
        state.myContributions = action.payload.contributions;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Website Details
      .addCase(fetchWebsiteDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWebsiteDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentWebsite = action.payload.data;
      })
      .addCase(fetchWebsiteDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default websiteSlice.reducer;
