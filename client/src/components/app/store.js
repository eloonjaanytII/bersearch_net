import { configureStore } from '@reduxjs/toolkit';
import currentMovieReducer from '../features/currentMovieSlice';
import navbarTitleReducer from '../features/navbarTitleSlice';
import searchQueryReducer from '../features/searchQuerySlice'
import authSliceReducer from '../features/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { kinopoiskApi } from '../services/kinopoisk';
import { authApi } from '../services/auth';
import { reviewApi } from '../services/review';

export const store = configureStore({
  reducer: {
    currentMovie: currentMovieReducer,
    navbarTitle: navbarTitleReducer,
    searchQuery: searchQueryReducer,
    authSlice: authSliceReducer,
    [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,

  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(kinopoiskApi.middleware).concat(authApi.middleware).concat(reviewApi.middleware),
});

setupListeners(store.dispatch);
