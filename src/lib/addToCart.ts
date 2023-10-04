type Props = {
  accessToken: string;
  body: {
    sku: string;
    quantity: number;
  };
};

export default async function addToCart(
  { accessToken, body }: Props,
  nextOption?: NextFetchRequestConfig
): Promise<MojoResponse<{ message: string }>> {
  const response = await fetch(
    `https://toko-mojopahit-production.up.railway.app/v1/carts`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
      next: nextOption,
    }
  );
  const json = (await response.json()) as MojoResponse<{ message: string }>;

  if (json.code !== 200) {
    throw json;
  }

  return json;
}
