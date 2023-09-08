/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type LoginRequest = {
  email: string;
  password: string;
};

const initialState: LoginRequest = {
  email: '',
  password: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});
