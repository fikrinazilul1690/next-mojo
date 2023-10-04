'use client';
import { Chip } from '@nextui-org/chip';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { AiOutlineHeart } from 'react-icons/ai';
import { GoDotFill } from 'react-icons/go';
import { formatIDR } from '@/lib/formatIDR';
import { useMemo } from 'react';

type Props = {
  product: Product;
  selectedVariant: Variant;
};

export default function ProductInformation({
  product,
  selectedVariant: { price, variant_name },
}: Props) {
  const productName = useMemo(
    () =>
      variant_name
        ? `${product.name} - (${variant_name.replace('_', ', ')})`
        : product.name,
    [product.name, variant_name]
  );
  return (
    <Card
      className='max-w-md max-xl:max-w-sm gap-5'
      shadow='none'
      radius='none'
    >
      <CardHeader className='p-0 flex-col items-start'>
        <h1 className='text-3xl font-bold'>{productName}</h1>
        <span>Category: {product.category}</span>
        <span className='font-bold text-lg'>{formatIDR(price)}</span>
      </CardHeader>
      <CardBody className='py-0 flex gap-5'>
        <div>
          <span className='font-bold'>Description:</span>
          <p>{product.description || 'no product description'}</p>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          <div className='lg:grid-cols-1'>
            <span className='font-bold'>Size:</span>
            <table>
              <tbody>
                <tr>
                  <th className='font-normal'>{`Length (${product.dimension.unit})`}</th>
                  <td>:</td>
                  <td>{product.dimension.length}</td>
                </tr>
                <tr>
                  <th className='font-normal'>{`Width (${product.dimension.unit})`}</th>
                  <td>:</td>
                  <td>{product.dimension.width}</td>
                </tr>
                <tr>
                  <th className='font-normal'>{`Height (${product.dimension.unit})`}</th>
                  <td>:</td>
                  <td>{product.dimension.height}</td>
                </tr>
                <tr>
                  <th className='font-normal'>{`Weight (${product.weight.unit})`}</th>
                  <td>:</td>
                  <td>{product.weight.value}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {product.selections && (
            <div className='lg:grid-cols-1 grid gap-2'>
              {product.selections.map(({ name, options }) => (
                <div key={name}>
                  <span className='font-bold'>
                    {name.replace(/^./, name[0].toUpperCase())}:
                  </span>
                  <div className='flex gap-2 flex-wrap'>
                    {options.map((option) => (
                      <Chip
                        key={option.value}
                        startContent={
                          name === 'color' &&
                          !!option.hex_code && (
                            <GoDotFill color={option.hex_code} />
                          )
                        }
                        radius='sm'
                        variant='solid'
                      >
                        {option.value}
                      </Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardBody>
      <CardFooter>
        <Button
          color='danger'
          className='hover:text-danger hover:bg-white border-1 font-semibold border-danger'
          variant='solid'
          startContent={<AiOutlineHeart size={24} />}
        >
          Add To Wishlist
        </Button>
      </CardFooter>
    </Card>
  );
}
