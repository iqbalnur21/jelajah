import { configureStore } from "@reduxjs/toolkit";
import { userLoggedSlice } from "./slices/UserLoggedSlice";

export const store = configureStore({
  reducer: {
    userLogged: userLoggedSlice.reducer,
  },
});

export default store;
