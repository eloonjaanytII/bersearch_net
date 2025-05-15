import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title : '',
};

export const navbarTitleSlice = createSlice({
  name: 'navbarTitleSlice',
  initialState,
  reducers: {
    changeTitle: (state, action) => {
      state.title = action.payload;
    }
  },
});

export const {changeTitle} = navbarTitleSlice.actions
export default navbarTitleSlice.reducer;
