import Link from 'next/link';
import { FiFacebook, FiInstagram, FiMapPin, FiMail } from 'react-icons/fi';

import { FaWhatsapp } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className='text-center'>
      <span className='mt-12 bg-slate-500 h-[1px] block' />
      <div className='max-w-[1340px] mx-auto flex justify-between flex-row mt-5'>
        <div className='flex justify-between h-[200px] flex-col'>
          <h2 className='text-xl font-semibold'>MOJOPAHIT FURNITUR</h2>
          <p className='break-words w-96 text-sm'>
            Mojopahit Furniture adalah toko yang menyediakan solusi terbaik
            untuk kebutuhan furnitur Anda. Kami menghadirkan furnitur dengan
            desain yang elegan dan fungsional untuk memperindah rumah Anda
          </p>
          <div className='flex gap-3 justify-center items-center'>
            <Link href='/'>
              <FiFacebook size={30} />
            </Link>
            <Link href='/'>
              <FiInstagram size={30} />
            </Link>
          </div>
        </div>
        <div className='flex flex-col w-[350px] justify-between'>
          <h2 className='text-xl font-semibold'>HUBUNGI KAMI</h2>
          <div className='flex gap-2 justify-start items-center'>
            <FiMapPin size={20} />
            <Link href='/'>Jalan Ungaran Kabupaten Semarrang</Link>
          </div>
          <div className='flex gap-2 justify-start items-center'>
            <FaWhatsapp size={20} />
            <Link href='/'>024 - XXXXXXXXXXXX</Link>
          </div>
          <div className='flex gap-2 justify-start items-center'>
            <FiMail size={20} />
            <Link href='/'>xxxxxxxxxxxxx@xxxxx.xxx</Link>
          </div>
        </div>
      </div>
      <p className='mt-9 mb-3'>
        Copyright &copy; 2023 Mojopahit Furniture. All rights reserved.
      </p>
    </footer>
  );
}