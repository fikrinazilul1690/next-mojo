export default async function getProducts(
  params: ProductFilter
): Promise<MojoResponse<Product[]>> {
  const asArray = Object.entries(params);
  const newParams = Object.fromEntries(asArray.map((val) => val.map(String)));
  const response = await fetch(
    'https://toko-mojopahit-production.up.railway.app/v1/products?' +
      new URLSearchParams({ ...newParams }),
    {
      method: 'GET',
    }
  );
  const json = response.json();

  return json;
}
