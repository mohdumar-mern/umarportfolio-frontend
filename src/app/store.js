import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import projectReducer from "../features/Project/projectSlice";
import skillReducer from "../features/Skills/skillSlice"
import serviceReducer from "../features/service/serviceSlice"

export const store = configureStore({
  reducer: {
    project: projectReducer,
    skill: skillReducer,
    service: serviceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});
