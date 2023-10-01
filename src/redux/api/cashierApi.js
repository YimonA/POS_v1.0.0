import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cashierApi = createApi({
  reducerPath: "cashierApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://h.mmsdev.site/api/v1`,
  }),
  tagTypes: ["cashier"],

  endpoints: (builder) => ({
    voucher : builder.mutation({
        query : ({token,strData})=>({
            url : '/voucher',
            method : 'POST',
            body : strData,
            headers : {authorization : `Bearer ${token}`,"Content-type": "application/json; charset=UTF-8",}
        }),
        providesTags : ['cashier']
    })
  }),
});

export const { useVoucherMutation} =cashierApi;
