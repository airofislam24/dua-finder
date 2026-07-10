import { getDuas } from "./dua";

export function getCategories() {
  const duas = getDuas();

  return [...new Set(duas.map((dua) => dua.category))];
}

export function getDuasByCategory(category: string) {
  return getDuas().filter(
    (dua) => dua.category.toLowerCase() === category.toLowerCase()
  );
}