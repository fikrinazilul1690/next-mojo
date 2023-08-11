import Image from 'next/image';
import Link from 'next/link';
import ProductCard from './components/ProductCard';
import Slogan from './components/Slogan';

export default function Home() {
  return (
    <main className='mx-auto relative'>
      <Image
        src='/cover.png'
        alt='bg'
        width={2880}
        height={1920}
        sizes='95.56vw'
        priority
      />
      <div className='max-w-[980px] mx-auto'>
        <div className='mb-[43px] mt-[69px]'>Feautured Product</div>
        <div className='grid grid-cols-3 gap-[32px] mx-auto'>
          <ProductCard imageUrl='/kursi.jpeg' />
          <ProductCard imageUrl='/cover.jpeg' />
          <ProductCard imageUrl='/kursi.jpeg' />
          <ProductCard imageUrl='/cover.jpeg' />
          <ProductCard imageUrl='/kursi.jpeg' />
          <ProductCard imageUrl='/cover.jpeg' />
        </div>
        <div className='h-[314px] mt-[98px] mb-[69px] flex flex-row justify-between items-center'>
          <Slogan
            Icon='ribbon'
            title='Best Quality Product'
            body='Produk unggulan dengan standar kualitas tertinggi untuk pengalaman yang terbaik.'
          />
          <Slogan
            Icon='truck'
            title='90 Days Return'
            body='Nikmati pengalaman luar biasa dengan jaminan pengembalian selama 90 hari.'
          />
          <Slogan
            Icon='shield-check'
            title='Secure Payment'
            body='Produk kami menghadirkan kepercayaan dan kenyamanan dalam bertransaksi.'
          />
        </div>
        <div className='mb-[43px] mt-[69px]'>Product</div>
        <div className='grid grid-cols-3 gap-[32px] mb-[98px] mx-auto'>
          <ProductCard imageUrl='/kursi.jpeg' />
          <ProductCard imageUrl='/cover.jpeg' />
          <ProductCard imageUrl='/kursi.jpeg' />
          <ProductCard imageUrl='/cover.jpeg' />
          <ProductCard imageUrl='/kursi.jpeg' />
          <ProductCard imageUrl='/cover.jpeg' />
        </div>
        <Link href='/'>
          <div className='rounded-xl h-[331px] bg-gradient-to-r from-[#326373] from-0% to-[#11B1E3] to-100% grid grid-rows-4 grid-flow-col hover:from-[#11B1E3] hover:from-0% hover:to-[#326373] hover:to-100%'>
            <h1 className='text-[28px] text-white text-center pt-[30px] col-span-2 font-bold'>
              &quot;Your Imagination, Our Creation: Unlocking Custom
              Wonders!&quot;
            </h1>
            <p className='text-white text-center text-xl col-span-2 mt-[41px] mb-[60px] ml-[90px] mr-24'>
              Ekspresikan diri Anda dengan produk custom kami, menciptakan
              hadiah tak terlupakan dan pengalaman yang istimewa.
            </p>
            <p className='text-white text-center text-xl row-start-4 col-start-1 col-end-3 font-semibold'>
              Custom Produk
            </p>
            <div className='row-span-4 mt-12 mr-5'>
              <Image
                src='/custom.png'
                width={298}
                height={240}
                alt='product'
                priority={false}
              />
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
