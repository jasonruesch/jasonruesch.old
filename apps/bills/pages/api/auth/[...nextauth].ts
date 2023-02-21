// import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
// import prisma from '../../../lib/prisma';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  // adapter: PrismaAdapter(prisma),
  // secret: process.env.NEXTAUTH_SECRET,
};

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions);

export default authHandler;
