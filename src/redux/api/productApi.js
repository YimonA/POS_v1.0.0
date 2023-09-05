import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://h.mmsdev.site/api/v1`,
  }),
  tagTypes: ["product"],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (token) => ({
        url: "/product",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["product"],
    }),
    addProduct: builder.mutation({
      query: ({ product, token }) => ({
        url: `/product`,
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: product,
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const { useAddProductMutation, useGetProductsQuery } = productApi;
