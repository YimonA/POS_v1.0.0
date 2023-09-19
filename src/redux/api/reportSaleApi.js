import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reportSaleApi = createApi({
  reducerPath: "reportSaleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://h.mmsdev.site/api/v1',
  }),
  tagTypes: ["reportSale"],

  endpoints: (builder) => ({
    getProductSaleReport: builder.query({
      query: (token) => ({
        url: `/product-sale-report`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["reportSale"],
    }),
    getBrandSaleReport: builder.query({
      query: (token) => ({
        url: `/brand-sale-report`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["reportSale"],
    }),
    getWeekelySaleReport: builder.query({
      query: (token) => ({
        url: `/weekely-sale-report`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["reportSale"],
    }),
    getTodaySaleReport: builder.query({
      query: (token) => ({
        url: `/today-sale-report`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["reportSale"],
    }),
  }),
});

export const { useGetProductSaleReportQuery,useGetBrandSaleReportQuery,useGetWeekelySaleReportQuery,useGetTodaySaleReportQuery} = reportSaleApi;
