export default async function getCart(
  accessToken: string,
  options?: { next?: NextFetchRequestConfig; signal?: AbortSignal }
): Promise<MojoResponse<CartItem[]>> {
  const response = await fetch(
    `https://toko-mojopahit-production.up.railway.app/v1/carts`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      ...options,
    }
  );
  const json = await response.json();

  return json;
}
