import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  getAdminPassword,
  getAdminSessionValue,
} from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const password = String(body.password || "");
    const expected = getAdminPassword();

    if (!expected) {
      return NextResponse.json(
        {
          error:
            "ADMIN_PASSWORD is not set. Add it to .env.local and restart the server.",
        },
        { status: 500 }
      );
    }

    if (!password || password !== expected) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    const session = getAdminSessionValue();
    if (!session) {
      return NextResponse.json(
        { error: "Admin session secret is not configured" },
        { status: 500 }
      );
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, session, adminCookieOptions());
    return response;
  } catch (error) {
    console.error("admin login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
