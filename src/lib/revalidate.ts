type Params = {
  tag: string;
};

export default async function revalidate({
  tag,
}: Params): Promise<{ revalidated: boolean; now: number }> {
  const secret = process.env.NEXT_PUBLIC_MY_SECRET_TOKEN as string;
  console.log(secret);
  const response = await fetch(
    '/api/revalidate?' +
      new URLSearchParams({
        tag,
        secret,
      }),
    {
      method: 'POST',
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
}
