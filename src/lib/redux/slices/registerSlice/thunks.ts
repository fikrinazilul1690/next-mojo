import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';

export const register = createAppAsyncThunk<
  MojoResponse<{ message: string }>,
  RegisterRequest,
  {
    rejectValue: MojoResponse<undefined>;
  }
>('register/fetchRegister', async (req: RegisterRequest, thunkApi) => {
  const response = await fetch(
    'https://toko-mojopahit-production.up.railway.app/v1/auth/register',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...req }),
    }
  );

  if (!response.ok) {
    return thunkApi.rejectWithValue(
      (await response.json()) as MojoResponse<undefined>
    );
  }

  return (await response.json()) as MojoResponse<{ message: string }>;
});
