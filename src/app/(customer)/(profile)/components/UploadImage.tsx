'use client';

import uploadUserImage from '@/lib/uploadUserImage';
import { Avatar } from '@nextui-org/avatar';

import { BiImageAdd } from 'react-icons/bi';

type Props = {
  className: string;
};

export default function UploadImage(props: Props) {
  return (
    <div {...props}>
      <Avatar
        className='w-28 h-28 z-0'
        showFallback
        src='https://i.pravatar.cc/150?u=a04258114e29026708c'
        name='Achmad Nazilul Fikri'
        fallback={
          <BiImageAdd className='animate-pulse' size={50} color='#6A6A6A' />
        }
      />
      <input
        className='hidden'
        type='file'
        name='file'
        id='file'
        onChange={async (e) => {
          e.preventDefault();
          const res = await uploadUserImage(e.target.files![0], '');
          console.log(res.status);
        }}
      />
      <label
        className='text-md tracking-wide font-semibold cursor-pointer p-2 border rounded-lg'
        htmlFor='file'
      >
        Pilih Foto
      </label>
    </div>
  );
}
