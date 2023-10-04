'use client';
import { formatIDR } from '@/lib/formatIDR';
import { Card } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import Image from 'next/image';

type Props = {
  item: CheckoutItem;
};

export default function ItemCard({ item }: Props) {
  return (
    <Card className='flex justify-between shadow-none p-1 m-1'>
      <div className='flex gap-3 items-center'>
        <div className='relative w-16 h-16'>
          <Image
            className='rounded-md object-cover'
            alt='nextui logo'
            src={item.image}
            fill
          />
        </div>
        <div className='flex flex-col'>
          <p className='text-md font-bold'>{item.name}</p>
          <Chip
            color='default'
            radius='sm'
            size='sm'
            className='text-xs'
            variant='flat'
          >
            {item.sku}
          </Chip>
          <p className='text-sm'>qty: {item.quantity}</p>
        </div>
        <p className='font-semibold ml-auto'>
          {formatIDR(item.price, { maximumSignificantDigits: 3 })}
        </p>
      </div>
    </Card>
  );
}
