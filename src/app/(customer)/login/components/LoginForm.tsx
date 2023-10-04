'use client';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { useMemo, useReducer } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

type Props = {
  className: string;
};

enum LoginActionKind {
  SetInput = 'SET_INPUT',
  ToggleLoading = 'TOGGLE_LOADING',
  ToggleVisible = 'TOGGLE_VISIBLE',
}

type LoginAction = {
  type: LoginActionKind;
  field?: string;
  payload?: string;
};

type LoginState = {
  isLoading: boolean;
  isVisible: boolean;
  email: string;
  password: string;
};

const initialState: LoginState = {
  isLoading: false,
  isVisible: false,
  email: '',
  password: '',
};

function reducer(state: LoginState, action: LoginAction) {
  const { type, payload, field } = action;
  switch (type) {
    case LoginActionKind.SetInput:
      return {
        ...state,
        [field || 'input']: payload,
      };
    case LoginActionKind.ToggleLoading:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case LoginActionKind.ToggleVisible:
      return {
        ...state,
        isVisible: !state.isVisible,
      };
    default:
      return state;
  }
}

export default function LoginForm(props: Props) {
  const searchParams = useSearchParams();
  const callback = searchParams.get('callbackUrl');
  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, isVisible, email, password } = state;

  const toggleVisibility = () =>
    dispatch({
      type: LoginActionKind.ToggleVisible,
    });

  const validateEmail = (value: string) =>
    value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  const validationState = useMemo(() => {
    if (email === '') return true;

    return validateEmail(email) ? true : false;
  }, [email]);

  return (
    <div className='flex flex-col gap-3 justify-center'>
      <form
        {...props}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: LoginActionKind.ToggleLoading });
          signIn('credentials', {
            email: email,
            password: password,
            redirect: false,
          }).then((res) => {
            // console.log('res:', res);
            if (!!!res?.error) {
              // console.log('log: ', callback);
              router.replace(callback || '/');
              // console.log('log2: ', callback);
            } else {
              toast.error(res.error);
            }
            dispatch({ type: LoginActionKind.ToggleLoading });
          });
        }}
      >
        <Input
          isRequired
          type='email'
          name='email'
          label='Email'
          variant='bordered'
          labelPlacement='outside'
          placeholder='Enter your email'
          color={!validationState ? 'danger' : 'default'}
          errorMessage={!validationState && 'Please enter a valid email'}
          isInvalid={!validationState}
          onChange={(e) =>
            dispatch({
              type: LoginActionKind.SetInput,
              field: e.target.name,
              payload: e.target.value,
            })
          }
        />
        <Input
          isRequired
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
              {isVisible ? (
                <AiFillEyeInvisible className='text-2xl text-default-400 pointer-events-none' />
              ) : (
                <AiFillEye className='text-2xl text-default-400 pointer-events-none' />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
          onChange={(e) =>
            dispatch({
              type: LoginActionKind.SetInput,
              field: e.target.name,
              payload: e.target.value,
            })
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
