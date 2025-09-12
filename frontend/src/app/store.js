import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Products/productSlice";
import userReducer from "../features/User/userSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
  },
});
