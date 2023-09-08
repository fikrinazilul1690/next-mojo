'use client';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import {
  registerSlice,
  register,
  useSelector,
  useDispatch,
  selectRegister,
} from '@/lib/redux';
import { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

type Props = {
  className: string;
};

export default function RegisterForm(props: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const registerValue = useSelector(selectRegister);

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

  return (
    <form
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(register(registerValue)).then((res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            router.replace('/login');
          }
        });
      }}
    >
      <Input
        isRequired
        classNames={{
          helperWrapper: 'last:mb-5',
        }}
        type='text'
        label='Name'
        variant='bordered'
        labelPlacement='outside'
        placeholder='Enter your name'
        color={!!!registerValue.name_err_msg ? 'default' : 'danger'}
        errorMessage={
          !!registerValue.name_err_msg
            ? registerValue.name_err_msg.map((msg, index) => (
                <p key={index} className='last:mb-4'>
                  {msg}
                </p>
              ))
            : undefined
        }
        validationState={!!!registerValue.name_err_msg ? 'valid' : 'invalid'}
        onChange={(e) =>
          dispatch(registerSlice.actions.setName(e.target.value))
        }
      />
      <Input
        isRequired
        classNames={{
          helperWrapper: 'last:mb-5',
        }}
        type='email'
        label='Email'
        variant='bordered'
        labelPlacement='outside'
        placeholder='Enter your email'
        color={!!!registerValue.email_err_msg ? 'default' : 'danger'}
        errorMessage={
          !!registerValue.email_err_msg
            ? registerValue.email_err_msg.map((msg, index) => (
                <p key={index} className='last:mb-4'>
                  {msg}
                </p>
              ))
            : undefined
        }
        validationState={!!!registerValue.email_err_msg ? 'valid' : 'invalid'}
        onChange={(e) =>
          dispatch(registerSlice.actions.setEmail(e.target.value))
        }
      />
      <Input
        isRequired
        classNames={{
          helperWrapper: 'last:mb-5',
        }}
        type='text'
        label='Phone'
        variant='bordered'
        labelPlacement='outside'
        placeholder='Enter your phone number'
        color={!!!registerValue.phone_err_msg ? 'default' : 'danger'}
        errorMessage={
          !!registerValue.phone_err_msg
            ? registerValue.phone_err_msg.map((msg, index) => (
                <p key={index} className='last:mb-4'>
                  {msg}
                </p>
              ))
            : undefined
        }
        validationState={!!!registerValue.phone_err_msg ? 'valid' : 'invalid'}
        onChange={(e) =>
          dispatch(registerSlice.actions.setPhone(e.target.value))
        }
      />
      <Input
        isRequired
        classNames={{
          helperWrapper: 'last:mb-5',
        }}
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
          dispatch(registerSlice.actions.setPassword(e.target.value))
        }
        color={!!!registerValue.password_err_msg ? 'default' : 'danger'}
        errorMessage={
          !!registerValue.password_err_msg
            ? registerValue.password_err_msg.map((msg, index) => (
                <p key={index} className='last:mb-4'>
                  {msg}
                </p>
              ))
            : undefined
        }
        validationState={
          !!!registerValue.password_err_msg ? 'valid' : 'invalid'
        }
      />
      <Input
        isRequired
        classNames={{
          helperWrapper: 'last:mb-5',
        }}
        label='Confirm Password'
        variant='bordered'
        labelPlacement='outside'
        placeholder='Confirm your password'
        endContent={
          <button
            className='focus:outline-none'
            type='button'
            onClick={toggleVisibility2}
          >
            {isVisible2 ? (
              <AiFillEyeInvisible className='text-2xl text-default-400 pointer-events-none' />
            ) : (
              <AiFillEye className='text-2xl text-default-400 pointer-events-none' />
            )}
          </button>
        }
        type={isVisible2 ? 'text' : 'password'}
        onChange={(e) =>
          dispatch(registerSlice.actions.setConfirmPassword(e.target.value))
        }
        color={
          registerValue.confirm_password === registerValue.password
            ? 'default'
            : 'danger'
        }
        errorMessage={
          registerValue.confirm_password !== registerValue.password &&
          'Password not match'
        }
        validationState={
          registerValue.confirm_password === registerValue.password &&
          !!!registerValue.password_err_msg
            ? 'valid'
            : 'invalid'
        }
      />
      <Button
        type='submit'
        color='default'
        className='font-bold'
        isLoading={registerValue.status === 'loading'}
      >
        Daftar
      </Button>
    </form>
  );
}
