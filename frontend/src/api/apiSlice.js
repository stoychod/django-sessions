import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Authenticated", "UserProfile"],
  endpoints: (builder) => ({
    getCSRFCookie: builder.query({
      query: () => "/accounts/csrf_cookie/",
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
    logoutUser: builder.mutation({
      query: (csrftoken) => ({
        url: "/accounts/logout/",
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
        },
      }),
      invalidatesTags: ["Authenticated"],
    }),
    checkAuthenticated: builder.query({
      query: () => "/accounts/authenticated/",
      providesTags: ["Authenticated"],
    }),
    confirmPassword: builder.mutation({
      query: ({ userData, csrftoken }) => ({
        url: "/accounts/confirm_password/",
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
        },
        body: userData,
      }),
    }),
    getUserProfile: builder.query({
      query: (csrftoken) => ({
        url: "/profile/",
        method: "GET",
        "X-CSRFToken": csrftoken,
      }),
      providesTags: ["UserProfile"],
    }),
    updateUserProfile: builder.mutation({
      query: ({ userData, csrftoken }) => ({
        url: "/profile/",
        method: "PUT",
        headers: {
          "X-CSRFToken": csrftoken,
        },
        body: userData,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    deleteUser: builder.mutation({
      query: (csrftoken) => ({
        url: "/accounts/delete/",
        method: "DELETE",
        headers: {
          "X-CSRFToken": csrftoken,
        },
      }),
      invalidatesTags: ["Authenticated"],
    }),
  }),
});

export const {
  useGetCSRFCookieQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useCheckAuthenticatedQuery,
  useLogoutUserMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useConfirmPasswordMutation,
  useDeleteUserMutation,
} = apiSlice;
