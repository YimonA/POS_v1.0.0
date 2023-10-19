import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const overviewApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://h.mmsdev.site/api/v1',
  }),
  tagTypes: ["overview"],

  endpoints: (builder) => ({
    getOverview: builder.query({
      query: ({token,show}) => ({
        url: `/overview?${show}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["overview"],
    }),
  }),
});

export const {useGetOverviewQuery } = overviewApi;
