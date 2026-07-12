import { MetadataRoute } from "next";
import { getDuas } from "@/lib/dua";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dua-finder-puce.vercel.app";

  const lastModified = new Date("2026-07-12");

  // Remove duplicate dua slugs
  const uniqueDuas = Array.from(
    new Map(getDuas().map((dua) => [dua.slug, dua])).values()
  );

  // Get unique categories
  const categories = Array.from(
    new Set(uniqueDuas.map((dua) => dua.category))
  );

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },

    // Category pages
    ...categories.map((category) => ({
      url: `${baseUrl}/category/${encodeURIComponent(
        category.toLowerCase().replace(/\s+/g, "-")
      )}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),

    // Dua pages
    ...uniqueDuas.map((dua) => ({
      url: `${baseUrl}/dua/${dua.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}