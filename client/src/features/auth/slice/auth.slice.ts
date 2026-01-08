import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../services/auth.service";
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
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
