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
};

function calcTotalCost(cartItems) {
  return cartItems.reduce((pv, cv) => cv.sale_price * cv.quantity, 0);
}

function calcTax(totalCost) {
  return totalCost * 0.05;
}

function calcTaxCost(totalCost, tax) {
  return totalCost + tax;
}

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
      state.totalCost += calcTotalCost(state.cartItems);
      state.tax = calcTax(state.totalCost);
      state.taxCost = calcTaxCost(state.totalCost, state.tax);
    },
    removeFromCart: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== payload.id
      );
      state.totalCost -=
        state.currentItem.quantity * state.currentItem.sale_price;
      state.tax = calcTax(state.totalCost);
      state.taxCost = calcTaxCost(state.totalCost, state.tax);
      state.currentItem = state.cartItems[state.cartItems.length - 1];
    },
    addItemsQuantity: (state, { payload }) => {
      if (state.currentItem.quantity === 1) {
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === state.currentItem.id) {
            return { ...item, quantity: payload };
          } else {
            return item;
          }
        });
        state.currentItem = {
          ...state.currentItem,
          quantity:payload,
        };
        state.totalCost +=
          calcTotalCost(state.cartItems) - state.currentItem.sale_price;
        state.tax = calcTax(state.totalCost);
        state.taxCost = calcTaxCost(state.totalCost, state.tax);
      } else if (state.currentItem.quantity >= 1) {
        // const currentQty= state.currentItem.quantity+payload;
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === state.currentItem.id) {
            return { ...item, quantity: state.currentItem.quantity + payload };
          } else {
            return item;
          }
        });
        
        state.totalCost += calcTotalCost(state.cartItems)-(state.currentItem.quantity*state.currentItem.sale_price);
        
        state.tax = calcTax(state.totalCost);
        state.taxCost = calcTaxCost(state.totalCost, state.tax);
        state.currentItem = {
          ...state.currentItem,
          quantity: state.currentItem.quantity + payload,
        };
      }
    },
    addCurrentItem: (state, { payload }) => {
      state.currentItem=payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, addItemsQuantity, removeFromCart,addCurrentItem } =
  cartSlice.actions;

export default cartSlice.reducer;
