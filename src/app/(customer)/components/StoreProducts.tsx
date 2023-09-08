'use client';
import { listFeaturedProductsSlice, useDispatch } from '@/lib/redux';
import { useRef } from 'react';

type Props = {
  products: Product[];
};

export default function StoreProducts({ products }: Props) {
  const initialized = useRef(false);
  const dispatch = useDispatch();
  if (!initialized.current) {
    dispatch(listFeaturedProductsSlice.actions.setProducts(products));
    initialized.current = true;
  }
  return null;
}
