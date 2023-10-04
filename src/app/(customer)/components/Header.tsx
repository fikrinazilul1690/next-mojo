'use client';
import {
  Navbar as NavbarUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown';
import { Link } from '@nextui-org/link';
import { Avatar } from '@nextui-org/avatar';
import { Skeleton } from '@nextui-org/skeleton';
import { Button } from '@nextui-org/button';
import { AiOutlineUser } from 'react-icons/ai';
import {
  LuHeart,
  LuSearch,
  LuShoppingCart,
  LuSettings,
  LuLogOut,
} from 'react-icons/lu';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { CgBell } from 'react-icons/cg';
import { memo, useState, type Key } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { MdDashboardCustomize } from 'react-icons/md';
import { cn } from '@nextui-org/react';

type Props = {
  onOpen: () => void;
};

const menuItems = ['Home', 'Products', 'About Us', 'Log In'];

export const Header = memo(function Header({ onOpen }: Props) {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = new URLSearchParams();
  searchParams.set('callbackUrl', pathname);

  function onAction(key: Key) {
    if (key === 'logout') {
      signOut();
      localStorage.clear();
      return;
    }
    router.push(`/${key}`);
  }
  return (
    <NavbarUI
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>
      <NavbarContent justify='start'>
        <NavbarBrand>
          <p className='font-bold text-center text-2xl'>
            Mojopahit
            <br />
            Furniture
          </p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent
        className='hidden sm:flex gap-4 text-xl font-bold'
        justify='center'
      >
        <NavbarItem isActive={pathname === '/'}>
          <Link color='foreground' href='/'>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname.startsWith('/products')}>
          <Link color='foreground' href='/products'>
            Products
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === '/about-us'}>
          <Link color='foreground' href='/settings'>
            About Us
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end' className='items-center'>
        <Button
          className='max-sm:hidden'
          size='md'
          startContent={<LuSearch size={18} />}
          onClick={onOpen}
        >
          Type to search...
        </Button>
        <Skeleton
          classNames={{
            base: [
              'h-2/3',
              cn(`${status === 'loading' && 'rounded-lg'}`),
              cn(`${status === 'loading' ? 'w-5/12' : ''}`),
              'flex items-center justify-end',
            ],
            content: ['flex justify-end gap-4 items-center p-2'],
          }}
          isLoaded={status !== 'loading'}
        >
          {status === 'authenticated' && (
            <>
              <Dropdown key='notif-action' placement='bottom-end'>
                <DropdownTrigger>
                  <Button radius='full' isIconOnly variant='light'>
                    <CgBell size={24} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label='Notification Actions' variant='flat'>
                  <DropdownItem
                    textValue='Settings'
                    key='1'
                    startContent={<LuSettings size={24} />}
                  >
                    Settings
                  </DropdownItem>
                  <DropdownItem
                    textValue='Settings'
                    key='2'
                    startContent={<LuShoppingCart size={24} />}
                  >
                    Cart
                  </DropdownItem>
                  <DropdownItem
                    textValue='Settings'
                    key='3'
                    startContent={<LuHeart size={24} />}
                  >
                    Wishlist
                  </DropdownItem>
                  <DropdownItem
                    textValue='Settings'
                    key='4'
                    startContent={<LiaShippingFastSolid size={24} />}
                  >
                    My Orders
                  </DropdownItem>
                  <DropdownItem
                    textValue='Settings'
                    key='5'
                    color='danger'
                    startContent={<LuLogOut size={24} />}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown key='user-action' placement='bottom-end'>
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as='button'
                    className='transition-transform'
                    color='default'
                    name={session?.user.name!}
                    size='sm'
                    src={session?.user.image || ''}
                  />
                </DropdownTrigger>
                {session?.user.role === 'customer' && (
                  <DropdownMenu
                    onAction={onAction}
                    aria-label='Profile Actions'
                    variant='flat'
                  >
                    <DropdownItem
                      className='h-14 gap-2'
                      textValue='info'
                      key='profile'
                      startContent=<AiOutlineUser size={24} />
                    >
                      <p className='font-semibold'>Signed in as</p>
                      <p className='font-semibold'>{session?.user.name}</p>
                    </DropdownItem>
                    <DropdownItem
                      textValue='Settings'
                      key='settings'
                      startContent={<LuSettings size={24} />}
                    >
                      Settings
                    </DropdownItem>
                    <DropdownItem
                      textValue='Cart'
                      key='cart'
                      startContent={<LuShoppingCart size={24} />}
                    >
                      Cart
                    </DropdownItem>
                    <DropdownItem
                      textValue='Wishlist'
                      key='wishlist'
                      startContent={<LuHeart size={24} />}
                    >
                      Wishlist
                    </DropdownItem>
                    <DropdownItem
                      textValue='My Orders'
                      key='my-orders'
                      startContent={<LiaShippingFastSolid size={24} />}
                    >
                      My Orders
                    </DropdownItem>
                    <DropdownItem
                      textValue='Logout'
                      key='logout'
                      color='danger'
                      startContent={<LuLogOut size={24} />}
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                )}
                {(session?.user.role === 'admin' ||
                  session?.user.role === 'owner') && (
                  <DropdownMenu
                    onAction={onAction}
                    aria-label='Profile Actions'
                    variant='flat'
                  >
                    <DropdownItem
                      textValue='Dashboard'
                      key='dashboard'
                      startContent={<MdDashboardCustomize size={24} />}
                    >
                      Dashboard
                    </DropdownItem>
                    <DropdownItem
                      textValue='Logout'
                      key='logout'
                      color='danger'
                      startContent={<LuLogOut size={24} />}
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </Dropdown>
            </>
          )}
          {status === 'unauthenticated' && (
            <>
              <NavbarItem className='sm:flex hidden font-bold'>
                <Link
                  color='foreground'
                  href={`/login${
                    pathname === '/register' ? '' : `?${searchParams}`
                  }`}
                  isDisabled={pathname.startsWith('/login')}
                >
                  Login
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Button
                  className='font-bold'
                  as={Link}
                  color='primary'
                  href='/register'
                  variant='solid'
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
        </Skeleton>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem key={'search-btn'}>
          <Button
            size='md'
            startContent={<LuSearch size={18} />}
            onClick={onOpen}
          >
            Type to search...
          </Button>
        </NavbarMenuItem>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className='w-full'
              color={
                index === 2
                  ? 'warning'
                  : index === menuItems.length - 1
                  ? 'danger'
                  : 'foreground'
              }
              href='#'
              size='lg'
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavbarUI>
  );
});
