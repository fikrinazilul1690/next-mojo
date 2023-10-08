import getProducts from '@/lib/getProducts';
import getProduct from '@/lib/getProduct';
import { notFound } from 'next/navigation';
import DetailProduct from './components/DetailProduct';

export default async function DetailProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const productId = Number(params.productId);
  if (!productId) notFound();
  const product = await getProduct(productId, {
    next: {
      tags: ['product'],
    },
  });
  if (!product) notFound();
  return (
    <main>
      <DetailProduct product={product} />
    </main>
  );
}

export async function generateStaticParams() {
  const { data } = await getProducts();

  return data.map((product) => ({
    productId: product.id.toString(),
  }));
}
