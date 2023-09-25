import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  sum: 0,
  cost: 0,
  tax: 0,
  totalCost: 0,
  taxCost: 0,
  quantity: 0,
  cartItems: [],
  currentItem: null,
  currentQty: 1,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const isExisted = state.cartItems.find((item) => item.id === payload.id);
      if (isExisted) {
        return state;
      } else {
        state.cartItems = [...state.cartItems, { ...payload, quantity: 1 }];
        state.currentItem = state.cartItems[state.cartItems.length - 1];
      }
      state.totalCost += state.cartItems.reduce(
        (pv, cv) => (state.totalCost = cv.sale_price * cv.quantity),
        0
      );
      state.tax = state.totalCost * 0.05;
      state.taxCost = state.totalCost + state.tax;
      state.quantity++;
    },
    removeFromCart: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== payload.id
      );
      state.currentItem = state.cartItems[state.cartItems.length - 1];
      state.totalCost -= payload.quantity * payload.sale_price;
      state.tax = state.totalCost * 0.05;
      state.taxCost = state.totalCost + state.tax;
      state.quantity--;
    },
    addItemsQuantity: (state, { payload }) => {
      if (state.currentItem.quantity === 1) {
        state.currentQty = 0;
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === state.currentItem.id) {
            return { ...item, quantity: payload };
          } else {
            return item;
          }
        });
        state.currentItem = state.cartItems[state.cartItems.length - 1];
        state.totalCost += state.cartItems.reduce(
          (pv, cv) => (state.totalCost = cv.sale_price * cv.quantity),
          0
        );
        state.tax = state.totalCost * 0.05;
        state.taxCost = state.totalCost + state.tax;
      }
      else
      {
            state.currentQty = state.currentQty+payload;
            state.cartItems = state.cartItems.map((item) => {
              if (item.id === state.currentItem.id) {
                return { ...item, quantity: state.currentQty };
              } else {
                return item;
              }
            });
            state.currentItem = state.cartItems[state.cartItems.length - 1];
            state.totalCost += state.cartItems.reduce(
              (pv, cv) => (state.totalCost = cv.sale_price * cv.quantity),
              0
            );
            state.tax = state.totalCost * 0.05;
            state.taxCost = state.totalCost + state.tax;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, addItemsQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
