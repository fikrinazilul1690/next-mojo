export default async function getProduct(
  id: number,
  options?: { next?: NextFetchRequestConfig; signal?: AbortSignal }
): Promise<Product | undefined> {
  const response = await fetch(
    `https://toko-mojopahit-production.up.railway.app/v1/products/${id}`,
    {
      ...options,
    }
  );
  const json = (await response.json()) as MojoResponse<Product>;

  if (!response.ok) {
    if (json.code === 404) {
      return undefined;
    }
    throw json.errors;
  }

  return json.data;
}
