import { Divider } from '@nextui-org/divider';
import AddressCard from './components/AddressCard';
import { IoIosArrowForward } from 'react-icons/io';
import BankCard from './components/BankCard';
import ListItems from './components/ListItems';
import ShippingCard from './components/ShippingCard';
import Checkout from './components/Checkout';

export default async function Order() {
  return (
    <main className='border py-3 px-7 max-w-3xl mx-auto mt-5 rounded-lg'>
      <h3 className='text-2xl font-semibold text-center'>Detail Pesanan</h3>
      <section className='my-4'>
        <h4 className='text-xl font-semibold'>Alamat</h4>
        <Divider className='my-2' />
        <AddressCard icon={<IoIosArrowForward />} />
      </section>
      <section className='my-4'>
        <h4 className='text-xl font-semibold'>Produk</h4>
        <Divider className='my-2' />
        <ListItems />
      </section>
      <section className='my-4'>
        <h4 className='text-xl font-semibold'>Pengiriman</h4>
        <Divider className='my-2' />
        <ShippingCard icon={<IoIosArrowForward />} />
      </section>
      <section className='my-4'>
        <h4 className='text-xl font-semibold'>Cara Pembayaran</h4>
        <Divider className='my-2' />
        <BankCard icon={<IoIosArrowForward />} />
      </section>
      <section className='my-4'>
        <h4 className='text-xl font-semibold'>Total Belanja</h4>
        <Divider className='my-2' />
        <Checkout />
      </section>
    </main>
  );
}
