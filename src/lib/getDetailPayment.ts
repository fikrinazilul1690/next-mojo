export default async function getDetailPayment(
  accessToken: string,
  paymentId: string,
  options?: { next?: NextFetchRequestConfig; signal?: AbortSignal }
): Promise<DetailPayment | undefined> {
  const response = await fetch(
    `https://toko-mojopahit-production.up.railway.app/v1/payments/${paymentId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      ...options,
    }
  );
  const json = (await response.json()) as MojoResponse<
    DetailPayment | undefined
  >;

  if (!response.ok) {
    // return undefined if not found
    if (json.code === 404) {
      return undefined;
    }
    // throwing error messages from backend
    throw json.errors;
  }

  return json.data;
}
