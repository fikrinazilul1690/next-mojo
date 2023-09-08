/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { register } from './thunks';

type Register = {
  status: 'idle' | 'loading' | 'failed';
  name_err_msg?: string[];
  email_err_msg?: string[];
  phone_err_msg?: string[];
  password_err_msg?: string[];
} & RegisterRequest;

const initialState: Register = {
  status: 'failed',
  name: '',
  email: '',
  phone: '',
  password: '',
  confirm_password: '',
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirm_password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload?.code === 400) {
          state.name_err_msg = action.payload?.errors.name;
          state.email_err_msg = action.payload?.errors.email;
          state.phone_err_msg = action.payload?.errors.phone;
          state.password_err_msg = action.payload?.errors.password;
        }
      });
  },
});
