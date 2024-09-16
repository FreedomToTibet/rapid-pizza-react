import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cart: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addCart: (state, action) => {
			const existingPizza = state.cart.find(pizza => pizza.pizzaId === action.payload.pizzaId);
      if (!existingPizza) {
        state.cart.push(action.payload);
      }},
		deleteCart: (state, action) => {state.cart = state.cart.filter(pizza => pizza.pizzaId !== action.payload)},
		increaseCart: (state, action) => {
			const pizza = state.cart.find(pizza => pizza.pizzaId === action.payload);
			pizza.quantity++;
			pizza.totalPrice = pizza.quantity * pizza.unitPrice;
		},
		decreaseCart: (state, action) => {
			const pizza = state.cart.find(pizza => pizza.pizzaId === action.payload);
			if (pizza.quantity > 1) {
				pizza.quantity--;
				pizza.totalPrice = pizza.quantity * pizza.unitPrice;
			}
		},
		clearCart: (state) => {state.cart = []},
	},
});

export const { addCart, deleteCart, increaseCart, decreaseCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const getHowManyPizzas = (state) => state.cart.cart.reduce((acc, pizza) => acc + pizza.quantity, 0);

export const getTotalPrice = (state) => state.cart.cart.reduce((acc, pizza) => acc + pizza.totalPrice, 0);

export const getCart = (state) => state.cart.cart;