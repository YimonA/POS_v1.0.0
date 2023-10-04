import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://h.mmsdev.site/api/v1`,
  }),
  tagTypes: ["brand"],

  endpoints: (builder) => ({
    getSinglBrand: builder.query({
      query: ({id,token}) => ({
        url: `/brand/${id}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["brand"],
    }),
    createBrand: builder.mutation({
      query: ({ brand, token }) => ({
        url: `/brand`,
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: brand,
      }),
      invalidatesTags: ["brand"],
    }),
    editBrand: builder.mutation({
      query: ({ brand, token }) => ({
        url: `/brand/${brand.id}`,
        method: "PUT",
        headers: { authorization: `Bearer ${token}` },
        body: brand,
      }),
      invalidatesTags: ["brand"],
    }),
    deleteBrand: builder.mutation({
      query: ({ id, token }) => ({
        url: `/brand/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["brand"],
    }),
  }),
});

export const { useCreateBrandMutation ,useDeleteBrandMutation} = brandApi;
