import Link from 'next/link';
import { FaBars } from 'react-icons/fa6';
import { LuHeart, LuSearch, LuShoppingCart } from 'react-icons/lu';
import { CgBell } from 'react-icons/cg';

export default function Navbar() {
  return (
    <header className='sticky top-0 bg-slate-50 z-10'>
      <nav className='prose prose-2xl mx-auto flex justify-between h-20 flex-row'>
        <h1 className='text-2xl font-bold grid place-content-center mb-2 md:mb-0'>
          <Link href='/' className='text-center'>
            Mojopahit
            <br />
            Furniture
          </Link>
        </h1>
        <div className='flex flex-row justify-center sm:justify-evenly align-middle my-auto gap-10 text-lg lg:text-xl'>
          <Link href='/'>Home</Link>
          <Link href='/'>Products</Link>
          <Link href='/'>About Us</Link>
        </div>
        <div className='flex flex-row gap-10'>
          {/* should use client component */}
          <div className='flex flex-row gap-4 my-auto'>
            <Link href='/'>
              <LuSearch size={25} />
            </Link>
            <Link href='/'>
              <LuShoppingCart size={25} />
            </Link>
            <Link href='/'>
              <LuHeart size={25} />
            </Link>
            <Link href='/'>
              <CgBell size={25} />
            </Link>
          </div>
          {/* should use client component */}
          <div className='my-auto'>
            <Link href='/'>
              <FaBars size={25} />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
