'use client';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { ChangeEvent, useReducer } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import register from '@/lib/register';

type Props = {
  className: string;
};

enum RegisterActionKind {
  SetInput = 'SET_INPUT',
  SetError = 'SET_ERROR',
  ToggleVisible = 'TOGGLE_VISIBLE',
}

type RegisterAction = {
  type: RegisterActionKind;
  field?: string;
  payload?: {
    errorName?: string;
    errorEmail?: string;
    errorPhone?: string;
    errorPassword?: string;
    errorConfirmPassword?: string;
    errorMsg?: string;
    input?: string;
  };
};

type RegisterState = {
  isVisible: boolean;
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
};

function reducer(state: RegisterState, action: RegisterAction) {
  const { type, payload, field } = action;
  switch (type) {
    case RegisterActionKind.SetInput:
      return {
        ...state,
        [field || 'input']: payload?.input,
      };
    case RegisterActionKind.ToggleVisible:
      return {
        ...state,
        isVisible: !state.isVisible,
      };
    default:
      return state;
  }
}

const initialState = {
  isVisible: false,
  name: '',
  email: '',
  phone: '',
  password: '',
  confirm_password: '',
};

export default function RegisterForm(props: Props) {
  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, initialState);

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: RegisterActionKind.SetInput,
      field: e.target.name,
      payload: {
        input: e.target.value,
      },
    });
  }

  const { isLoading, mutate, error } = useMutation<
    MojoResponse<{ message: string }>,
    ErrorResponse,
    RegisterRequest
  >({
    mutationFn: (newUser) => {
      return register(newUser);
    },
    onSuccess: () => {
      router.push('/login');
    },
  });

  const toggleVisibility = () => {
    dispatch({ type: RegisterActionKind.ToggleVisible });
  };

  return (
    <form
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        mutate({
          name: state.name,
          email: state.email,
          phone: state.phone,
          password: state.password,
          confirm_password: state.confirm_password,
        });
      }}
    >
      <Input
        isRequired
        classNames={{
          helperWrapper: 'last:mb-5',
        }}
        type='text'
        name='name'
        label='Name'
        variant='bordered'
        labelPlacement='outside'
        placeholder='Enter your name'
        color={!!!error?.name ? 'default' : 'danger'}
        errorMessage={!!error?.name ? error?.name[0] : undefined}
        isInvalid={!!!error?.name}
        onChange={handleInput}
      />
      <Input
        isRequired
        classNames={{
          helperWrapper: 'last:mb-5',
        }}
        name='email'
        type='email'
        label='Email'
        variant='bordered'
        labelPlacement='outside'
        placeholder='Enter your email'
        color={!!!error?.email ? 'default' : 'danger'}
        errorMessage={!!error?.email ? error?.email[0] : undefined}
        isInvalid={!!!error?.email}
        onChange={handleInput}
      />
      <Input
        isRequired
        classNames={{
          helperWrapper: 'last:mb-5',
        }}
        type='text'
        name='phone'
        label='Phone'
        variant='bordered'
        labelPlacement='outside'
        placeholder='Enter your phone number'
        color={!!!error?.phone ? 'default' : 'danger'}
        errorMessage={!!error?.phone ? error?.phone[0] : undefined}
        isInvalid={!!!error?.phone}
        onChange={handleInput}
      />
      <Input
        isRequired
        classNames={{
          helperWrapper: 'last:mb-5',
        }}
        label='Password'
        name='password'
        variant='bordered'
        labelPlacement='outside'
        placeholder='Enter your password'
        endContent={
          <button
            className='focus:outline-none'
            type='button'
            onClick={toggleVisibility}
          >
            {state.isVisible ? (
              <AiFillEyeInvisible className='text-2xl text-default-400 pointer-events-none' />
            ) : (
              <AiFillEye className='text-2xl text-default-400 pointer-events-none' />
            )}
          </button>
        }
        type={state.isVisible ? 'text' : 'password'}
        onChange={handleInput}
        color={!!!error?.password ? 'default' : 'danger'}
        errorMessage={!!error?.password ? error?.password[0] : undefined}
        isInvalid={!!!error?.password}
      />
      <Input
        isRequired
        classNames={{
          helperWrapper: 'last:mb-5',
        }}
        label='Confirm Password'
        name='confirm_password'
        variant='bordered'
        labelPlacement='outside'
        placeholder='Confirm your password'
        endContent={
          <button
            className='focus:outline-none'
            type='button'
            onClick={toggleVisibility}
          >
            {state.isVisible ? (
              <AiFillEyeInvisible className='text-2xl text-default-400 pointer-events-none' />
            ) : (
              <AiFillEye className='text-2xl text-default-400 pointer-events-none' />
            )}
          </button>
        }
        type={state.isVisible ? 'text' : 'password'}
        onChange={handleInput}
        color={state.confirm_password === state.password ? 'default' : 'danger'}
        errorMessage={
          state.confirm_password !== state.password && 'Password not match'
        }
        isInvalid={
          state.confirm_password === state.password && !!!error?.password
        }
      />
      <Button
        type='submit'
        color='default'
        className='font-bold'
        isLoading={isLoading}
      >
        Daftar
      </Button>
    </form>
  );
}
