'use client';

import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import { useCheckout } from '@/app/store/CheckoutContext';
// import useStore from '@/lib/hooks/useStore';

export default function ListItems() {
  const checkout = useCheckout();
  // const { data: items, isLoading } = useStore(checkout, (state) => state.items);
  const items = checkout((state) => state.items);

  if (!!!items) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      {items?.map((item) => (
        <ItemCard key={item.sku} item={item} />
      ))}
    </>
  );
}
