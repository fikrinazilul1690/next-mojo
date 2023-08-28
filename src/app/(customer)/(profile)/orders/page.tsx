import OrderMenu from '../components/OrderMenu';

export default function Orders() {
  return (
    <div className='flex flex-col gap-3 items-center justify-center'>
      <h3 className='text-xl font-semibold'>Pesanan Saya</h3>
      <OrderMenu />
    </div>
  );
}
