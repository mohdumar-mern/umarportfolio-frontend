import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import projectReducer from "../features/Project/projectSlice";

export const store = configureStore({
  reducer: {
    project: projectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});
