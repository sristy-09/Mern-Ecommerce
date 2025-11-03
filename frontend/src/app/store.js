import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Products/productSlice";
import userReducer from "../features/User/userSlice";
import cartReducer from "../features/Cart/cartSlice";
import adminReducer from "../features/Admin/adminSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    admin: adminReducer,
  },
});
