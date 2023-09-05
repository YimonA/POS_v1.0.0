import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://h.mmsdev.site/api/v1`,
  }),
  tagTypes: ["photo"],

  endpoints: (builder) => ({
    getPhoto: builder.query({
      query: (token) => ({
        url: "/photo",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["media"],
    }),
    uploadPhoto: builder.mutation({
      query: ({token,photos }) => {
        // console.log("ppp", photos, token);
        return {
          url: `/photo`,
          method: "POST",
          headers: { authorization: `Bearer ${token}` },

          body: photos,
        };
      },
      invalidatesTags: ["media"],
    }),
    deletePhoto: builder.mutation({
      query: ({ id, token }) => ({
        url: `/photo/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["media"],
    }),
  }),
});

export const {
  useGetPhotoQuery,
  useUploadPhotoMutation,
  useDeletePhotoMutation,
} = mediaApi;
