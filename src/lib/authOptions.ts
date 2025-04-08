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
      if (!loginRes || !loginRes.result?.length) return false;

      const userData = loginRes.result[0];

      (user as any).userId = userData.user_id;
      (user as any).childname = userData.child_name;
      (user as any).isNew = loginRes.status === "new";

      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.userId = (user as any).userId;
        token.childname = (user as any).childname;
        token.isNew = (user as any).isNew;
      }

      if (trigger === "update" && session?.user) {
        token.childname = session.user.childname;
        token.isNew = session.user.isNew;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).userId = token.userId;
        (session.user as any).childname = token.childname;
        (session.user as any).isNew = token.isNew;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
