import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartRedicer from "./features/cart/cartSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		cart: cartRedicer,
	},
});

export default store;