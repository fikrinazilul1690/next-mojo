'use client';

import React from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Skeleton, Spinner, cn } from '@nextui-org/react';
import { AiOutlineCheck } from 'react-icons/ai';
import { useCheckout } from '@/app/store/CheckoutContext';
// import useStore from '@/lib/hooks/useStore';

type Props = {
  address: CustomerAddress;
};

export default function AddressCard({ address }: Props) {
  const checkout = useCheckout();
  // const { data: selectedAddresss, !!selectedAddresss } = useStore(
  //   checkout,
  //   (state) => state.address
  // );
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
              (address.id === selectedAddresss?.id || !!!selectedAddresss) &&
              'bg-primary-50 border border-primary'
            }`
          ),
        ],
      }}
    >
      <CardBody>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col gap-1 w-3/4'>
            <Skeleton
              isLoaded={!!selectedAddresss}
              className='rounded-lg self-start w-fit'
            >
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
            </Skeleton>
            <Skeleton
              isLoaded={!!selectedAddresss}
              className='rounded-lg w-3/4'
            >
              <span className='font-bold'>{address.contact_name}</span>
            </Skeleton>
            <Skeleton
              isLoaded={!!selectedAddresss}
              className='rounded-lg w-3/5'
            >
              <span>{address.contact_phone}</span>
            </Skeleton>
            <Skeleton
              isLoaded={!!selectedAddresss}
              className='rounded-lg w-3/6'
            >
              <span>{address.address}</span>
            </Skeleton>
            <div className='flex gap-3'>
              <Skeleton isLoaded={!!selectedAddresss} className='rounded-lg'>
                <Button
                  color='primary'
                  className='inline p-0 text-primary bg-transparent'
                  variant='solid'
                  disableRipple
                >
                  Ubah Alamat
                </Button>
              </Skeleton>
              <Skeleton isLoaded={!!selectedAddresss} className='rounded-lg'>
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
              </Skeleton>
              <Skeleton isLoaded={!!selectedAddresss} className='rounded-lg'>
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
              </Skeleton>
            </div>
          </div>
          <Skeleton isLoaded={!!selectedAddresss} className='rounded-lg'>
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
          </Skeleton>
        </div>
      </CardBody>
    </Card>
  );
}
