import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://h.mmsdev.site/api/v1`,
  }),
  tagTypes: ["user"],

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (token) => ({
        url: "/user",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["user"],
    }),
    getSingleUsers: builder.query({
      query: ({ id, token }) => ({
        url: `/user/${id}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["user"],
    }),
    createUser: builder.mutation({
      query: ({ user, token }) => ({
        url: `/user`,
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: user,
      }),
      invalidatesTags: ["user"],
    }),
    editUser: builder.mutation({
      query: ({ user, token }) => ({
        url: `/user/${user?.id}`,
        method: "PUT",
        headers: { authorization: `Bearer ${token}` },
        body: user,
      }),
      invalidatesTags: ["user"],
    }),
    getBannedUsers: builder.query({
      query: (token) => ({
        url: "/banned-user",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["user"],
    }),
    bannedUsers: builder.mutation({
      query: ({ id, token }) => ({
        url: `/user/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["user"],
    }),
    restoreUser: builder.mutation({
      query: ({ id, token }) => ({
        url: `/restore/${id}`,
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useEditUserMutation,
  useGetUsersQuery,
  useGetSingleUsersQuery,
  useGetBannedUsersQuery,
  useBannedUsersMutation,
  useRestoreUserMutation,
} = userApi;
