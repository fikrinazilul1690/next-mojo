import React from 'react';
import { RiShieldCheckLine } from 'react-icons/ri';
import { IoRibbonOutline } from 'react-icons/io5';
import { TbTruckReturn } from 'react-icons/tb';

type Icons = 'ribbon' | 'truck' | 'shield-check';

type Params = {
  Icon: Icons;
  title: string;
  body: string;
};

export default function Slogan({ Icon, title, body }: Params) {
  const icon = getIconFromName(Icon);
  return (
    <div className='w-4/6 sm:w-fit max-sm:text-center'>
      <div className='w-[90px] h-[90px] rounded-full border border-separate ml-0 my-auto max-sm:mx-auto flex items-center justify-center'>
        {icon}
      </div>
      <h2 className='text-xl font-bold'>{title}</h2>
      <p className='break-words sm:w-[225px] text-sm'>{body}</p>
    </div>
  );
}

const getIconFromName = (iconName: Icons) => {
  switch (iconName) {
    case 'ribbon':
      return <IoRibbonOutline size={80} />;
    case 'truck':
      return <TbTruckReturn size={80} />;
    case 'shield-check':
      return <RiShieldCheckLine size={80} />;
  }
};
