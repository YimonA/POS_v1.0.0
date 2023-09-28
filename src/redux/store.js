import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import authSlice from "./services/authSlice";

import shopSlice from "./services/shopSlice";
import stockSlice from "./services/stockSlice";
import { stockApi } from "./api/stockApi";

import { mediaApi } from "./api/mediaApi";
import mediaSlice from "./services/mediaSlice";
import { productApi } from "./api/productApi";
import productSlice from "./services/productSlice";
import { brandApi } from "./api/brandApi";
import brandSlice from "./services/brandSlice";

import { userApi } from "./api/userApi";
import userSlice from "./services/userSlice";

import { overviewApi } from "./api/overviewApi";
import overviewSlice from "./services/overviewSlice";
import { reportSaleApi } from "./api/reportSaleApi";
import reportSaleSlice from "./services/reportSaleSlice";
import { reportStockApi } from "./api/reportStockApi";
import reportStockSlice from "./services/reportStockSlice";

import { profileApi } from "./api/profileApi";
import profileSlice from "./services/profileSlice";
import cashierSlice from "./services/cashierSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [mediaApi.reducerPath]: mediaApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [reportSaleApi.reducerPath]: reportSaleApi.reducer,
    [overviewApi.reducerPath]: overviewApi.reducer,
    [reportStockApi.reducerPath]: reportStockApi.reducer,

    authSlice: authSlice,
    mediaSlice: mediaSlice,
    productSlice: productSlice,
    brandSlice: brandSlice,
    shop: shopSlice,
    stockSlice: stockSlice,
    userSlice: userSlice,
    profileSlice: profileSlice,
    overviewSlice: overviewSlice,
    reportSaleSlice: reportSaleSlice,
    reportStockSlice: reportStockSlice,
    cashierSlice: cashierSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      mediaApi.middleware,
      productApi.middleware,
      brandApi.middleware,
      stockApi.middleware,
      profileApi.middleware,
      userApi.middleware,
      overviewApi.middleware,
      reportSaleApi.middleware,
      reportStockApi.middleware
    ),
});
