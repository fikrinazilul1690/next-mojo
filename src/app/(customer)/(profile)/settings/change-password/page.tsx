import { Input } from '@nextui-org/input';

export default function ChangePassword() {
  return (
    <div className='flex flex-col gap-3 items-center justify-center'>
      <h3 className='text-xl font-semibold'>Ganti Kata Sandi</h3>
      <form action='' className='flex flex-col w-full gap-3 items-center'>
        <Input
          label='Password'
          variant='bordered'
          labelPlacement='outside'
          placeholder='Enter your password'
          type='password'
          className='max-w-xs'
        />
        <Input
          label='Confirm Password'
          variant='bordered'
          labelPlacement='outside'
          placeholder='Enter your password'
          type='password'
          className='max-w-xs'
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
