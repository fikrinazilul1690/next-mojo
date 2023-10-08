// import Image from 'next/image';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Skeleton } from '@nextui-org/skeleton';

export default function ProductCardFallback() {
  return (
    <Card shadow='sm' className='max-sm:w-3/4'>
      <CardBody className='overflow-visible p-0'>
        <Skeleton className='rounded-lg'>
          <div className='w-full object-cover h-[300px]'></div>
        </Skeleton>
      </CardBody>
      <CardFooter className='text-small justify-between'>
        <Skeleton className='rounded-md'>
          <div className='w-40 h-4'></div>
        </Skeleton>
      </CardFooter>
    </Card>
  );
}
