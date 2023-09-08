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
import { Input } from '@nextui-org/input';
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
import { Key, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { MdDashboardCustomize } from 'react-icons/md';
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Kbd,
} from '@nextui-org/react';

const menuItems = ['Home', 'Products', 'About Us', 'Log In'];

export default function Navbar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onAction(key: Key) {
    if (key === 'logout') {
      signOut();
      return;
    }
    router.push(`/${key}`);
  }
  return (
    <>
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
          <NavbarItem>
            <Link color='foreground' href='/'>
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color='foreground' href='/products'>
              Products
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color='foreground' href='/about-us'>
              About Us
            </Link>
          </NavbarItem>
        </NavbarContent>
        {status === 'loading' && (
          <NavbarContent key='skeleton' as='div' justify='end'>
            <Skeleton className='rounded-lg'>
              <div className='h-10 w-[330px] rounded-lg bg-secondary'></div>
            </Skeleton>
          </NavbarContent>
        )}
        {status === 'authenticated' && (
          <NavbarContent
            as='div'
            className={`items-center ${
              status === 'authenticated' ? '' : 'hidden'
            }`}
            justify='end'
          >
            <Button
              size='md'
              startContent={<LuSearch size={18} />}
              onClick={onOpen}
            >
              Type to search...
            </Button>
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
                  Carts
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
                    textValue='Carts'
                    key='carts'
                    startContent={<LuShoppingCart size={24} />}
                  >
                    Carts
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
          </NavbarContent>
        )}
        {status === 'unauthenticated' && (
          <NavbarContent
            key='anon-action'
            className={status === 'unauthenticated' ? '' : 'hidden'}
            justify='end'
          >
            <Button
              size='md'
              startContent={<LuSearch size={18} />}
              onClick={onOpen}
            >
              Type to search...
            </Button>
            <NavbarItem className='sm:flex hidden font-bold'>
              <Link color='foreground' href={`/login?callbackUrl=${pathname}`}>
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
          </NavbarContent>
        )}
        <NavbarMenu>
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
                  onValueChange={(val) => setSearch(val)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const current = new URLSearchParams();
                      if (pathname === '/products') {
                        searchParams.forEach((value, key) => {
                          current.append(key, value);
                        });
                      }
                      current.set('search', search);
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
    </>
  );
}
