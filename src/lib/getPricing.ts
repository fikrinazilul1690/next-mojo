type Props = {
  accessToken: string;
  payload: PricingRatePayload;
};

export default async function getPricing({
  accessToken,
  payload,
}: Props): Promise<MojoResponse<RateResponse>> {
  const response = await fetch(
    'https://toko-mojopahit-production.up.railway.app/v1/rates',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    }
  );

  const json = (await response.json()) as MojoResponse<RateResponse>;

  return json;
}
