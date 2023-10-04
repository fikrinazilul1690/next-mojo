'use client';

import React from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { cn } from '@nextui-org/react';
import { AiOutlineCheck } from 'react-icons/ai';
import { useCheckout } from '@/app/store/CheckoutContext';

type Props = {
  address: CustomerAddress;
};

export default function AddressCard({ address }: Props) {
  const checkout = useCheckout();
  const selectedAddresss = checkout((state) => state.address);
  const setAddress = checkout((state) => state.setAddress);
  return (
    <Card
      shadow='sm'
      classNames={{
        base: [
          'w-3/4',
          cn(
            `${
              address.id === selectedAddresss?.id &&
              'bg-primary-50 border border-primary'
            }`
          ),
        ],
      }}
    >
      <CardBody>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col'>
            <div className='flex gap-3 items-center mb-3'>
              <span>{address.label ?? 'Rumah'}</span>
              {address.is_primary && (
                <Chip
                  className='text-white font-extrabold bg-slate-400'
                  radius='sm'
                >
                  Utama
                </Chip>
              )}
            </div>
            <span className='font-bold'>{address.contact_name}</span>
            <span>{address.contact_phone}</span>
            <span>{address.address}</span>
            <div className='flex gap-3'>
              <Button
                color='primary'
                className='inline p-0 text-primary bg-transparent'
                variant='solid'
                disableRipple
              >
                Ubah Alamat
              </Button>
              {!address.is_primary && (
                <Button
                  color='primary'
                  className='inline p-0 text-primary bg-transparent'
                  variant='solid'
                  disableRipple
                >
                  Jadikan Alamat Utama & Pilih
                </Button>
              )}
              {!address.is_primary && (
                <Button
                  color='danger'
                  className='inline p-0 text-danger bg-transparent'
                  variant='solid'
                  disableRipple
                >
                  Hapus
                </Button>
              )}
            </div>
          </div>
          {address.id === selectedAddresss?.id ? (
            <Button
              color='primary'
              isIconOnly
              className='text-primary bg-transparent'
              isDisabled
              variant='solid'
            >
              <AiOutlineCheck size={24} />
            </Button>
          ) : (
            <Button
              color='primary'
              onClick={() => setAddress(address)}
              variant='solid'
            >
              Pilih
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
