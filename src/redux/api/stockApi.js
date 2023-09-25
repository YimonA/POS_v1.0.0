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
    getSingleStocks: builder.query({
      query: ({id,token}) => ({
        url: `/stock/${id}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["stock"],
    }),
    addStock: builder.mutation({
      query: ({ newData, token }) => ({
        url: `/stock`,
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: newData,
      }),
      invalidatesTags: ["stock"],
    }),
  }),
});

export const {useGetSingleStocksQuery, useAddStockMutation, useGetStocksQuery } = stockApi;
