import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://h.mmsdev.site/api/v1`,
  }),
  tagTypes: ["stock"],

  endpoints: (builder) => ({
    getStocks: builder.query({
      query: (token) => ({
        url: "/stock",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["stock"],
    }),
    addStock: builder.mutation({
      query: ({ stock, token }) => ({
        url: `/stock`,
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: stock,
      }),
      invalidatesTags: ["stock"],
    }),
  }),
});

export const { useAddStockMutation, useGetStocksQuery } = stockApi;
