/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { filterFeaturedProduct } from './thunks';

const initialState: Array<Product> = [];

export const listFeaturedProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterFeaturedProduct.fulfilled, (state, action) => {
        return action.payload.data;
      })
      .addCase(filterFeaturedProduct.rejected, (state, action) => {
        return [];
      });
  },
});
