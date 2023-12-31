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
        if (res.code === 200) {
          return {
            image: data?.user.profile_picture?.url,
            ...data,
            ...data?.user,
          };
        }
        throw new Error(res.errors.message);
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({ user }) {
      return !!user;
    },
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user?.role) token.role = user.role;
      if (user?.access_token) token.accessToken = user.access_token;
      if (user?.refresh_token) token.refreshToken = user.refresh_token;
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      session.accessToken = token.accessToken;
      session.refreshToken = token.accessToken;
      return session;
    },
  },
};
