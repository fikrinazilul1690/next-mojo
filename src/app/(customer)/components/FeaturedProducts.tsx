'use client';
import ProductCard from './ProductCard';
import { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import { useQuery } from '@tanstack/react-query';
import getProducts from '@/lib/getProducts';
import ProductCardFallback from './ProductCardFallback';

type Props = {
  initialCategoriesRes: MojoResponse<Category[]>;
  initialProductsRes: MojoResponse<Product[]>;
};

export default function FeaturedProducts({
  initialCategoriesRes,
  initialProductsRes,
}: Props) {
  const [selected, setSelected] = useState<string>('');

  const categories = initialCategoriesRes.data;

  const { data: res, isLoading } = useQuery({
    queryKey: ['products', { featured: true, category: selected }],
    queryFn: ({ signal }) =>
      getProducts(
        {
          category: selected,
          limit: 6,
          offset: 0,
          featured: true,
        },
        { signal }
      ),
    initialData: () => {
      if (!!!selected) {
        return initialProductsRes;
      }
    },
  });

  return (
    <>
      <div className='mb-[43px] mt-[69px] flex justify-between items-center max-sm:gap-4 max-sm:mx-3'>
        <h3 className='text-xl font-bold'>Featured Products</h3>
        <CategoryFilter
          categories={categories}
          defaultValue=''
          labelDefaultValue='all'
          onValueChange={setSelected}
          currentValue={selected}
        />
      </div>
      <div className='gap-2 grid grid-cols-1 min-h-[320px] items-center sm:grid-cols-3 mx-3 sm:mx-auto'>
        {isLoading ? (
          [...Array(6)].map((_, key) => <ProductCardFallback key={key} />)
        ) : res?.data.length !== 0 ? (
          res?.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <h3 className='text-center col-span-full text-xl font-bold'>
            No Product
          </h3>
        )}
      </div>
    </>
  );
}
