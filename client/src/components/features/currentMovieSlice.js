import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: 1,
  genres: 1,
  order: 'NUM_VOTE',
  type: '',
  yearFrom: 1000,
  yearTo: 3000,
  page: 1,
};

export const currentMovieSlice = createSlice({
  name: 'currentMovieSlice',
  initialState,
  reducers: {
    setCountry: (state, action) => {state.countries = action.payload},
    setGenre: (state, action) => {state.genres = action.payload},
    setOrder: (state, action) => {state.order = action.payload},
    setYear: (state, action) => {
      state.yearFrom = action.payload.yearFrom;
      state.yearTo = action.payload.yearTo;
    },
    resetFilters: () => initialState
  },
});


export const { setCountry, setGenre, setYear, setOrder, resetFilters } = currentMovieSlice.actions;
export default currentMovieSlice.reducer;
