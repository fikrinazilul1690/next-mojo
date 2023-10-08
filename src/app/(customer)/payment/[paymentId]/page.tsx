import { options } from '@/app/api/auth/[...nextauth]/options';
import { listBank } from '@/lib/bank';
import getDetailPayment from '@/lib/getDetailPayment';
import { Divider } from '@nextui-org/divider';
import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import { formatIDR } from '@/lib/formatIDR';
import { Button } from '@nextui-org/button';

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
    <main className='border max-w-3xl mx-auto rounded-lg mt-5'>
      <div className='py-10 px-7'>
        <h3 className='text-2xl font-semibold text-center'>
          Detail Pembayaran
        </h3>
        <section className='my-4'>
          <div className='flex justify-between'>
            <span className='text-lg font-bold'>Metode Pembayaran</span>
            <Image
              alt={detailPayment.bank}
              src={
                listBank.find((val) => val.code === detailPayment.bank)
                  ?.imageUrl ?? ''
              }
              width={120}
              height={100}
            />
          </div>
          <Divider className='my-2' />
        </section>
        <section className='my-4'>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Nomor Virtual Account</span>
              <span className='font-bold text-lg'>
                {detailPayment.va_number}
              </span>
            </div>
          </div>
          <Divider className='my-2' />
        </section>
        <section className='my-4'>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-2'>
              <span className='text-lg'>Total Pembayaran</span>
              <span className='font-bold text-lg'>
                {formatIDR(detailPayment.gross_amount)}
              </span>
            </div>
          </div>
          <Divider className='my-2' />
        </section>
        <section className='my-4'>
          <div className='flex gap-5 items-center'>
            <Button variant='bordered' fullWidth color='primary'>
              Cek Status Pembayaran
            </Button>
            <Button variant='solid' fullWidth color='primary'>
              Belanja Lagi
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
