import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../services/auth.service";
import { toggleSaveWebsite } from "../../websites/slice/website.slice";
import type { User } from "../../../types";
import type { AxiosError } from "axios";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}

// Safe localStorage parsing to prevent app crashes
const getUserFromStorage = (): User | null => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    localStorage.removeItem("user"); // Clean up corrupted data
    return null;
  }
};

const initialState: AuthState = {
  user: getUserFromStorage(),
  accessToken: localStorage.getItem("accessToken"),
  isLoading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    userData: Partial<User> & { password?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authApi.register(userData);
      return response.data;
    } catch (err: unknown) {
      let errorMessage = "Registration failed";

      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as AxiosError<{ message: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email?: string; password?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authApi.login(credentials);
      return response.data;
    } catch (err: unknown) {
      let errorMessage = "Login failed";

      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as AxiosError<{ message: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      return true;
    } catch (err: unknown) {
      console.error(err);
      return rejectWithValue("Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
        localStorage.setItem("accessToken", action.payload.data.accessToken);
        localStorage.setItem("refreshToken", action.payload.data.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
        localStorage.setItem("accessToken", action.payload.data.accessToken);
        localStorage.setItem("refreshToken", action.payload.data.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      // Toggle Saved Website (Sync user state)
      .addCase(toggleSaveWebsite.fulfilled, (state, action) => {
        if (!state.user) return;
        // The payload can be { id, isSaved } or { id, data: { isSaved } }
        const { id } = action.payload;
        const isSaved =
          action.payload.isSaved !== undefined
            ? action.payload.isSaved
            : action.payload.data?.isSaved;

        if (isSaved === undefined) return; // Should not happen if API is correct

        // Controller:
        // if (isSaved) { remove } return { isSaved: !isSaved } => isSaved is NOW false (removed)
        // else { add } return { isSaved: !isSaved } => isSaved is NOW true (added)

        // So action.payload.isSaved represents the NEW state.

        // Ideally we should just rely on the ID list logic:
        // Or simplified:
        if (!state.user.savedWebsites) state.user.savedWebsites = [];

        // Note: state.user.savedWebsites can be array of strings or objects.
        // We need to handle that safely.
        // If it's objects, we need just ID to compare?
        // Let's assume for toggle, we just push/filter ID.
        // But if it was populated objects, pushing a string ID might make it mixed type.
        // Typings say string[] | Website[].

        const currentSaved = state.user.savedWebsites as any[];

        if (!isSaved) {
          // Removed
          state.user.savedWebsites = currentSaved.filter(
            (item) => (typeof item === "string" ? item : item._id) !== id
          );
        } else {
          // Added
          // If it sends back the object we could push it, but we likely only have ID from thunk arg if payload doesn't have it.
          // Thunk returns { id, ...response.data }. response.data has { isSaved }.
          // We don't have full website object here.
          // So just push ID.
          // If the list was Objects, pushing ID might break some renderers expecting objects?
          // The WebsiteCard checks: (typeof savedItem === 'string' ? savedItem : savedItem._id) === id. So it is safe.
          state.user.savedWebsites = [...currentSaved, id];
        }

        // Update local storage to persist
        localStorage.setItem("user", JSON.stringify(state.user));
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
