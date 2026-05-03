import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "./prisma";

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  throw new Error("Undefined github secret or id.");
}
export const nextAuthConfig: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = session.user || {};
      session.user.email = token.email || session.user.email;
      session.user.image = token.picture || session.user.image;
      session.user.name = token.name || session.user.name;

      if (token.id) {
        (session.user as { id: string }).id = token.id as string;
      } else {
        console.warn("Token ID is missing");
      }

      return session;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        try {
          let user = await prisma.user.findUnique({
            where: {
              email: profile.email,
            },
          });
          if (!user) {
            user = await prisma.user.create({
              data: {
                email: profile.email!,
                username: profile.name!,
                image:
                  profile.image ||
                  (profile as { avatar_url: string }).avatar_url,
              },
            });
          }

          token.id = user.id;
        } catch (error) {
          if (error instanceof Error) throw new Error(error.message);
        }
      }
      return token;
    },
  },
};
