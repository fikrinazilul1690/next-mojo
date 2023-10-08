'use client';

import { Card } from '@nextui-org/card';
import ProductImages from './ProductImages';
import ProductInformation from './ProductInformation';
import { ChangeEvent, useState } from 'react';
import ProductAction from './ProductAction';

type Props = {
  product: Product;
};

export default function DetailProduct({ product }: Props) {
  const initialState: Variant = product.variant.reduce((prev, curr) =>
    prev.price < curr.price ? prev : curr
  );
  const [variant, setVariant] = useState<Variant>(initialState);

  function onVariantChange(e: ChangeEvent<HTMLSelectElement>) {
    const item = product?.variant.find((val) => val.sku === e.target.value);
    if (!!item) {
      setVariant(item);
    }
  }

  return (
    <Card className='p-7 max-sm:p-3 rounded-lg my-24 lg:mx-auto mx-8 flex flex-row flex-wrap lg:max-w-7xl max-lg:gap-4 justify-start lg:justify-evenly bg-content1'>
      <section className='max-lg:mx-auto'>
        <ProductImages product={product} />
      </section>
      <section>
        <ProductInformation product={product} selectedVariant={variant} />
      </section>
      <section className='max-lg:w-full'>
        <ProductAction
          product={product}
          selectedVariant={variant}
          onVariantChange={onVariantChange}
        />
      </section>
    </Card>
  );
}
