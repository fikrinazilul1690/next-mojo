export default async function login(
  email: string,
  password: string
): Promise<MojoResponse<LoginResponse>> {
  const response = await fetch(
    'https://toko-mojopahit-production.up.railway.app/v1/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );
  const json = response.json();

  return json;
}
