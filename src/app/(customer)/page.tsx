import Image from 'next/image';
import { Link } from '@nextui-org/link';
import Slogan from './components/Slogan';
import getProducts from '@/lib/getProducts';
import FeaturedProducts from './components/FeaturedProducts';
import getCategoreis from '@/lib/getCategories';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';

export default async function Home() {
  const categoriesRes = await getCategoreis({ tags: ['category'] });
  const productsRes = await getProducts({
    limit: 6,
    offset: 0,
    featured: true,
  });
  return (
    <>
      <main className='mx-auto relative'>
        <div className='sm:h-[60vh] h-[30vh] relative'>
          <Image
            className='object-contain'
            src='/cover.png'
            alt='bg'
            fill
            priority
          />
        </div>
        <div className='max-w-[980px] mx-auto'>
          <FeaturedProducts
            initialProductsRes={productsRes}
            initialCategoriesRes={categoriesRes}
          />
          <div className='h-fit sm:h-[314px] mt-5 mb-3 flex flex-col sm:flex-row sm:justify-between justify-center items-center'>
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
          <Card
            radius='lg'
            className='grid sm:grid-cols-4 max-sm:mx-2 sm:px-14 sm:grid-rows-3 items-center justify-center bg-gradient-to-r from-[#326373] from-0% to-[#11B1E3] to-100% hover:from-[#11B1E3] hover:from-0% hover:to-[#326373] hover:to-100%'
            isHoverable
            isPressable
            as={Link}
            href={'/products?custom=true'}
          >
            <CardHeader className='sm:col-span-full row-span-1 justify-center'>
              <h1 className='text-[28px] text-white font-bold text-center leading-10'>
                &quot;Your Imagination, Our Creation: Unlocking Custom
                Wonders!&quot;
              </h1>
            </CardHeader>
            <CardBody className='sm:row-span-2 h-full sm:col-span-3 justify-start gap-7'>
              <p className='text-white text-center text-xl'>
                Ekspresikan diri Anda dengan produk custom kami, menciptakan
                hadiah tak terlupakan dan pengalaman yang istimewa.
              </p>
              <p className='text-white text-center text-xl font-semibold'>
                Custom Produk
              </p>
            </CardBody>
            <CardFooter className='sm:col-start-4 sm:col-end-5 sm:row-start-2 sm:row-end-4 justify-center'>
              <Image
                src='/custom.png'
                width={298}
                height={240}
                alt='product'
                priority={false}
              />
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
}
