import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  userId: null, 
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.isAuth = true;
      state.userId = action.payload;
    },
    login: (state, action) => {
      state.isAuth = true;
      state.userId = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.userId = null;
    }
  },
});

export const {setCredentials, login, logout} = authSlice.actions
export default authSlice.reducer;