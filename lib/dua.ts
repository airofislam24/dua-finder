import duas from "@/data/duas.json";

export function getDuas() {
  return duas;
}

export function getDuaBySlug(slug: string) {
  return duas.find((dua) => dua.slug === slug);
}

export function getRelatedDuas(category: string, currentSlug: string) {
  return duas
    .filter(
      (dua) => dua.category === category && dua.slug !== currentSlug
    )
    .slice(0, 5);
}