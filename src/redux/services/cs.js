import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  sum: 0,
  totalAmount: 0,
  quantity: 0,
  cartItems: [],
};

const STORAGE_KEY = "cartItems";
const storedItems = Cookies.get(STORAGE_KEY);
/* 
const STORAGE_TOTALAMOUNT_KEY="totalAmount";
const storedTotalAmount=Cookies.get(STORAGE_TOTALAMOUNT_KEY);
*/
if (storedItems) {
  initialState.cartItems = JSON.parse(storedItems);
  initialState.totalAmount = calcTotalAmount(initialState.cartItems);
  initialState.quantity = calcQuantity(initialState.cartItems);
}

function calcTotalAmount(cartItems) {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

function calcQuantity(cartItems) {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}
/*
if(storedTotalAmount){
  initialState.totalAmount='';
}

function calcTotal(totalAmount){

}
*/

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
      }
      state.quantity = calcQuantity(state.cartItems);
      state.totalAmount = calcTotalAmount(state.cartItems);

      Cookies.set(STORAGE_KEY, JSON.stringify(state.cartItems));
      //state.totalAmount+=payload.price;
    },
    removeFromCart: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== payload.id
      );

      state.quantity = calcQuantity(state.cartItems);
      state.totalAmount = calcTotalAmount(state.cartItems);
      Cookies.set(STORAGE_KEY, JSON.stringify(state.cartItems));

      //state.quantity--;
      //state.totalAmount-=payload.price*payload.quantity;
    },
    addItemsQuantity: (state, { payload }) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === payload.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      state.quantity = calcQuantity(state.cartItems);
      state.totalAmount = calcTotalAmount(state.cartItems);
      Cookies.set(STORAGE_KEY, JSON.stringify(state.cartItems));

      //state.quantity++;
      //state.totalAmount+=payload.price;
    },
    subtractItemsQuantity: (state, { payload }) => {
      if (payload.quantity > 1) {
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === payload.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });

        state.quantity = calcQuantity(state.cartItems);
        state.totalAmount = calcTotalAmount(state.cartItems);
        Cookies.set(STORAGE_KEY, JSON.stringify(state.cartItems));

        //state.quantity--;
        //state.totalAmount-=payload.price;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  removeFromCart,
  addItemsQuantity,
  subtractItemsQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
