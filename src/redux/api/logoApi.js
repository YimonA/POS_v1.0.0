import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const logoApi = createApi({
  reducerPath: "logoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://h.mmsdev.site/api/v1`,
  }),
  tagTypes: ["logo"],

  endpoints: (builder) => ({
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
      query: ({ brand, token }) => ({
        url: `/brand/${brand.id}`,
        method: "PUT",
        headers: { authorization: `Bearer ${token}` },
        body: brand,
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

export const { useCreateBrandMutation,useEditBrandMutation ,useDeleteBrandMutation} = logoApi;
