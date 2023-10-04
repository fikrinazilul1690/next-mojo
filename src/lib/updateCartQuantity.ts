type Props = {
  accessToken: string;
  productSku: string;
  quantity: number;
};

export default async function updateCartQuantity(
  { accessToken, productSku, quantity }: Props,
  nextOption?: NextFetchRequestConfig
): Promise<MojoResponse<{ message: string }>> {
  const response = await fetch(
    `https://toko-mojopahit-production.up.railway.app/v1/carts/${productSku}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        quantity,
      }),
      next: nextOption,
    }
  );
  const json = (await response.json()) as MojoResponse<{ message: string }>;

  if (json.code !== 200) {
    throw json.errors;
  }

  return json;
}
