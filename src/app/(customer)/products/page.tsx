import CategoryFilter from './components/CategoryFilter';
import PaginationComponent from './components/PaginationComponent';
import ProductCard from './components/ProductCard';
import Search from './components/Search';

export default function Products() {
  return (
    <main className='grid grid-cols-12 gap-y-4 gap-x-2'>
      <Search className='col-span-12 mx-auto max-w-md mt-5 z-0' />
      <section className='col-start-2 col-end-5'>
        <div className='grid gap-5 sticky top-36 border border-black/10 p-7 bg-white rounded-lg'>
          <CategoryFilter />
        </div>
      </section>
      <section className='grid grid-flow-row gap-3 col-span-7'>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <PaginationComponent className='mx-auto' />
      </section>
    </main>
  );
}
