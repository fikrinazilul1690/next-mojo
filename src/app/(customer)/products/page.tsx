import getProducts from '@/lib/getProducts';
import CategoryFilter from './components/CategoryFilter';
import PaginationComponent from './components/PaginationComponent';
import ProductCard from './components/ProductCard';
import { Suspense } from 'react';
import { Spinner } from '@nextui-org/spinner';

export default async function Products({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search = (searchParams.search as string) ?? '';
  const limit = !!searchParams?.limit
    ? parseInt(searchParams.limit as string)
    : 10;
  const customizable = !!searchParams.custom
    ? (searchParams.custom as string) === 'true'
    : undefined;
  const page = !!searchParams?.page ? parseInt(searchParams.page as string) : 1;
  const offset = (page - 1) * limit;
  const productsRes = await getProducts(
    {
      limit,
      offset,
      search,
      customizable,
    },
    {
      next: {
        tags: ['product'],
      },
    }
  );
  const listProducts = productsRes.data || [];
  const metadata = productsRes?.metadata!;
  // console.log(metadata);
  // console.log(productsRes);
  return (
    <main className='grid grid-cols-12 gap-y-4 gap-x-2'>
      <section className='col-start-2 col-end-5'>
        <div className='grid gap-5 sticky top-20 border border-black/10 p-7 bg-white rounded-lg'>
          <CategoryFilter />
        </div>
      </section>
      <section className='grid grid-flow-row gap-3 col-span-7 mt-5'>
        {listProducts.map((val) => (
          <ProductCard key={val.id} product={val} />
        ))}
        <Suspense
          fallback={<Spinner size='lg' label='Loading...' color='default' />}
        >
          <PaginationComponent metadata={metadata} className='mx-auto' />
        </Suspense>
      </section>
    </main>
  );
}
