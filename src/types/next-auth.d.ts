import { User as UserModel } from '@prisma/client';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends UserModel {
    id: number;
  }

  interface Session {
    user: {
      email: string;
      name: string;
      image: string;
      address: string;
    } & DefaultSession['user'];
  }
}
