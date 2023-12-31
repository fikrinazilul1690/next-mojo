import { formatIDR } from '@/lib/formatIDR';
import { Button } from '@nextui-org/react';
import { IoBagOutline } from 'react-icons/io5';
import React, { useMemo } from 'react';

type Props = {
  cart: CartItem[];
  onClick: () => void;
  isDisabled: boolean;
};

export default function CartCheckout({ cart, onClick, isDisabled }: Props) {
  const subTotal = useMemo(
    () =>
      cart
        .map((item) => item.price * item.quantity)
        .reduce((prev, current) => prev + current, 0),
    [cart]
  );
  return (
    <div className='flex flex-col gap-5 items-end'>
      <div className='flex justify-between w-full px-4 font-semibold'>
        <span>Total:</span>
        <span>{formatIDR(subTotal, { maximumSignificantDigits: 3 })}</span>
      </div>
      <Button
        isDisabled={isDisabled}
        color='primary'
        variant='solid'
        startContent={<IoBagOutline size={18} />}
        onClick={onClick}
      >
        Checkout
      </Button>
    </div>
  );
}
