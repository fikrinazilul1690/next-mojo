export default async function getCategoreis(): Promise<
  MojoResponse<Product[]>
> {
  const response = await fetch(
    'https://toko-mojopahit-production.up.railway.app/v1/categories',
    {
      method: 'GET',
    }
  );
  const json = response.json();

  return json;
}
