import { NextResponse } from "next/server";

/**
 * Sliding-window rate limits per route bucket (by IP).
 * In-memory — fine for local / single Node process.
 * For multi-instance production (Vercel), wire Upstash later
 * (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN).
 */
const LIMITS = {
  login: { limit: 5, windowMs: 15 * 60 * 1000 },
  booking: { limit: 8, windowMs: 60 * 60 * 1000 },
  contact: { limit: 8, windowMs: 60 * 60 * 1000 },
  "upload-signature": { limit: 30, windowMs: 60 * 60 * 1000 },
};

/** @type {Map<string, { count: number, resetAt: number }>} */
const memoryBuckets = new Map();

const MAX_BUCKETS = 10_000;

function pruneBuckets(now) {
  if (memoryBuckets.size < MAX_BUCKETS) return;
  for (const [key, entry] of memoryBuckets) {
    if (now >= entry.resetAt) memoryBuckets.delete(key);
  }
  // Hard cap if still huge (unlikely)
  if (memoryBuckets.size >= MAX_BUCKETS) {
    memoryBuckets.clear();
  }
}

function checkMemoryLimit(key, { limit, windowMs }) {
  const now = Date.now();
  pruneBuckets(now);

  let entry = memoryBuckets.get(key);
  if (!entry || now >= entry.resetAt) {
    entry = { count: 0, resetAt: now + windowMs };
    memoryBuckets.set(key, entry);
  }

  entry.count += 1;

  if (entry.count > limit) {
    return {
      success: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  return {
    success: true,
    remaining: Math.max(0, limit - entry.count),
    retryAfterSec: 0,
  };
}

export function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

/**
 * @param {Request} request
 * @param {keyof typeof LIMITS} bucket
 * @returns {Promise<NextResponse | null>} 429 response or null if allowed
 */
export async function enforceRateLimit(request, bucket) {
  const config = LIMITS[bucket];
  if (!config) return null;

  const ip = getClientIp(request);
  const result = checkMemoryLimit(`${bucket}:${ip}`, config);

  if (result.success) return null;

  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    {
      status: 429,
      headers: {
        "Retry-After": String(result.retryAfterSec),
        "X-RateLimit-Limit": String(config.limit),
        "X-RateLimit-Remaining": "0",
      },
    }
  );
}
