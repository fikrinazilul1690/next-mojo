import Image from 'next/image';
import Link from 'next/link';

type Params = {
  imageUrl: string;
};

export default function ProductCard({ imageUrl }: Params) {
  return (
    <Link href='/' className='h-[372p]'>
      <div className='flex items-center bg-slate-50 h-[300px] my-3 relative'>
        <Image
          className='rounded-2xl object-cover transition duration-300 ease-in-out hover:scale-110'
          src={imageUrl}
          fill
          alt='product'
          sizes='305px'
          priority={false}
        />
      </div>
      <h4>Furniture 1</h4>
      <p>Rp. 1000.000</p>
    </Link>
  );
}
