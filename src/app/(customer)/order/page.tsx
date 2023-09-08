import { Divider } from '@nextui-org/divider';
import { Button } from '@nextui-org/button';
import AddressCard from '../components/AddressCard';
import ItemCard from '../components/ItemCard';
import { IoIosArrowForward } from 'react-icons/io';

export default function Order() {
  return (
    <div className='border py-3 px-7 max-w-3xl mx-auto mt-5 rounded-lg'>
      <h3 className='text-2xl font-semibold text-center'>Detail Pesanan</h3>
      <section className='my-4'>
        <h4 className='text-xl font-semibold'>Alamat</h4>
        <Divider className='my-2' />
        <AddressCard icon={<IoIosArrowForward />} />
      </section>
      <section className='my-4'>
        <h4 className='text-xl font-semibold'>Produk</h4>
        <Divider className='my-2' />
        <ItemCard key='1' />
        <ItemCard key='2' />
        <ItemCard key='3' />
      </section>
      <section className='my-4'>
        <h4 className='text-xl font-semibold'>Pengiriman</h4>
        <Divider className='my-2' />
        <Button
          className='w-full justify-between'
          size='lg'
          variant='light'
          endContent={<IoIosArrowForward />}
        >
          Pilih Pengiriman
        </Button>
      </section>
      <section className='my-4'>
        <h4 className='text-xl font-semibold'>Cara Pembayaran</h4>
        <Divider className='my-2' />
        <Button
          className='w-full justify-between'
          size='lg'
          variant='light'
          endContent={<IoIosArrowForward />}
        >
          Pilih Bank
        </Button>
      </section>
    </div>
  );
}
