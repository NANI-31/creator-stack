import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notificationApi } from "../services/notification.service";
import type { Notification } from "../../../types";
import type { AxiosError } from "axios";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await notificationApi.getAll();
      return response.data;
    } catch (err: unknown) {
      let errorMessage = "Failed to fetch notifications";
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as AxiosError<{ message: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const markNotificationRead = createAsyncThunk(
  "notifications/markRead",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await notificationApi.markAsRead(id);
      return response.data;
    } catch (err: unknown) {
      let errorMessage = "Failed to mark as read";
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as AxiosError<{ message: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const markAllNotificationsRead = createAsyncThunk(
  "notifications/markAllRead",
  async (_, { rejectWithValue }) => {
    try {
      const response = await notificationApi.markAllAsRead();
      return response;
    } catch (err: unknown) {
      let errorMessage = "Failed to mark all as read";
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as AxiosError<{ message: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotificationError: (state) => {
      state.error = null;
    },
    // Useful for real-time updates later
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload.data.notifications;
        state.unreadCount = action.payload.data.unreadCount;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(
          (n) => n._id === action.payload.data._id
        );
        if (index !== -1 && !state.notifications[index].isRead) {
          state.notifications[index].isRead = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      .addCase(markAllNotificationsRead.fulfilled, (state) => {
        state.notifications = state.notifications.map((n) => ({
          ...n,
          isRead: true,
        }));
        state.unreadCount = 0;
      });
  },
});

export const { clearNotificationError, addNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
