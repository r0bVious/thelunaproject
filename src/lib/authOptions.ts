import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { loginUser } from "@/app/api/controllers/db-controllers";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      const loginRes = await loginUser({ userName: user.email });
      if (!loginRes.length) return false;
      (user as any).userId = loginRes[0].user_id;
      (user as any).childname = loginRes[0].child_name;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userId = (user as any).userId;
        token.childname = (user as any).childname;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).userId = token.userId;
        (session.user as any).childname = token.childname;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
