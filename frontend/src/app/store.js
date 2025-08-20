import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Products/productSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
