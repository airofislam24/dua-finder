import { MetadataRoute } from "next";
import { getDuas } from "@/lib/dua";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dua-finder-puce.vercel.app";

  const duas = getDuas();

  const duaPages = duas.map((dua) => ({
    url: `${baseUrl}/dua/${dua.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...duaPages,
  ];
}