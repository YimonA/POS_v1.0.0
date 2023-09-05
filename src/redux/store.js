import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/authApi";
import authSlice from "./services/authSlice";

import shopSlice from "./services/shopSlice";
import stockSlice  from "./services/StockSlice";
import { stockApi } from "./api/stockApi";

import { mediaApi } from "./api/mediaApi";
import mediaSlice from "./services/mediaSlice";
import { productApi } from "./api/productApi";
import productSlice from "./services/productSlice";
import { brandApi } from "./api/brandApi";
import brandSlice from "./services/brandSlice";

import { userApi } from "./api/userApi";
import userSlice from "./services/userSlice";


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,

    [mediaApi.reducerPath]: mediaApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

    authSlice: authSlice,
    mediaSlice: mediaSlice,
    productSlice: productSlice,
    brandSlice: brandSlice,
    shop: shopSlice,
    stockSlice :stockSlice,
    userSlice :userSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      mediaApi.middleware,
      productApi.middleware,
      brandApi.middleware,
      stockApi.middleware,userApi.middleware

    ),

});

// setupListeners(store.dispatch);
