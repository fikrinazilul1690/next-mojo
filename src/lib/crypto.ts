import AES from 'crypto-js/aes';

const secret = process.env.NEXT_PUBLIC_MY_SECRET_TOKEN as string;

export const encrypt = (value: string) => AES.encrypt(value, secret).toString();
export const decrypt = (encrypted: string) =>
  AES.decrypt(encrypted, secret).toString();
