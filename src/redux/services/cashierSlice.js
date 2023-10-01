import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  sum: 0,
  tax: 0,
  totalCost: 0,
  taxCost: 0,
  quantity: 0,
  cartItems: [],
  currentItem: null,
  deleteItem: null,
  strQty: "",
  substractQty: "",
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
      state.deleteItem = state.currentItem;
      state.totalCost -=
        state.deleteItem.quantity * state.deleteItem.sale_price;
      state.tax = calcTax(state.totalCost);
      state.taxCost = calcTaxCost(state.totalCost, state.tax);
      state.currentItem = state.cartItems[state.cartItems.length - 1];
    },
    addItemsQuantity: (state, { payload }) => {
      if (
        (state.currentItem.quantity === 1 ||
          state.currentItem.quantity === 0) &&
        state.currentItem.total_stock > Number(payload)
      ) {
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === state.currentItem.id) {
            return { ...item, quantity: Number(payload) };
          } else {
            return item;
          }
        });
        state.currentItem = {
          ...state.currentItem,
          quantity: payload,
        };
        state.totalCost +=
          calcTotalCost(state.cartItems) - state.currentItem.sale_price;
        state.tax = calcTax(state.totalCost);
        state.taxCost = calcTaxCost(state.totalCost, state.tax);
      } else if (
        state.currentItem.quantity >= 1 &&
        state.currentItem.total_stock >
          Number(state.currentItem.quantity + payload)
      ) {
        // const currentQty= state.currentItem.quantity+payload;
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === state.currentItem.id) {
            return {
              ...item,
              quantity: Number(state.currentItem.quantity + payload),
            };
          } else {
            return item;
          }
        });

        state.totalCost +=
          calcTotalCost(state.cartItems) -
          state.currentItem.quantity * state.currentItem.sale_price;

        state.tax = calcTax(state.totalCost);
        state.taxCost = calcTaxCost(state.totalCost, state.tax);
        state.currentItem = {
          ...state.currentItem,
          quantity: Number(state.currentItem.quantity + payload),
        };
      }
    },
    subtractItemsQuantity: (state, { payload }) => {
      state.strQty = new String(payload.quantity);
      console.log("strQty", state.strQty);
      if (state.strQty.length === 1) {
        state.substractQty = "1";
      } else {
        state.substractQty = state.strQty.substring(0, state.strQty.length - 1);
      }

      state.cartItems = state.cartItems.map((item) => {
        if (item.id === state.currentItem.id) {
          return {
            ...item,
            quantity: Number(state.substractQty),
          };
        } else {
          return item;
        }
      });
      console.log("ccc", state.cartItems);
      console.log("current", state.currentItem);

      state.totalCost +=
        calcTotalCost(state.cartItems) -
        state.currentItem.quantity * state.currentItem.sale_price;

      state.tax = calcTax(state.totalCost);
      state.taxCost = calcTaxCost(state.totalCost, state.tax);
      state.currentItem = {
        ...state.currentItem,
        quantity: Number(state.substractQty),
      };
    },

    addCurrentItem: (state, { payload }) => {
      state.currentItem = payload;
    },
    clearCart:(state)=>{
      state.cartItems=[];
      state.totalCost=0;
            state.tax=0;
            state.taxCost=0;

    }
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  addItemsQuantity,
  removeFromCart,
  addCurrentItem,
  subtractItemsQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
