import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';

export const filterFeaturedProduct = createAppAsyncThunk<
  MojoResponse<Product[]>,
  ProductFilter,
  {
    rejectValue: MojoResponse<undefined>;
  }
>('product/filter', async (req: ProductFilter, thunkApi) => {
  const asArray = Object.entries(req);
  const newParams = Object.fromEntries(asArray.map((val) => val.map(String)));
  const response = await fetch(
    'https://toko-mojopahit-production.up.railway.app/v1/products?' +
      new URLSearchParams({ ...newParams }),
    {
      method: 'GET',
    }
  );

  if (!response.ok) {
    return thunkApi.rejectWithValue(
      (await response.json()) as MojoResponse<undefined>
    );
  }

  return (await response.json()) as MojoResponse<Product[]>;
});
