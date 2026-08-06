import { cookies } from "next/headers";

export const ADMIN_COOKIE = "gc_admin_session";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

/** Opaque session value stored in the httpOnly cookie after login. */
export function getAdminSessionValue() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    ""
  );
}

export function verifyAdminSessionToken(token) {
  const expected = getAdminSessionValue();
  return Boolean(token && expected && token === expected);
}

export function isAdminAuthenticated() {
  if (!getAdminPassword()) return false;
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return verifyAdminSessionToken(token);
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}
