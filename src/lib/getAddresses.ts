export default async function getAddresses(
  accessToken: string,
  options?: { next?: NextFetchRequestConfig; signal?: AbortSignal }
): Promise<MojoResponse<ListAddresses>> {
  const response = await fetch(
    'https://toko-mojopahit-production.up.railway.app/v1/users/addresses',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      ...options,
    }
  );

  const json = (await response.json()) as MojoResponse<ListAddresses>;

  return json;
}
