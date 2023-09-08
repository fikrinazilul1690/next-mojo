'use client';
import { Card, CardBody } from '@nextui-org/card';
// import { Image } from "@nextui-org/image";
import Image from 'next/image';

type Props = {
  key: string;
};

export default function ItemCard({ key }: Props) {
  return (
    <Card key={key} className='flex justify-between shadow-none p-1 m-1'>
      <div className='flex gap-3 items-center'>
        <div className='relative w-16 h-16'>
          <Image
            className='rounded-md object-cover'
            alt='nextui logo'
            src='/kursi.jpeg'
            fill
          />
        </div>
        <div className='flex flex-col'>
          <p className='text-small text-default-500'>Kategori</p>
          <p className='text-md font-bold'>Nama Produk</p>
        </div>
        <p className='font-semibold ml-auto'>Rp 1.000.000</p>
      </div>
    </Card>
  );
}
