import { options } from '@/app/api/auth/[...nextauth]/options';
import getAddresses from '@/lib/getAddresses';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import AddressCard from './components/AddressCard';

export const dynamic = 'force-dynamic';

export default async function Addresses() {
  const session = await getServerSession(options);
  const searchParams = new URLSearchParams();
  if (!!!session) {
    searchParams.set('callbackUrl', '/addresses');
    redirect(`/login?${searchParams}`);
  }
  const addressRes = await getAddresses(session.accessToken, {
    tags: ['address'],
  });
  return (
    <div className='flex flex-col gap-3 items-center justify-center'>
      <h3 className='text-xl font-semibold'>List Alamat</h3>
      {addressRes.data.map((address) => (
        <AddressCard key={address.id} address={address} />
      ))}
    </div>
  );
}
