import { options } from '@/app/api/auth/[...nextauth]/options';
import { listBank } from '@/lib/bank';
import getDetailPayment from '@/lib/getDetailPayment';
import { Divider } from '@nextui-org/divider';
import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import Checkout from '../../order/components/Checkout';
import Image from 'next/image';

export default async function DetailPayment({
  params,
}: {
  params: { paymentId: string };
}) {
  const session = await getServerSession(options);
  if (!!!session) {
    redirect(`/login`);
  }

  const detailPayment = await getDetailPayment(
    session.accessToken ?? '',
    params.paymentId
  );
  if (!!!detailPayment) notFound();
  return (
    <main className='border py-3 px-7 max-w-3xl mx-auto mt-5 rounded-lg'>
      <h3 className='text-2xl font-semibold text-center'>Detail Pembayaran</h3>
      <section className='my-4'>
        <div className='flex justify-between'>
          <span className='text-lg font-bold'>Metode Pembayaran</span>
          <Image
            alt={detailPayment.bank}
            src={
              listBank.find((val) => val.code === detailPayment.bank)
                ?.imageUrl ?? ''
            }
            width={60}
          />
        </div>
        <Divider className='my-2' />
      </section>
      <section className='my-4'>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-2'>
            <span className='text-lg'>Nomor Virtual Account</span>
            <span className='font-bold text-lg'>{detailPayment.va_number}</span>
          </div>
          <Image
            alt={detailPayment.bank}
            src={
              listBank.find((val) => val.code === detailPayment.bank)
                ?.imageUrl ?? ''
            }
            width={60}
          />
        </div>
        <Divider className='my-2' />
      </section>
      <section className='my-4'>
        <h4 className='text-xl font-semibold'>Pengiriman</h4>
        <Divider className='my-2' />
      </section>
      <section className='my-4'>
        <h4 className='text-xl font-semibold'>Total Belanja</h4>
        <Divider className='my-2' />
        <Checkout />
      </section>
    </main>
  );
}
