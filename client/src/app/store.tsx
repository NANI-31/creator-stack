import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slice/auth.slice";
import websiteReducer from "../features/websites/slice/website.slice";
import notificationReducer from "../features/notifications/slice/notification.slice";

// Add your reducers here
export const store = configureStore({
  reducer: {
    auth: authReducer,
    websites: websiteReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
