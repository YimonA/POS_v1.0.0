import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reportStockApi = createApi({
  reducerPath: "reportStockApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://h.mmsdev.site/api/v1',
  }),
  tagTypes: ["reportStock"],

  endpoints: (builder) => ({
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

export const { useGetWeekelyBestBrandsQuery,useGetBrandsReportQuery} = reportStockApi;
