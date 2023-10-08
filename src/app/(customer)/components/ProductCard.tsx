import Image from 'next/image';
// import { Image } from '@nextui-org/image';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Link } from '@nextui-org/link';
import { formatIDR } from '@/lib/formatIDR';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const image = product.images.find((image) => image.order === 0);
  return (
    <Card
      shadow='sm'
      className='max-sm:w-4/5 max-sm:m-auto'
      isPressable
      as={Link}
      href={`/products/${product.id}`}
    >
      <CardBody className='h-[300px] w-full relative overflow-visible p-0'>
        <Image
          fill
          alt={image?.name ?? 'undefined'}
          className='w-full object-cover rounded-lg'
          src={image?.url ?? ''}
          priority
        />
      </CardBody>
      <CardFooter className='text-small justify-between'>
        <p>{product.name}</p>
        <p className='text-default-500'>{formatIDR(product.min_price || 0)}</p>
      </CardFooter>
    </Card>
  );
}
