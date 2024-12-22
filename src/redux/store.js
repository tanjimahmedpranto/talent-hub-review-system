// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit"; // Import from Redux Toolkit
import authReducer from "./reducers/authReducer";

const store = configureStore({
  reducer: {
    auth: authReducer, // Combine reducers if needed
  },
  // Redux Toolkit automatically includes thunk middleware, so no need to manually add it
});

export default store;
