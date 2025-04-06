// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {
//     return NextResponse.next();
//   },
//   {
//     pages: {
//       signIn: "/",
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//   }
// );

// export const config = {
//   matcher: ["/parents", "/kids"],
// };

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    const signInUrl = new URL("/", req.url);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/parents", "/kids"],
};
