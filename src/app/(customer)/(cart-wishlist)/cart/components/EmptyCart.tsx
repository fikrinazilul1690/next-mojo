import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import React from 'react';

export default function EmptyCart() {
  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <h1 className='text-3xl'>Your Cart is Empty</h1>
      <Button as={Link} href='/products' color='primary' variant='solid'>
        Shop Now
      </Button>
    </div>
  );
}
