import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  }),
  GithubProvider({
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  }),
  KakaoProvider({
    clientId: process.env.KAKAO_CLIENT_ID as string,
    clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
  }),
  NaverProvider({
    clientId: process.env.NAVER_CLIENT_ID as string,
    clientSecret: process.env.NAVER_CLIENT_SECRET as string,
  }),
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: {
        label: 'email',
        type: 'text',
        placeholder: '아이디를 입력하세요',
      },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      try {
        if (!credentials) throw new Error('no credentials to log in as');

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (email === 'bellmin9321@gmail.com' && password === 'cypress') {
          return {
            id: 1,
            name: '김종민',
            email: 'bellmin9321@gmail.com',
          };
        }

        return null;
      } catch (error) {
        return null;
      }
    },
  }),
];

export default NextAuth({
  callbacks: {
    session({ session }) {
      return session;
    },
  },
  session: {
    strategy: process.env.NODE_ENV === 'production' ? 'database' : 'jwt',
  },
  providers,
  pages: {
    signIn: '/auth/signin',
    error: 'auth/error',
  },
  secret: process.env.JWT_SECRET as string,
});
