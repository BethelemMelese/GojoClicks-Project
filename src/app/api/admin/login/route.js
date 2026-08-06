import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  createAdminSessionToken,
  getAdminPassword,
} from "@/lib/adminAuth";
import { enforceRateLimit } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const limited = await enforceRateLimit(request, "login");
  if (limited) return limited;

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

    const session = await createAdminSessionToken();
    if (!session) {
      return NextResponse.json(
        {
          error:
            "Admin session secret is not configured. Set ADMIN_SESSION_SECRET (or ADMIN_PASSWORD).",
        },
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
