import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";
import { nextAuthConfig } from "./config/nextauth";

export async function proxy(req: NextRequest) {
  const session = await getServerSession(nextAuthConfig);
  const pathname = req.nextUrl.pathname;
  const search = req.nextUrl.searchParams;
  console.log(2, pathname);
  if (session?.user) {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/home", req.nextUrl));
    }
    console.log(session.user, search.get("id"));
    if (
      pathname.startsWith("/home/profile") &&
      search.get("id") !== (session.user as { id: string }).id
    ) {
      return NextResponse.redirect(new URL("/home", req.nextUrl));
    }
  } else {
    if (pathname.startsWith("/home"))
      return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/home"],
};
