'use client';
import { decrypt, encrypt } from '@/lib/crypto';
import { useState, createContext, useContext } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';

type Bank = 'bca' | 'bni' | 'permata' | 'bri';

type State = {
  courierService: Pricing | null;
  address: CustomerAddress | null;
  bank: Bank | '';
  items: Array<CheckoutItem>;
};

type Action = {
  setItems: (items: State['items']) => void;
  reset: () => void;
  setCourier: (courierService: Pricing) => void;
  setAddress: (address: CustomerAddress) => void;
  setBank: (bank: Bank) => void;
  resetCourier: () => void;
  resetAddress: () => void;
};

const initialState: State = {
  items: [],
  courierService: null,
  address: null,
  bank: '',
};

// const storage: StateStorage = {
//   getItem: (name: string) => {
//     return decrypt(localStorage.getItem(name) as string);
//   },
//   setItem: (name: string, value: string) => {
//     localStorage.setItem(name, encrypt(value));
//   },
//   removeItem: async (name: string) => {
//     return localStorage.removeItem(name);
//   },
// };

// the store itself does not need any change
export const createStore = () =>
  create<State & Action>()(
    persist(
      (set, get) => ({
        ...initialState,
        setItems: (items) =>
          set(() => ({
            items: items,
          })),
        reset: () => set(() => initialState),
        setCourier: (courierService) =>
          set(() => ({
            courierService,
          })),
        resetCourier: () =>
          set(() => ({
            courierService: null,
          })),
        resetAddress: () =>
          set(() => ({
            address: null,
          })),
        setAddress: (address) => {
          set(() => ({
            address,
          }));
          get().resetCourier();
        },
        setBank: (bank) =>
          set(() => ({
            bank,
          })),
      }),
      {
        name: 'checkout-data',
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) => !['courierService'].includes(key)
            )
          ),
      }
    )
  );

const CheckoutContext = createContext<ReturnType<typeof createStore> | null>(
  null
);

export const useCheckout = () => {
  if (!CheckoutContext)
    throw new Error('useCheckout must be used within a CheckoutProvider');
  return useContext(CheckoutContext)!;
};

const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [store] = useState(() => createStore());
  return (
    <CheckoutContext.Provider value={store}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
