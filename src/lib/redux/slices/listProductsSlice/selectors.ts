import type { ReduxState } from '@/lib/redux';

export const selectListProducts = (state: ReduxState) => state.products;
