// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
      const sessionToken =
            request.cookies.get("__Secure-next-auth.session-token")?.value ||
            request.cookies.get("next-auth.session-token")?.value;

      const { pathname } = request.nextUrl;

      // Admin protection
      if (pathname.startsWith("/admin") && !sessionToken) {
            return NextResponse.redirect(new URL("/", request.url));
      }

      // Auth-protected paths
      const protectedPaths = ["/dashboard", "/profile", "/settings"];
      if (protectedPaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
            return NextResponse.redirect(new URL("/signin", request.url));
      }

      // Prevent access to signin if already logged in
      if (pathname === "/signin" && sessionToken) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      return NextResponse.next();
}

export const config = {
      matcher: ["/admin/:path*", "/dashboard/:path*", "/profile/:path*", "/settings/:path*", "/signin"],
};
