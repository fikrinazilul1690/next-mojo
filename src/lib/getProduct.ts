export default async function getProduct(
  id: number,
  nextOption?: NextFetchRequestConfig
): Promise<MojoResponse<Product>> {
  const response = await fetch(
    `https://toko-mojopahit-production.up.railway.app/v1/products/${id}`,
    {
      next: nextOption,
    }
  );
  const json = await response.json();

  return json;
}
