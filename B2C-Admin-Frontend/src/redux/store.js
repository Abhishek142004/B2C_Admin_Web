import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"; // Import thunk if you need it for async actions
import rootReducer from "../redux/reducers/index"; // Root reducer where you combine your app reducers

// Configure store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add thunk for async actions
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development mode
});

export default store;
