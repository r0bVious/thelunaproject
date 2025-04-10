import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/app/api/controllers/db-controllers";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Guest",
      credentials: {},
      async authorize() {
        try {
          const loginRes = await loginUser({ userName: "guest" });
          if (!loginRes || !loginRes.result?.length) return null;

          const userData = loginRes.result[0];

          return {
            id: userData.user_id.toString(),
            email: "guest",
            name: "Guest",
            userId: userData.user_id,
            childname: userData.child_name,
            isNew: loginRes.status === "new",
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.type === "credentials") {
        return true;
      }

      if (!user.email) return false;

      const loginRes = await loginUser({ userName: user.email });
      if (!loginRes || !loginRes.result?.length) return false;

      const userData = loginRes.result[0];

      (user as any).userId = userData.user_id;
      (user as any).childname = userData.child_name;
      (user as any).isNew = loginRes.status === "new";

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
        token.childname = user.childname;
        token.isNew = user.isNew;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user.userId as any) = token.userId;
        (session.user.childname as any) = token.childname;
        (session.user.isNew as any) = token.isNew;

        if (session.user.email === "guest") {
          session.user.name = "Guest";
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
