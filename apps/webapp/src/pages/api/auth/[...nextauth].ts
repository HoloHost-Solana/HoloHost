// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // Add more providers here
  ],
  adapter: PrismaAdapter(prisma), // Use the Prisma adapter
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database", // Store sessions in the database
  },
  callbacks: {
    async session({ session, user }) {
      // Pass the user ID into the session object
      session.user.id = user.id;

      return session;
    },
  },
});
