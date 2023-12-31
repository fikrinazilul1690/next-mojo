'use client';
import React, { useRef } from 'react';
import { Input } from '@nextui-org/input';
import { LuSearch } from 'react-icons/lu';
import { Modal, ModalContent, ModalBody } from '@nextui-org/modal';
import { Kbd } from '@nextui-org/react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

export default function SearchModal({ isOpen, onOpenChange }: Props) {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <Modal
      isOpen={isOpen}
      backdrop='blur'
      placement='top'
      onOpenChange={onOpenChange}
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className='p-0 flex-row bg-default-200/50 gap-0 items-center'>
              <Input
                autoFocus
                isClearable
                ref={searchRef}
                label='Search'
                radius='lg'
                classNames={{
                  label: 'text-black/50 dark:text-white/90',
                  input: [
                    'bg-transparent',
                    'text-black/90 dark:text-white/90',
                    'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                  ],
                  innerWrapper: 'bg-transparent',
                  inputWrapper: [
                    'shadow-xl',
                    'bg-default-200/50',
                    'dark:bg-default/60',
                    'backdrop-blur-xl',
                    'backdrop-saturate-200',
                    'hover:bg-default-200/70',
                    'dark:hover:bg-default/70',
                    'group-data-[focused=true]:bg-default-200/50',
                    'dark:group-data-[focused=true]:bg-default/60',
                    '!ring-transparent',
                    '!ring-offset-0',
                    '!cursor-text',
                  ],
                }}
                size='lg'
                placeholder='Type to search...'
                startContent={<LuSearch size={18} />}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const current = new URLSearchParams();
                    if (pathname === '/products') {
                      searchParams.forEach((value, key) => {
                        current.append(key, value);
                      });
                    }
                    if (!!searchRef.current)
                      current.set('search', searchRef.current?.value ?? '');
                    router.push('/products?' + current);
                    onClose();
                  }
                  if (e.key == 'Escape') {
                    onClose();
                  }
                }}
              />
              <div className='cursor-pointer' onClick={onClose}>
                <Kbd className='mx-3 bg-default-700 text-white'>Esc</Kbd>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
