'use client';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import {
  loginSlice,
  useSelector,
  useDispatch,
  selectLoginRequest,
} from '@/lib/redux';
import { useMemo, useState } from 'react';
import {
  AiFillEyeInvisible,
  AiOutlineCloseCircle,
  AiFillEye,
} from 'react-icons/ai';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  className: string;
};

import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { data } from 'autoprefixer';

export default function LoginForm(props: Props) {
  const { status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const login = useSelector(selectLoginRequest);
  const searchParams = useSearchParams();
  const callback = searchParams.get('callbackUrl');

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string | undefined>(undefined);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (value: string) =>
    value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  const validationState = useMemo(() => {
    if (login.email === '') return undefined;

    return validateEmail(login.email) ? 'valid' : 'invalid';
  }, [login.email]);

  return (
    <div className='flex flex-col gap-3 justify-center'>
      {!!errMsg && (
        <Card className='bg-[#FAA0BF] flex flex-row items-center'>
          <CardBody>
            <p>{errMsg}</p>
          </CardBody>
          <Button
            isIconOnly
            variant='light'
            className='m-0'
            onClick={() => setErrMsg(undefined)}
          >
            <AiOutlineCloseCircle size={18} />
          </Button>
        </Card>
      )}
      <form
        {...props}
        onSubmit={(e) => {
          e.preventDefault();
          setIsLoading(true);
          signIn('credentials', {
            email: login.email,
            password: login.password,
            redirect: false,
          }).then((res) => {
            console.log('res:', res);
            if (res?.error === null) {
              router.push(callback || '/');
            } else {
              if (res?.error) {
                const data = JSON.parse(res.error) as {
                  code: number;
                  status: string;
                  errors: any;
                };
                if (data.errors?.message && data.code === 401) {
                  setErrMsg('wrong email or password');
                } else {
                  setErrMsg('something went wrong');
                }
              }
            }
            setIsLoading(false);
          });
        }}
      >
        <Input
          isRequired
          type='email'
          label='Email'
          variant='bordered'
          labelPlacement='outside'
          placeholder='Enter your email'
          color={validationState === 'invalid' ? 'danger' : 'default'}
          errorMessage={
            validationState === 'invalid' && 'Please enter a valid email'
          }
          validationState={validationState}
          onChange={(e) =>
            dispatch(loginSlice.actions.setEmail(e.target.value))
          }
        />
        <Input
          isRequired
          label='Password'
          variant='bordered'
          labelPlacement='outside'
          placeholder='Enter your password'
          endContent={
            <button
              className='focus:outline-none'
              type='button'
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <AiFillEyeInvisible className='text-2xl text-default-400 pointer-events-none' />
              ) : (
                <AiFillEye className='text-2xl text-default-400 pointer-events-none' />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
          onChange={(e) =>
            dispatch(loginSlice.actions.setPassword(e.target.value))
          }
        />
        <Button
          type='submit'
          color='default'
          className='font-bold'
          isLoading={isLoading}
        >
          Masuk
        </Button>
      </form>
    </div>
  );
}
