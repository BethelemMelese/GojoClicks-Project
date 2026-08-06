import { cookies } from "next/headers";

export const ADMIN_COOKIE = "gc_admin_session";

/** Session lifetime — cookie maxAge matches this. */
export const ADMIN_SESSION_MAX_AGE_SEC = 60 * 60 * 12; // 12 hours

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

/**
 * Signing secret for admin session tokens. Prefer ADMIN_SESSION_SECRET so
 * the cookie never equals the password.
 */
export function getAdminSessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    ""
  );
}

function bytesToBase64Url(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(value) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function importHmacKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

async function signPayload(payload, secret) {
  const key = await importHmacKey(secret);
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );
  return bytesToBase64Url(new Uint8Array(signature));
}

/** Signed token stored in the httpOnly cookie after login. */
export async function createAdminSessionToken() {
  const secret = getAdminSessionSecret();
  if (!secret) return null;

  const now = Math.floor(Date.now() / 1000);
  const body = {
    role: "admin",
    iat: now,
    exp: now + ADMIN_SESSION_MAX_AGE_SEC,
    jti: crypto.randomUUID(),
  };
  const payload = bytesToBase64Url(
    new TextEncoder().encode(JSON.stringify(body))
  );
  const signature = await signPayload(payload, secret);
  return `${payload}.${signature}`;
}

export async function verifyAdminSessionToken(token) {
  const secret = getAdminSessionSecret();
  if (!token || !secret || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payload, signature] = parts;
  if (!payload || !signature) return false;

  try {
    const expected = await signPayload(payload, secret);
    if (!timingSafeEqual(signature, expected)) return false;

    const json = new TextDecoder().decode(base64UrlToBytes(payload));
    const body = JSON.parse(json);
    const now = Math.floor(Date.now() / 1000);

    if (body.role !== "admin") return false;
    if (typeof body.exp !== "number" || body.exp < now) return false;
    if (typeof body.iat === "number" && body.iat > now + 60) return false;

    return true;
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
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
    maxAge: ADMIN_SESSION_MAX_AGE_SEC,
  };
}
