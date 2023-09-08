import type { ReduxState } from '@/lib/redux';

export const selectLoginRequest = (state: ReduxState) => state.login;
