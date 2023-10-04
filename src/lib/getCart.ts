type Props = {
  accessToken: string;
};

export default async function getCart(
  { accessToken }: Props,
  nextOption?: NextFetchRequestConfig
): Promise<MojoResponse<CartItem[]>> {
  const response = await fetch(
    `https://toko-mojopahit-production.up.railway.app/v1/carts`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: nextOption,
    }
  );
  const json = await response.json();

  return json;
}
