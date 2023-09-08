import type { ReduxState } from '@/lib/redux';

export const selectListFeaturedProducts = (state: ReduxState) => state.products;
