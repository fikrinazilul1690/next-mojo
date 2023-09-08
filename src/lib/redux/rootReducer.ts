import { registerSlice } from './slices/registerSlice';
import { loginSlice } from './slices/loginSlice';
import { listFeaturedProductsSlice } from './slices/listFeaturedProductsSlice';
export const reducer = {
  login: loginSlice.reducer,
  register: registerSlice.reducer,
  products: listFeaturedProductsSlice.reducer,
};
