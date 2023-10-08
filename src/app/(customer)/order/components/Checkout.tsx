'use client';

import { useCheckout } from '@/app/store/CheckoutContext';
import { formatIDR } from '@/lib/formatIDR';
// import useStore from '@/lib/hooks/useStore';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/react';
import React, { useMemo } from 'react';

export default function Checkout() {
  const checkout = useCheckout();
  // const { data: bank } = useStore(checkout, (state) => state.bank);
  const bank = checkout((state) => state.bank);
  const items = checkout((state) => state.items);
  // const { data: items } = useStore(checkout, (state) => state.items);
  const subTotal = useMemo(
    () =>
      items
        ?.map((item) => item.price * item.quantity)
        .reduce((prev, current) => prev + current, 0) ?? 0,
    [items]
  );
  const totalQty = useMemo(
    () =>
      items
        ?.map((item) => item.quantity)
        .reduce((prev, current) => prev + current, 0) ?? 0,
    [items]
  );
  const courierService = checkout((state) => state.courierService);
  const total = useMemo(
    () => subTotal + (courierService?.price ?? 0),
    [subTotal, courierService]
  );
  return (
    <div className='flex flex-col gap-5 items-center text-xl px-5'>
      <div className='flex justify-between max-sm:flex-col w-full'>
        <span>Sub Total:</span>
        <span>
          {!!subTotal
            ? formatIDR(subTotal, { maximumSignificantDigits: 3 })
            : '-'}
        </span>
      </div>
      <div className='flex justify-between max-sm:flex-col w-full'>
        <span>Shipping Cost:</span>
        <span>
          {!!courierService?.price
            ? formatIDR(courierService?.price, { maximumSignificantDigits: 3 })
            : '-'}
        </span>
      </div>
      <Divider className='my-2' />
      <div className='flex justify-between w-full font-bold'>
        <span>Total:</span>
        <span>
          {!!total ? formatIDR(total, { maximumSignificantDigits: 3 }) : '-'}
        </span>
      </div>
      <Button isDisabled={!!!courierService || items?.length === 0 || !!!bank}>
        Checkout
      </Button>
    </div>
  );
}
