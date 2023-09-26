import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://h.mmsdev.site/api/v1`,
  }),
  tagTypes: ["profile"],

  endpoints: (builder) => ({
    changeProfilePW: builder.mutation({
      query: ({ newData, token }) => ({
        url: `/change-password`,
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: newData,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {useChangeProfilePWMutation } = profileApi;
