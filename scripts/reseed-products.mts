import Database from "better-sqlite3";
import { getStaticCatalogSeed } from "../src/data/models";

const db = new Database("data/homehub.db");

const cats = db.prepare("SELECT id, slug FROM categories").all() as {
  id: number;
  slug: string;
}[];
const catMap = Object.fromEntries(cats.map((c) => [c.slug, c.id]));

if (!catMap.interior) {
  throw new Error("Categories missing — run the app once to create schema first");
}

const before = (
  db.prepare("SELECT COUNT(*) AS c FROM products").get() as { c: number }
).c;

db.prepare("DELETE FROM products").run();

const insert = db.prepare(`
  INSERT INTO products (
    slug, name, category_id, image, gallery_json,
    label_sv, label_en, material_sv, material_en,
    finish_sv, finish_en, hardware_sv, hardware_en,
    colors_json, description_sv, description_en,
    detail_intro_sv, detail_intro_en, detail_bullets_json, specs_json,
    price_sek, featured, published, priority
  ) VALUES (
    @slug, @name, @category_id, @image, @gallery_json,
    @label_sv, @label_en, @material_sv, @material_en,
    @finish_sv, @finish_en, @hardware_sv, @hardware_en,
    @colors_json, @description_sv, @description_en,
    @detail_intro_sv, @detail_intro_en, @detail_bullets_json, @specs_json,
    @price_sek, @featured, @published, @priority
  )
`);

const seed = getStaticCatalogSeed();
const tx = db.transaction(() => {
  for (const p of seed) {
    insert.run({
      ...p,
      category_id: catMap[p.category] ?? catMap.interior,
    });
  }
});
tx();

const after = (
  db.prepare("SELECT COUNT(*) AS c FROM products").get() as { c: number }
).c;
const sample = db.prepare("SELECT slug, image FROM products LIMIT 5").all();

console.log(JSON.stringify({ before, seeded: seed.length, after, sample }, null, 2));
db.close();
