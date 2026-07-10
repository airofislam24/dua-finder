import { MetadataRoute } from "next";
import { getDuas } from "@/lib/dua";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dua-finder-puce.vercel.app";

  const uniqueDuas = Array.from(
    new Map(getDuas().map((dua) => [dua.slug, dua])).values()
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...uniqueDuas.map((dua) => ({
      url: `${baseUrl}/dua/${dua.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}