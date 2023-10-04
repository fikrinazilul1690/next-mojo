export default async function register(
  req: RegisterRequest
): Promise<MojoResponse<{ message: string }>> {
  const response = await fetch(
    'https://toko-mojopahit-production.up.railway.app/v1/auth/register',
    {
      method: 'POST',
      body: JSON.stringify(req),
    }
  );

  const data = (await response.json()) as MojoResponse<{ message: string }>;

  if (!response.ok) {
    throw data.errors;
  }

  return data;
}
