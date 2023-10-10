import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reportStockApi = createApi({
  reducerPath: "reportStockApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://h.mmsdev.site/api/v1',
  }),
  tagTypes: ["reportStock"],

  endpoints: (builder) => ({
    getStockOverview: builder.query({
      query: ({token,page}) => ({
        url: `/stock_report?page=${page}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["reportStock"],
    }),
    getWeekelyBestBrands: builder.query({
      query: (token) => ({
        url: `/weekely_best_seller_brands`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["reportStock"],
    }),
    getBrandsReport: builder.query({
      query: (token) => ({
        url: `/brand_report`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["reportStock"],
    }),
  }),
});

export const {useGetStockOverviewQuery, useGetWeekelyBestBrandsQuery,useGetBrandsReportQuery} = reportStockApi;
