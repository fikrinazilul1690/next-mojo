'use client';

import Image from 'next/image';

import { Card, CardBody, Link } from '@nextui-org/react';

export default function ProductCard() {
  return (
    <Card
      isBlurred
      className='border-none bg-background/60 dark:bg-default-100/50'
      shadow='sm'
    >
      <CardBody>
        <div className='flex gap-6 md:gap-4 items-center justify-start'>
          <div>
            <div className='h-[200px] w-[200px] relative'>
              <Image
                alt='Album cover'
                fill
                className='object-cover rounded-md'
                src='/kursi.jpeg'
              />
            </div>
          </div>

          <div className='flex flex-col justify-between h-[200px] w-full'>
            <div className='flex-col flex justify-between items-start'>
              <div className='flex flex-col gap-0'>
                <h1 className='font-semibold text-large text-foreground/90'>
                  Produk 1
                </h1>
                <p className='text-small text-foreground/80'>Category</p>
                <h1 className='text-medium font-medium mt-2'>Rp. 1.000.000</h1>
              </div>
              <p className='overflow-hidden'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                deleniti eius nihil optio expedita itaque adipisci repudiandae
                temporibus sit quae error laboriosam, possimus impedit incidunt
                aliquam facilis voluptatem commodi nemo.
              </p>
            </div>
            <Link
              showAnchorIcon
              href={'/'}
              className='text-black font-semibold'
            >
              Lihat Detail Produk
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
