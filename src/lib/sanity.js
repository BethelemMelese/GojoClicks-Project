import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

let client = null;

function getClient() {
  if (!projectId) {
    return null;
  }

  if (!client) {
    client = createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
      token: process.env.SANITY_API_TOKEN || undefined,
    });
  }

  return client;
}

export function urlForImage(source) {
  const sanity = getClient();
  if (!sanity || !source) {
    return null;
  }

  return imageUrlBuilder(sanity).image(source);
}

const packageFields = `
  _id,
  title,
  "slug": slug.current,
  description,
  price,
  features,
  featured,
  image{
    ...,
    asset->{
      _id,
      url
    }
  }
`;

/**
 * Fetch all advertising packages from Sanity.
 */
export async function getPackages() {
  const sanity = getClient();
  if (!sanity) {
    console.warn("NEXT_PUBLIC_SANITY_PROJECT_ID is not set");
    return [];
  }

  try {
    return await sanity.fetch(
      `*[_type == "package"] | order(price asc) {
        ${packageFields}
      }`
    );
  } catch (error) {
    console.error("getPackages failed:", error.message || error);
    return [];
  }
}

/**
 * Fetch packages marked as featured (for the home page).
 */
export async function getFeaturedPackages(limit = 3) {
  const sanity = getClient();
  if (!sanity) {
    console.warn("NEXT_PUBLIC_SANITY_PROJECT_ID is not set");
    return [];
  }

  try {
    const packages = await sanity.fetch(
      `*[_type == "package" && featured == true] | order(price asc) {
        ${packageFields}
      }`
    );

    return Array.isArray(packages) ? packages.slice(0, limit) : [];
  } catch (error) {
    console.error("getFeaturedPackages failed:", error.message || error);
    return [];
  }
}

/**
 * Fetch a single package by slug.
 */
export async function getPackageBySlug(slug) {
  const sanity = getClient();
  if (!sanity) {
    console.warn("NEXT_PUBLIC_SANITY_PROJECT_ID is not set");
    return null;
  }

  try {
    return await sanity.fetch(
      `*[_type == "package" && slug.current == $slug][0] {
        ${packageFields}
      }`,
      { slug }
    );
  } catch (error) {
    console.error("getPackageBySlug failed:", error.message || error);
    return null;
  }
}
