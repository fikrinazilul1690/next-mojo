const baseUrl = process.env.MOJO_URL as string;

export default async function login(
  email: string,
  password: string
): Promise<MojoResponse<LoginResponse>> {
  const response = await fetch(baseUrl + '/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const json = response.json();

  return json;
}
