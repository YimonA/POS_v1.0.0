import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://h.mmsdev.site/api/v1`,
  }),
  tagTypes: ["brand"],

  endpoints: (builder) => ({
    getBrands: builder.query({
      query: (token) => ({
        url: `/brand`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["brand"],
    }),
    getSingleBrand: builder.query({
      query: ({id,token}) => ({
        url: `/brand/${id}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["brand"],
    }),
    getBrandsPerPage: builder.query({
      query: ({currentPage,token}) => ({
        url: `/brand?page=${currentPage}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["brand"],
    }),
    createBrand: builder.mutation({
      query: ({brand, token }) => {
        return {
          url: `/brand`,
          method: "POST",
          headers: { authorization: `Bearer ${token}` },
          body: brand,
        };
      },
      invalidatesTags: ["brand"],
    }),
    updateBrand: builder.mutation({
      query: ({brand, token }) => {
        return {
          url: `/brand/${brand.id}`,
          method: "PUT",
          headers: { authorization: `Bearer ${token}` },
          body: brand,
        };
      },
      invalidatesTags: ["brand"],
    }),
    deleteBrand: builder.mutation({
      query: ({id, token }) => {
        return {
          url: `/brand/${id}`,
          method: "DELETE",
          headers: { authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: ["brand"],
    }),
  }),
});

export const {useCreateBrandMutation,useUpdateBrandMutation,useDeleteBrandMutation, useGetBrandsQuery, useGetBrandsPerPageQuery,useGetSingleBrandQuery } = brandApi;