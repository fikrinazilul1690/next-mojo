'use client';

import React from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { AiOutlineUser } from 'react-icons/ai';
import { useSession } from 'next-auth/react';

export default function SidebarLink() {
  const { data: session, status } = useSession({
    required: false,
    // onUnauthenticated() {
    //   redirect('/api/auth/signin?callbackUrl=/dashboard');
    // },
  });

  return (
    <div className='flex flex-row justify-start gap-2 items-center cursor-pointer mb-4'>
      <div className=' rounded-full p-2 bg-[#D2D2D2]'>
        {session?.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name!}
            width={35}
            height={35}
          />
        ) : (
          <AiOutlineUser size={35} color='#000' />
        )}
      </div>
      <p className='text-md'>{session?.user.name || 'User'}</p>
    </div>
  );
}
