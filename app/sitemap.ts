import { MetadataRoute } from "next";
import { getDuas } from "@/lib/dua";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dua-finder-puce.vercel.app";

  const lastModified = new Date("2026-07-12");

  const uniqueDuas = Array.from(
    new Map(getDuas().map((dua) => [dua.slug, dua])).values()
  );

  return [
    {
      url: baseUrl,
      lastModified,
      priority: 1,
    },
    ...uniqueDuas.map((dua) => ({
      url: `${baseUrl}/dua/${dua.slug}`,
      lastModified,
      priority: 0.8,
    })),
  ];
}