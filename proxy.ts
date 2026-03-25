import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const session = await getServerSession();
  const pathname = req.nextUrl.pathname;

  const corsHeader = "http://localhost:3000";
  if (session?.user) {
    if (pathname === "/")
      return NextResponse.redirect(new URL("/home", req.nextUrl));
  } else {
    if (pathname.startsWith("/home"))
      return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  return NextResponse.next({
    headers: {
      "Access-Control-Allow-Origin": corsHeader,
    },
  });
}
export const config = {
  matcher: [
    // Игнорируем API-роуты, статические файлы и другие исключения
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
