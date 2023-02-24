// import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// import prisma from '../../../lib/prisma';

export const authOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(_, __) {
        const user = {
          id: '0dbb00e1-938a-4c97-a1dd-efb256ea9a29',
          user: {
            id: '0dbb00e1-938a-4c97-a1dd-efb256ea9a29',
            name: 'Jason Ruesch',
            email: 'jason.ruesch@me.com',
            image: 'https://avatars.githubusercontent.com/u/1501490?v=4',
          },
          expires: '9999-03-23T23:00:55.426Z',
        };
        return Promise.resolve(user);
      },
    }),
  ],
  // adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
};

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions);

export default authHandler;
