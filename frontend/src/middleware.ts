import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token");
  const url = request.nextUrl.clone();

  if (
    !token &&
    (url.pathname.startsWith("/admin") || url.pathname.startsWith("/client"))
  ) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }
  if (token && url.pathname.startsWith("/auth/login")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/client/:path*", "/auth/login"],
};
