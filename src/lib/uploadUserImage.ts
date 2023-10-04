export default async function uploadUserImage(file: File, accessToken: string) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(
    'https://toko-mojopahit-production.up.railway.app/v1/uploads/users/images',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    }
  );

  return await response.json();
}
