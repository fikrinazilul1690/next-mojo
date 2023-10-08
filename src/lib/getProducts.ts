export default async function getProducts(
  params?: ProductFilter,
  options?: { next?: NextFetchRequestConfig; signal?: AbortSignal }
): Promise<MojoResponse<Product[]>> {
  const asArray = Object.entries(params ?? {});
  const newParams = Object.fromEntries(
    asArray
      .filter(([_, val]) => val !== undefined)
      .map((obj) => obj.map(String))
  );

  // console.log(newParams);
  const response = await fetch(
    'https://toko-mojopahit-production.up.railway.app/v1/products?' +
      new URLSearchParams({ ...newParams }),
    {
      method: 'GET',
      ...options,
    }
  );
  const json = (await response.json()) as MojoResponse<Product[]>;

  return json;
}
