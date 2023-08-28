import login from '@/lib/login';
import type {
  Awaitable,
  NextAuthOptions,
  RequestInternal,
  User,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'example@email.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await login(credentials?.email!, credentials?.password!);
        const data = res.data;
        if ((res.code = 200)) {
          return {
            image: data.user.profile_picture?.url,
            ...data,
            ...data.user,
          };
        }
        return null;
      },
    }),
  ],
  pages: {},
};
