import type BetterSqlite3 from "better-sqlite3";
import fs from "fs";
import path from "path";
import { getStaticCatalogSeed } from "@/data/models";
import { isAdminDbEnabled } from "@/lib/adminDbEnabled";

type SqliteDb = BetterSqlite3.Database;

const dataDir = path.join(process.cwd(), "data");
const dbPath = process.env.DATABASE_PATH || path.join(dataDir, "homehub.db");

let db: SqliteDb | null = null;

export function getDb(): SqliteDb {
  if (!isAdminDbEnabled()) {
    throw new Error("Admin database is disabled");
  }
  if (db) return db;

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Dynamic load so Vercel builds do not initialize native SQLite when admin DB is off.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Database = require("better-sqlite3") as typeof import("better-sqlite3");
  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  migrate(db);
  seedIfEmpty(db);
  return db;
}

function migrate(database: SqliteDb) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name_sv TEXT NOT NULL,
      name_en TEXT NOT NULL,
      priority INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      category_id INTEGER NOT NULL REFERENCES categories(id),
      image TEXT NOT NULL DEFAULT '',
      gallery_json TEXT NOT NULL DEFAULT '[]',
      label_sv TEXT NOT NULL DEFAULT '',
      label_en TEXT NOT NULL DEFAULT '',
      material_sv TEXT NOT NULL DEFAULT '',
      material_en TEXT NOT NULL DEFAULT '',
      finish_sv TEXT NOT NULL DEFAULT '',
      finish_en TEXT NOT NULL DEFAULT '',
      hardware_sv TEXT NOT NULL DEFAULT '',
      hardware_en TEXT NOT NULL DEFAULT '',
      colors_json TEXT NOT NULL DEFAULT '[]',
      description_sv TEXT NOT NULL DEFAULT '',
      description_en TEXT NOT NULL DEFAULT '',
      detail_intro_sv TEXT NOT NULL DEFAULT '',
      detail_intro_en TEXT NOT NULL DEFAULT '',
      detail_bullets_json TEXT NOT NULL DEFAULT '[]',
      specs_json TEXT NOT NULL DEFAULT '[]',
      price_sek INTEGER NOT NULL DEFAULT 0,
      featured INTEGER NOT NULL DEFAULT 0,
      published INTEGER NOT NULL DEFAULT 1,
      priority INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL DEFAULT '',
      model TEXT NOT NULL DEFAULT '',
      source TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS product_reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      author_name TEXT NOT NULL DEFAULT '',
      rating INTEGER NOT NULL DEFAULT 5,
      title_sv TEXT NOT NULL DEFAULT '',
      title_en TEXT NOT NULL DEFAULT '',
      body_sv TEXT NOT NULL DEFAULT '',
      body_en TEXT NOT NULL DEFAULT '',
      published INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
    CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
    CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
    CREATE INDEX IF NOT EXISTS idx_product_reviews_product ON product_reviews(product_id);
  `);

  ensureColumn(database, "inquiries", "source", "TEXT NOT NULL DEFAULT ''");
}

function ensureColumn(
  database: SqliteDb,
  table: string,
  column: string,
  definition: string,
) {
  const cols = database.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
  if (cols.some((c) => c.name === column)) return;
  database.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
}

function seedIfEmpty(database: SqliteDb) {
  const count = database.prepare("SELECT COUNT(*) AS c FROM categories").get() as { c: number };
  if (count.c > 0) return;

  const insertCat = database.prepare(
    `INSERT INTO categories (slug, name_sv, name_en, priority) VALUES (?, ?, ?, ?)`,
  );
  insertCat.run("entrance", "Ytterdörrar", "Entrance doors", 5);
  insertCat.run("interior", "Innerdörrar", "Interior doors", 10);
  insertCat.run("hidden", "Dolda dörrar", "Hidden doors", 20);
  insertCat.run("flooring", "Golv", "Flooring", 30);

  const cats = database
    .prepare("SELECT id, slug FROM categories")
    .all() as { id: number; slug: string }[];
  const catMap = Object.fromEntries(cats.map((c) => [c.slug, c.id]));

  const insertProduct = database.prepare(`
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
  const tx = database.transaction(() => {
    for (const p of seed) {
      insertProduct.run({
        ...p,
        category_id: catMap[p.category] ?? catMap.interior,
      });
    }
  });
  tx();
}

export type DbCategory = {
  id: number;
  slug: string;
  name_sv: string;
  name_en: string;
  priority: number;
  created_at: string;
};

export type DbProduct = {
  id: number;
  slug: string;
  name: string;
  category_id: number;
  image: string;
  gallery_json: string;
  label_sv: string;
  label_en: string;
  material_sv: string;
  material_en: string;
  finish_sv: string;
  finish_en: string;
  hardware_sv: string;
  hardware_en: string;
  colors_json: string;
  description_sv: string;
  description_en: string;
  detail_intro_sv: string;
  detail_intro_en: string;
  detail_bullets_json: string;
  specs_json: string;
  price_sek: number;
  featured: number;
  published: number;
  priority: number;
  created_at: string;
  updated_at: string;
  category_slug?: string;
  category_name_en?: string;
};

export type DbInquiry = {
  id: number;
  name: string;
  phone: string;
  email: string;
  model: string;
  source: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type DbProductReview = {
  id: number;
  product_id: number;
  author_name: string;
  rating: number;
  title_sv: string;
  title_en: string;
  body_sv: string;
  body_en: string;
  published: number;
  created_at: string;
  updated_at: string;
};
