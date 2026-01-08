import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { websiteApi, userApi } from "../services/website.service";
import type { Website, Category, DashboardStats } from "../../../types";
import type { AxiosError } from "axios";

interface WebsiteState {
  trending: Website[];
  websites: Website[];
  totalWebsites: number;
  categories: Category[];
  userStats: DashboardStats | null;
  myContributions: Website[];
  savedWebsites: Website[];
  totalSaved: number;
  currentWebsite: Website | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: WebsiteState = {
  trending: [],
  websites: [],
  totalWebsites: 0,
  categories: [],
  userStats: null,
  myContributions: [],
  savedWebsites: [],
  totalSaved: 0,
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

export const fetchAllWebsites = createAsyncThunk(
  "websites/fetchAll",
  async (params: Record<string, unknown> = {}, { rejectWithValue }) => {
    try {
      const response = await websiteApi.getAll(params);
      return response.data;
    } catch (error: unknown) {
      let errorMessage = "Failed to fetch websites";

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

export const fetchSavedWebsites = createAsyncThunk(
  "websites/fetchSaved",
  async (params: Record<string, unknown> = {}, { rejectWithValue }) => {
    try {
      const response = await userApi.getSaved(params);
      return response.data;
    } catch (error: unknown) {
      let errorMessage = "Failed to fetch saved websites";

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as AxiosError<{ message: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const toggleSaveWebsite = createAsyncThunk(
  "websites/toggleSave",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await userApi.toggleSaved(id);
      return { id, ...response.data };
    } catch (error: unknown) {
      let errorMessage = "Failed to bookmark website";

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as AxiosError<{ message: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const voteWebsite = createAsyncThunk(
  "websites/vote",
  async (
    { id, voteType }: { id: string; voteType: "upvote" | "downvote" },
    { rejectWithValue }
  ) => {
    try {
      const response = await websiteApi.vote(id, voteType);
      return { id, voteType, ...response.data.data };
    } catch (error: unknown) {
      let errorMessage = "Failed to vote";

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
        state.error = null;
      })
      .addCase(fetchTrendingWebsites.fulfilled, (state, action) => {
        // Handle both envelope and direct array cases
        const data = action.payload.data || action.payload;
        if (Array.isArray(data)) {
          state.trending = data;
        }
      })
      // All Websites
      .addCase(fetchAllWebsites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllWebsites.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload.data || action.payload;
        const newWebsites = data.websites || (Array.isArray(data) ? data : []);

        // Check if we are appending (page > 1) or replacing
        // This requires the action to carry the page meta, but the thunk arg isn't available in action.payload directly
        // unless we return it.
        // Safer strategy: The component will handle clearing 'websites' if it wants a full refresh.
        // Or simpler: Inspect the `meta.arg` if needed, but for "Load More" we rely on append logic.

        // Actually, to keep it simple: WE ALWAYS REPLACE unless we specifically implement append action.
        // Wait, "Load More" REQUIRES appending.

        // Let's rely on the arg being passed.
        const { page } = action.meta.arg as { page?: number };

        if (page && page > 1) {
          state.websites = [...state.websites, ...newWebsites];
        } else {
          state.websites = newWebsites;
        }

        if (data.total !== undefined) {
          state.totalWebsites = data.total;
        }
      })
      .addCase(fetchAllWebsites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        const categories = action.payload.data || action.payload;
        if (Array.isArray(categories)) {
          state.categories = categories;
        }
      })
      // Dashboard
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
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
        const website = action.payload.data || action.payload;
        state.currentWebsite = website;
      })
      .addCase(fetchWebsiteDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Saved Websites
      .addCase(fetchSavedWebsites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSavedWebsites.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload.data || action.payload;
        const newWebsites = data.websites || (Array.isArray(data) ? data : []);

        const { page } = action.meta.arg as { page?: number };

        if (page && page > 1) {
          state.savedWebsites = [...state.savedWebsites, ...newWebsites];
        } else {
          state.savedWebsites = newWebsites;
        }

        if (data.total !== undefined) {
          state.totalSaved = data.total;
        }
      })
      .addCase(fetchSavedWebsites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Toggle Save
      .addCase(toggleSaveWebsite.fulfilled, (state, action) => {
        // If we successfully toggled, we should update the UI to reflect it.
        // However, if we are on the SAVED page, we might want to remove it from the list.
        // Or just let the UI handle it.
        // Ideally, we might want to update the 'saved' status if we had a flat map of websites.
        // Since we have separate lists (trending, websites, savedWebsites), simple specific update is hard.
        // But for the 'savedWebsites' list, if we just UN-saved something, we should remove it.
        // If we saved something, we generally don't add it immediately to the displayed 'saved' list unless we re-fetch,
        // OR unless we know the full object.

        // Strategy: If Removed, filter out from savedWebsites.
        // Optimistic update for the saved list
        const { id } = action.payload;
        const isSaved =
          action.payload.isSaved !== undefined
            ? action.payload.isSaved
            : action.payload.data?.isSaved;

        if (isSaved === false) {
          // If it is NO LONGER saved
          state.savedWebsites = state.savedWebsites.filter((w) => w._id !== id);
          state.totalSaved = Math.max(0, state.totalSaved - 1);
        } else if (isSaved === true) {
          // If it was just saved, we might not have the full website object here
          // But that's okay, usually saving happens from Explore page.
          // If user navigates back to /saved, it will re-fetch.
        }
      })
      // Vote Website
      .addCase(voteWebsite.fulfilled, (state, action) => {
        const { id, upvotes, downvotes, userVote } = action.payload;

        const updateWebsite = (w: Website) => {
          if (w._id === id) {
            return {
              ...w,
              stats: {
                ...w.stats,
                upvotes,
                downvotes,
              },
              userVote, // Assuming we want to track userVote per website now
            };
          }
          return w;
        };

        state.websites = state.websites.map(updateWebsite);
        state.trending = state.trending.map(updateWebsite);
        state.savedWebsites = state.savedWebsites.map(updateWebsite);
        state.myContributions = state.myContributions.map(updateWebsite);

        if (state.currentWebsite && state.currentWebsite._id === id) {
          state.currentWebsite = {
            ...state.currentWebsite,
            stats: {
              ...state.currentWebsite.stats,
              upvotes,
              downvotes,
            },
            userVote,
          };
        }
      });
  },
});

export default websiteSlice.reducer;
