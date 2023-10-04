'use client';
import { Suspense } from 'react';

import { useDisclosure } from '@nextui-org/react';
import SearchModal from './SearchModal';
import { Header } from './Header';

export default function Navbar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Header onOpen={onOpen} />
      <Suspense>
        <SearchModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </Suspense>
    </>
  );
}
