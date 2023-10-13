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
    getSingleProduct: builder.query({
      query: ({id,token}) => ({
        url: `/product/${id}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["product"],
    }),
    createProduct: builder.mutation({
      query: ({ product, token }) => ({
        url: `/product`,
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: product,
      }),
      invalidatesTags: ["product"],
    }),
    editProduct: builder.mutation({
      query: ({id,token, product }) => ({
        url: `/product/${id}`,
        method: "PUT",
        headers: { authorization: `Bearer ${token}` },
        body: product,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: ({ id, token }) => ({
        url: `/product/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const { useCreateProductMutation, useGetProductsQuery,useGetSingleProductQuery,useEditProductMutation,useDeleteProductMutation } = productApi;
