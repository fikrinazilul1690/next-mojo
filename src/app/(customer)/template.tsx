'use client';

import getAddresses from '@/lib/getAddresses';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useCheckout } from '../store/CheckoutContext';

export default function Template({ children }: { children: React.ReactNode }) {
  const checkout = useCheckout();
  const queryClient = useQueryClient();
  const address = checkout((state) => state.address);
  const setAddress = checkout((state) => state.setAddress);
  const { data: session } = useSession();
  const { data: res } = useQuery({
    queryKey: ['addresses', session?.accessToken],
    queryFn: async ({ signal }) => {
      const accessToken = session?.accessToken ?? '';
      const data = await getAddresses(accessToken, { signal });
      return data;
    },
    initialData: () => {
      return queryClient.getQueryData(['address']);
    },
    enabled: !!session?.accessToken,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (!!res?.data) {
      const defaultAddress = res.data.find((val) => val.is_primary === true);
      const currentAddress = res.data.find((val) => val.id === address?.id);
      if (!!currentAddress) {
        return;
      }
      if (!!defaultAddress) {
        setAddress(defaultAddress);
        return;
      }
    }
  }, [res, address, setAddress]);

  useEffect(() => {
    checkout.persist.rehydrate();
  }, [checkout.persist]);

  return <>{children}</>;
}
