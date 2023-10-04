import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { AiFillEyeInvisible } from 'react-icons/ai';

type Props = {
  className: string;
};

export default function LoginFormFallback(props: Props) {
  return (
    <div className='flex flex-col gap-3 justify-center'>
      <form {...props}>
        <Input
          isDisabled
          isRequired
          type='email'
          name='email'
          label='Email'
          variant='bordered'
          labelPlacement='outside'
          placeholder='Enter your email'
          color='default'
        />
        <Input
          isDisabled
          isRequired
          label='Password'
          name='password'
          variant='bordered'
          labelPlacement='outside'
          placeholder='Enter your password'
          endContent={
            <button className='focus:outline-none' type='button'>
              <AiFillEyeInvisible className='text-2xl text-default-400 pointer-events-none' />
            </button>
          }
          type='password'
        />
        <Button type='submit' isDisabled color='default' className='font-bold'>
          Masuk
        </Button>
      </form>
    </div>
  );
}
