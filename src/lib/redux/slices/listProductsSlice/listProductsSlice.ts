/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { filterProduct } from './thunks';

const initialState: Array<Product> = [];

export const listProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterProduct.fulfilled, (state, action) => {
        return action.payload.data;
      })
      .addCase(filterProduct.rejected, (state, action) => {
        return [];
      });
  },
});
