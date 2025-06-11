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
        method: "PUT",
        body,
      })
    }),

    getFilm: builder.query({
      query: (kinopoiskId) => `/film/${kinopoiskId}`
    }),

    getUserFilms: builder.query({
      query: (userId) => `/user-films/${userId}`
    }),

    getUserFilmFlag: builder.query({
      query: (kinopoiskId) => `/film-flag/${kinopoiskId}`
    }),

    getUserFilmFlagsAll: builder.query({
      query: (userId) => `/film-flags/${userId}`
    })


  }),
});

export const {useSendFilmsMutation, useGetUserFilmsQuery, useGetFilmQuery, useGetUserFilmFlagQuery, useGetUserFilmFlagsAllQuery} = filmsApi;