import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';

type Props = {
  Icon: IconType;
  title: string;
  to: string;
};

export default function SidebarLink({ Icon, to, title }: Props) {
  const color = title.toLowerCase() !== 'logout' ? '#000' : '#FF0000';
  const bgColor =
    title.toLowerCase() !== 'logout' ? 'bg-[#D2D2D2]' : 'bg-[#fa9191]';
  return (
    <Link href={to}>
      <div className='flex flex-row justify-start gap-2 items-center'>
        <div className={`${bgColor} rounded-md p-2`}>
          <Icon size={35} color={color} />
        </div>
        <p className='text-xl'>{title}</p>
      </div>
    </Link>
  );
}
