'use client';

import ProductCard from './ProductCard';
import { useSelector, selectListFeaturedProducts } from '@/lib/redux';

export default function FeaturedProducts() {
  const products = useSelector(selectListFeaturedProducts);

  return (
    <div className='gap-2 grid grid-cols-1 items-center sm:grid-cols-3 mx-3 sm:mx-auto'>
      {products.length !== 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <h3 className='text-center col-span-full text-xl font-bold'>
          No Product
        </h3>
      )}
    </div>
  );
}
