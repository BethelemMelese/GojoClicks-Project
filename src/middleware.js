import { NextResponse } from "next/server";

const ADMIN_COOKIE = "gc_admin_session";

function isAuthed(request) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const expected =
    process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
  return Boolean(token && expected && token === expected);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    if (isAuthed(request)) {
      return NextResponse.redirect(new URL("/admin/bookings", request.url));
    }
    return NextResponse.next();
  }

  if (!process.env.ADMIN_PASSWORD) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("error", "config");
    return NextResponse.redirect(url);
  }

  if (!isAuthed(request)) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
