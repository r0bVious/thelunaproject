import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { loginUser } from "../../controllers/db-controllers";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      console.log(user.email);
      if (!user.email) {
        console.error("❌ No email found in user object.");
        return false;
      }
      const loginRes = await loginUser({ userName: user.email });
      if (!loginRes || !loginRes.rows || loginRes.rows.length === 0) {
        console.error("❌ Login failed: No matching user found.");
        return false;
      }
      console.log("✅ Login successful. User ID:", loginRes.rows);
      (user as any).userId = loginRes.rows[0].user_id;
      (user as any).childname = loginRes.rows[0].child_name;
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
