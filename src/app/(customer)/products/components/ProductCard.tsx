import Image from 'next/image';

import { Card, CardBody } from '@nextui-org/card';
import { Link } from '@nextui-org/link';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Card
      as={Link}
      href='#'
      isPressable
      isBlurred
      className='border-none bg-background/60 dark:bg-default-100/50'
      shadow='sm'
    >
      <CardBody>
        <div className='flex gap-6 md:gap-4 items-center justify-start'>
          <div>
            <div className='h-[200px] w-[200px] relative'>
              <Image
                alt={product.images[0].name}
                fill
                className='object-cover rounded-md'
                src={product.images[0].url}
              />
            </div>
          </div>

          <div className='flex-col flex justify-between items-start'>
            <div className='flex flex-col gap-0'>
              <h1 className='font-semibold text-large text-foreground/90'>
                {product.name}
              </h1>
              <p className='text-small text-foreground/80'>
                {product.category}
              </p>
              <h1 className='text-medium font-medium mt-2'>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(product.min_price || 0)}
              </h1>
            </div>
            <p className='overflow-hidden'>
              {product.description || 'Product Description'}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
