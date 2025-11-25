import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


export const config = {
  matcher: ["/protected/:path*"],
};


export default async function proxy(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }


  return NextResponse.next();
}
