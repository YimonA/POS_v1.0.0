import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const logoApi = createApi({
  reducerPath: "logoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://h.mmsdev.site/api/v1`,
  }),
  tagTypes: ["logo"],

  endpoints: (builder) => ({
    getBrands: builder.query({
      query: (token) => ({
        url: `/brand?page=1`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["brand"],
    }),
    getSinglBrand: builder.query({
      query: ({id,token}) => ({
        url: `/brand/${id}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["brand"],
    }),
    createBrand: builder.mutation({
      query: ({ newBrand, token }) => ({
        url: `/brand`,
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: newBrand,
      }),
      invalidatesTags: ["logo"],
    }),
    editBrand: builder.mutation({
      query: ({ id,newData, token }) => ({
        url: `/brand/${id}`,
        method: "PUT",
        headers: { authorization: `Bearer ${token}` },
        body: newData,
      }),
      invalidatesTags: ["logo"],
    }),
    deleteBrand: builder.mutation({
      query: ({ id, token }) => ({
        url: `/brand/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["logo"],
    }),
  }),
});

export const {useGetBrandsQuery, useGetSinglBrandQuery,useCreateBrandMutation,useEditBrandMutation ,useDeleteBrandMutation} = logoApi;
