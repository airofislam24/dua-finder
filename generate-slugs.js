const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data", "duas.json");

const duas = JSON.parse(fs.readFileSync(filePath, "utf8"));

const slugCount = new Map();

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

for (const dua of duas) {
  let baseSlug = slugify(dua.title);

  if (!baseSlug) {
    baseSlug = "dua";
  }

  if (!slugCount.has(baseSlug)) {
    slugCount.set(baseSlug, 1);
    dua.slug = baseSlug;
  } else {
    const count = slugCount.get(baseSlug) + 1;
    slugCount.set(baseSlug, count);
    dua.slug = `${baseSlug}-${count}`;
  }
}

fs.writeFileSync(
  filePath,
  JSON.stringify(duas, null, 2),
  "utf8"
);

console.log("✅ All slugs regenerated successfully.");