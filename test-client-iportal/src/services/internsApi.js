import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Assumes backend exposes paginated interns at GET /api/interns?page=<n>&limit=<m>
export const internsApi = createApi({
  reducerPath: "internsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.ezitech.org/api" }),
  endpoints: (builder) => ({
    getInterns: builder.query({
      // arg: { page, limit }
      query: ({ page = 1, limit = 8 } = {}) => ({
        url: `/interns`,
        params: { page, limit },
      }),
      // normalize response: prefer common shapes
      transformResponse: (response) => {
        // backend may return { data: [...], total, page, limit } or { items: [...], total }
        if (!response) return { items: [], total: 0 };
        if (response.data)
          return {
            items: response.data,
            total: response.total ?? response.count ?? 0,
            page: response.page ?? 1,
            limit: response.limit ?? 8,
          };
        if (response.items)
          return {
            items: response.items,
            total: response.total ?? response.count ?? 0,
            page: response.page ?? 1,
            limit: response.limit ?? 8,
          };
        // fallback if response is array
        if (Array.isArray(response))
          return {
            items: response,
            total: response.length,
            page: 1,
            limit: response.length,
          };
        // otherwise return raw
        return {
          items: response.items ?? response,
          total: response.total ?? 0,
          page: response.page ?? 1,
          limit: response.limit ?? 8,
        };
      },
    }),
  }),
});

export const publicProfileApi = createApi({
  reducerPath: "publicProfileApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.ezitech.org/api" }),
  endpoints: (builder) => ({
    getPublicProfile: builder.query({
      // arg: eti_id
      query: (eti_id) => `/public-profile/${encodeURIComponent(eti_id)}`,
      transformResponse: (response) => response,
    }),
  }),
});

export const publicProfileProjects = createApi({
  reducerPath: "publicProfileProjects",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.ezitech.org/api" }),
  endpoints: (builder) => ({
    getPublicProfileProjects: builder.query({
      // arg: eti_id
      query: (eti_id) =>
        `/public-profile-projects/${encodeURIComponent(eti_id)}`,
      transformResponse: (response) => response,
    }),
  }),
});

export const publicProfileScores = createApi({
  reducerPath: "publicProfileScores",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.ezitech.org/api" }),
  endpoints: (builder) => ({
    getPublicProfileScores: builder.query({
      // arg: eti_id
      query: (eti_id) =>
        `/public-profile-performance/${encodeURIComponent(eti_id)}`,
      transformResponse: (response) => response,
    }),
  }),
});

export const { useGetInternsQuery } = internsApi;
export const { useGetPublicProfileQuery } = publicProfileApi;
export const { useGetPublicProfileProjectsQuery } = publicProfileProjects;
export const { useGetPublicProfileScoresQuery } = publicProfileScores;
