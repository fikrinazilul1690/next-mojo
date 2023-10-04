export default async function getCategoreis(
  nextOption?: NextFetchRequestConfig
): Promise<MojoResponse<Category[]>> {
  const response = await fetch(
    'https://toko-mojopahit-production.up.railway.app/v1/categories',
    {
      method: 'GET',
      next: nextOption,
    }
  );

  const json = (await response.json()) as MojoResponse<Category[]>;

  return json;
}
