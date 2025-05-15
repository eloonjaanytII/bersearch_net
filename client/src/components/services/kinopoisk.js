import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const kinopoiskApiKey = import.meta.env.VITE_KINOPOISK_KEY;

const excludeGenres = [
  "",
  "ток-шоу",
  "церемония",
]

export const kinopoiskApi = createApi({
  reducerPath: 'kinopoiskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kinopoiskapiunofficial.tech/api/',
    prepareHeaders: headers => {
      headers.set('X-API-KEY', kinopoiskApiKey);
      headers.set('Content-Type', 'application/json');
    },
  }),
  endpoints: builder => ({

    getFilmsCollections: builder.query({
      query: ({ type, page }) =>
        `v2.2/films/collections?type=${type}&page=${page}`,
    }),

    getFilms: builder.query({
      query: ({
        countries = "",
        genres = "",
        order = "NUM_VOTE",
        type = "FILM",
        yearFrom = 1000,
        yearTo = 3000,
        page = 1,
        keyword = '',
      }) => 
        `v2.2/films?countries=${countries}&genres=${genres}&order=${order}&type=${type}&yearFrom=${yearFrom}&yearTo=${yearTo}&page=${page}&keyword=${keyword}`
    }),

    getGenresAndCountries: builder.query({
      query: () => `v2.2/films/filters`,
      transformResponse: response => ({
        ...response,
        genres: response.genres.filter(({genre}) => !excludeGenres.includes(genre))
      })
    }),

    getFilmDetail: builder.query({
      query: id => `v2.2/films/${id}`
    }),

    getSequelsAndPrequels: builder.query({
      query: id => `v2.1/films/${id}/sequels_and_prequels`,
      transformResponse: response => response.map(el => ({...el, kinopoiskId: el.filmdId}))
    }),

    getStaff: builder.query({
      query: id => `v1/staff?filmId=${id}`
    })

  }),
});

export const { useGetFilmsCollectionsQuery, 
               useGetFilmsQuery, 
               useGetGenresAndCountriesQuery,
               useGetFilmDetailQuery,
               useGetSequelsAndPrequelsQuery,
               useGetStaffQuery,
               } = kinopoiskApi;
