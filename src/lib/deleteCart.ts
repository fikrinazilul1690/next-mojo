type Props = {
  accessToken: string;
  productSku: string;
};

export default async function deleteCart(
  { accessToken, productSku }: Props,
  nextOption?: NextFetchRequestConfig
): Promise<MojoResponse<{ message: string }>> {
  const response = await fetch(
    `https://toko-mojopahit-production.up.railway.app/v1/carts/${productSku}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: nextOption,
    }
  );
  const json = await response.json();

  return json;
}
