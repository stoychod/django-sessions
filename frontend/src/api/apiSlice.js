import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Authenticated"],
  endpoints: (builder) => ({
    getCSRFCookie: builder.query({
      query: () => "/accounts/csrf_cookie",
    }),
    registerUser: builder.mutation({
      query: ({ userData, csrftoken }) => ({
        url: "/accounts/register/",
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
        },
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: ({ userData, csrftoken }) => ({
        url: "/accounts/login/",
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
        },
        body: userData,
      }),
      invalidatesTags: ["Authenticated"],
    }),
    checkAuthenticated: builder.query({
      query: () => "/accounts/authenticated",
      providesTags: ["Authenticated"],
    }),
  }),
});

export const {
  useGetCSRFCookieQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
} = apiSlice;
