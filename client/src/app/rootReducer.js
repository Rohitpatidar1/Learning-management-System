import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"; // ✅ Correct import
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer, // ✅ Add authApi reducer
  [courseApi.reducerPath]: courseApi.reducer,
  auth: authReducer,
});

export default rootReducer;
