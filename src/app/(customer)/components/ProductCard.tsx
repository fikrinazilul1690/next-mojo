// import Image from 'next/image';
import { Image } from '@nextui-org/image';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Link } from '@nextui-org/link';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Card shadow='sm' key={product.id} isPressable as={Link} href='#'>
      <CardBody className='overflow-visible p-0'>
        <Image
          shadow='none'
          radius='lg'
          width='100%'
          alt={product.images[0].name}
          className='w-full object-cover h-[300px]'
          src={product.images[0].url}
        />
      </CardBody>
      <CardFooter className='text-small justify-between'>
        <b>{product.name}</b>
        <p className='text-default-500'>
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(product.min_price || 0)}
        </p>
      </CardFooter>
    </Card>
  );
}
