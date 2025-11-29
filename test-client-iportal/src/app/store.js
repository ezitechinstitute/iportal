import { configureStore } from "@reduxjs/toolkit";
import {
  internsApi,
  publicProfileProjects,
  publicProfileScores,
} from "../services/internsApi";
import { publicProfileApi } from "../services/internsApi";

export const store = configureStore({
  reducer: {
    [internsApi.reducerPath]: internsApi.reducer,
    [publicProfileApi.reducerPath]: publicProfileApi.reducer,
    [publicProfileProjects.reducerPath]: publicProfileProjects.reducer,
    [publicProfileScores.reducerPath]: publicProfileScores.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      internsApi.middleware,
      publicProfileApi.middleware,
      publicProfileProjects.middleware,
      publicProfileScores.middleware
    ),
});
