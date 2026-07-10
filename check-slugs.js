const duas = require("./data/duas.json");

const slugMap = new Map();

for (const dua of duas) {
  if (!slugMap.has(dua.slug)) {
    slugMap.set(dua.slug, []);
  }

  slugMap.get(dua.slug).push(dua.title);
}

let duplicates = 0;

for (const [slug, titles] of slugMap.entries()) {
  if (titles.length > 1) {
    duplicates++;

    console.log("\n❌ Duplicate Slug:");
    console.log("Slug :", slug);

    titles.forEach((title, index) => {
      console.log(`${index + 1}. ${title}`);
    });
  }
}

if (duplicates === 0) {
  console.log("✅ No duplicate slugs found.");
} else {
  console.log(`\nFound ${duplicates} duplicate slug(s).`);
}