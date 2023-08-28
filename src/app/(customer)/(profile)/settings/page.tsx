import UploadImage from '../components/UploadImage';
import { Input } from '@nextui-org/input';

export default function Settings() {
  return (
    <div className='flex flex-col gap-3 items-center justify-center'>
      <h3 className='text-xl font-semibold'>Edit Profile</h3>
      <UploadImage className='flex items-center gap-3 justify-center' />
      <form action='' className='flex flex-col w-full gap-3 items-center'>
        <Input
          variant='bordered'
          className='bg-transparent'
          label='Name'
          placeholder='Name'
          labelPlacement='outside'
        />
        <Input
          variant='bordered'
          className='bg-transparent'
          type='tel'
          label='Phone'
          placeholder='Phone'
          labelPlacement='outside'
        />
        <Input
          variant='bordered'
          className='bg-transparent'
          label='Gender'
          labelPlacement='outside'
          placeholder='Gender'
        />
        <Input
          variant='bordered'
          className='bg-transparent'
          label='Birthdate'
          placeholder='Birthdate'
          labelPlacement='outside'
          type='date'
        />
        <Input
          type='submit'
          size='lg'
          value='Simpan'
          className='w-unit-4xl'
          role='button'
          classNames={{
            input: 'font-bold',
            inputWrapper: '!bg-black !text-white !cursor-pointer',
          }}
        />
      </form>
    </div>
  );
}
