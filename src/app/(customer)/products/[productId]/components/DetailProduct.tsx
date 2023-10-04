'use client';

import { Card } from '@nextui-org/card';
import ProductImages from './ProductImages';
import ProductInformation from './ProductInformation';
import { ChangeEvent, useReducer } from 'react';
import ProductAction from './ProductAction';
import { useQuery } from '@tanstack/react-query';
import getProduct from '@/lib/getProduct';

type Props = {
  product: Product;
};

type SelectedState = Variant;
export type SelectedAction = {
  type: SelectedActionKind;
  payload: Variant;
};

enum SelectedActionKind {
  SetItem = 'SET_ITEM',
}

function reducer(state: SelectedState, action: SelectedAction) {
  const { type, payload } = action;
  switch (type) {
    case SelectedActionKind.SetItem:
      return payload;
    default:
      return state;
  }
}

export default function DetailProduct({ product: initialProduct }: Props) {
  const { data: product } = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const res = await getProduct(initialProduct.id);
      return res.data;
    },
    initialData: initialProduct,
  });

  const initialState: Variant = product.variant.reduce((prev, curr) =>
    prev.price < curr.price ? prev : curr
  );
  const [state, dispatch] = useReducer(reducer, initialState);

  function onVariantChange(e: ChangeEvent<HTMLSelectElement>) {
    const item = product.variant.find((val) => val.sku === e.target.value);
    if (!!item) {
      dispatch({
        type: SelectedActionKind.SetItem,
        payload: item,
      });
    }
  }

  return (
    <Card className='p-7 max-sm:p-3 rounded-lg my-24 lg:mx-auto mx-8 flex flex-row flex-wrap lg:max-w-7xl max-lg:gap-4 justify-start lg:justify-evenly bg-content1'>
      <section className='max-lg:mx-auto'>
        <ProductImages product={product} />
      </section>
      <section>
        <ProductInformation product={product} selectedVariant={state} />
      </section>
      <section className='max-lg:w-full'>
        <ProductAction
          product={product}
          selectedVariant={state}
          onVariantChange={onVariantChange}
        />
      </section>
    </Card>
  );
}
