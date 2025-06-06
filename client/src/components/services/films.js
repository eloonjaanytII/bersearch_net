import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const filmsApi = createApi({
  reducerPath: 'filmsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/films',
    prepareHeaders: headers => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    sendFilms: builder.mutation({
      query: body => ({
        url: `/`,
        method: "POST",
        body,
      })
    }),

    getUserFilms: builder.query({  
        query: (userId) => `/user-films/${userId}`
    }),
  }),
});

export const {useSendFilmsMutation, useGetUserFilmsQuery} = filmsApi;