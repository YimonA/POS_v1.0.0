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
    getBrandsPerPage: builder.query({
      query: ({token,pgNum}) => ({
        url: `/brand?page=${pgNum}`,        
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["brand"],
    }),
  }),
});

export const { useGetBrandsQuery,useGetBrandsPerPageQuery } = brandApi;

//        // url: `/brand?page=${}`,
