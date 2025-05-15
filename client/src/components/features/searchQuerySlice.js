import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyword: '',
  results: []
};

export const searchQuerySlice = createSlice({
  name: 'searchQuerySlice',
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    resetSearch: (state) => {
      state.keyword = '';
      state.results = [];
    }
  },
});


export const { setKeyword, setResults, resetSearch } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;
