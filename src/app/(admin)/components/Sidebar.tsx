import Link from 'next/link';
import { RxDashboard } from 'react-icons/rx';
import { FaShop } from 'react-icons/fa6';
import { TbTruckDelivery } from 'react-icons/tb';
import { PiSignOut, PiUserList } from 'react-icons/pi';
import SidebarLink from './SidebarLink';
import UserNavigation from './Avatar';

type Props = {
  className: string;
};

const listNavigation = [
  {
    to: '/dashboard',
    title: 'Dashboard',
    Icon: RxDashboard,
  },
  {
    to: '/dashboard/products',
    title: 'Product',
    Icon: FaShop,
  },
  {
    to: '/dashboard/orders',
    title: 'Order',
    Icon: TbTruckDelivery,
  },
  {
    to: '/dashboard/admin',
    title: 'Admin',
    Icon: PiUserList,
  },
  {
    to: '/api/auth/signout',
    title: 'Logout',
    Icon: PiSignOut,
  },
];

export default function Sidebar({ className }: Props) {
  return (
    <div
      className={`h-screen pt-[32px] px-[18px] text-center bg-[#222D32] ${className} text-[#D2D2D2] w-[314px]`}
    >
      <h1 className='text-2xl mb-[48px]'>
        <Link href='/'>
          Mojopahit
          <br />
          Furniture
        </Link>
      </h1>
      <UserNavigation />
      <div className='flex flex-col gap-2'>
        {listNavigation.map(({ Icon, to, title }, index) => (
          <SidebarLink Icon={Icon} title={title} to={to} key={index} />
        ))}
      </div>
    </div>
  );
}
