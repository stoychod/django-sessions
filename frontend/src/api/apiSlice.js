import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
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
    checkAuthenticated: builder.query({
      query: () => "/auth/checkAuthentication",
      providesTags: ["Authenticated"],
    }),
  }),
});

export const { useGetCSRFCookieQuery, useRegisterUserMutation } = apiSlice;
