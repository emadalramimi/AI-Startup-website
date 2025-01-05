import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import servicesReducer from "./slices/servicesSlice";
import teamReducer from "./slices/teamSlice";
import notificationsReducer from "./slices/notificationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    team: teamReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['team/addTeamMember/fulfilled', 'team/updateTeamMember/fulfilled'],
        // Ignore these paths in the state
        ignoredPaths: ['team.teamMembers.headers', 'services.services.headers'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
