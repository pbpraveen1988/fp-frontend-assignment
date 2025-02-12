import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getGithubUser: builder.query<User, string>({
      query: (username) => `/users/${username}`,
    }),
    getUsers: builder.query<User[], void>({
      query: () => '/stored-users',
      providesTags: ['Users'],
    }),
    addUser: builder.mutation<void, User>({
      query: (user) => ({
        url: '/stored-users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
    removeUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/stored-users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetGithubUserQuery,
  useGetUsersQuery,
  useAddUserMutation,
  useRemoveUserMutation,
} = api; 