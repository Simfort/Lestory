import { nextAuthConfig } from "@/config/nextauth";
import NextAuth from "next-auth";

const handler = NextAuth(nextAuthConfig);

export { handler as POST, handler as GET };
