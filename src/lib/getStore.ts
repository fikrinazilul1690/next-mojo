export default async function getStore(): Promise<
  MojoResponse<StoreInformation>
> {
  const response = await fetch(
    'https://toko-mojopahit-production.up.railway.app/v1/store',
    {
      method: 'GET',
    }
  );
  const json = await response.json();

  return json;
}
