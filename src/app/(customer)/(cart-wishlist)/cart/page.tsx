import getCart from '@/lib/getCart';
import TableCart from './components/TableCart';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export default async function Cart() {
  const session = await getServerSession(options);
  const searchParams = new URLSearchParams();
  if (!!!session) {
    searchParams.set('callbackUrl', '/cart');
    redirect(`/login?${searchParams}`);
  }
  const cartResponse = await getCart(session.accessToken);
  return <TableCart cart={cartResponse.data} />;
}
