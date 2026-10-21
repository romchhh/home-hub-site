import {
  getDb,
  type DbCategory,
  type DbInquiry,
  type DbProduct,
  type DbProductReview,
} from "@/lib/db";

export function listCategories(): DbCategory[] {
  return getDb()
    .prepare("SELECT * FROM categories ORDER BY priority ASC, id ASC")
    .all() as DbCategory[];
}

export function getCategory(id: number): DbCategory | undefined {
  return getDb().prepare("SELECT * FROM categories WHERE id = ?").get(id) as
    | DbCategory
    | undefined;
}

export function createCategory(data: {
  slug: string;
  name_sv: string;
  name_en: string;
  priority?: number;
}) {
  const result = getDb()
    .prepare(
      `INSERT INTO categories (slug, name_sv, name_en, priority) VALUES (?, ?, ?, ?)`,
    )
    .run(data.slug, data.name_sv, data.name_en, data.priority ?? 0);
  return result.lastInsertRowid;
}

export function updateCategory(
  id: number,
  data: Partial<Pick<DbCategory, "slug" | "name_sv" | "name_en" | "priority">>,
) {
  const current = getCategory(id);
  if (!current) return false;
  getDb()
    .prepare(
      `UPDATE categories SET slug = ?, name_sv = ?, name_en = ?, priority = ? WHERE id = ?`,
    )
    .run(
      data.slug ?? current.slug,
      data.name_sv ?? current.name_sv,
      data.name_en ?? current.name_en,
      data.priority ?? current.priority,
      id,
    );
  return true;
}

export function deleteCategory(id: number) {
  const used = getDb()
    .prepare("SELECT COUNT(*) AS c FROM products WHERE category_id = ?")
    .get(id) as { c: number };
  if (used.c > 0) {
    throw new Error("Cannot delete a category that still has products");
  }
  getDb().prepare("DELETE FROM categories WHERE id = ?").run(id);
}

export function listProducts(opts?: { includeDrafts?: boolean }): DbProduct[] {
  const sql = opts?.includeDrafts
    ? `SELECT p.*, c.slug AS category_slug, c.name_en AS category_name_en,
              c.priority AS category_priority
       FROM products p JOIN categories c ON c.id = p.category_id
       ORDER BY c.priority ASC, p.priority ASC, p.id DESC`
    : `SELECT p.*, c.slug AS category_slug, c.name_en AS category_name_en,
              c.priority AS category_priority
       FROM products p JOIN categories c ON c.id = p.category_id
       WHERE p.published = 1
       ORDER BY c.priority ASC, p.priority ASC, p.id DESC`;
  return getDb().prepare(sql).all() as DbProduct[];
}

export function getProduct(id: number): DbProduct | undefined {
  return getDb()
    .prepare(
      `SELECT p.*, c.slug AS category_slug, c.name_en AS category_name_en
       FROM products p JOIN categories c ON c.id = p.category_id
       WHERE p.id = ?`,
    )
    .get(id) as DbProduct | undefined;
}

export function getProductBySlug(slug: string): DbProduct | undefined {
  return getDb()
    .prepare(
      `SELECT p.*, c.slug AS category_slug, c.name_en AS category_name_en
       FROM products p JOIN categories c ON c.id = p.category_id
       WHERE p.slug = ?`,
    )
    .get(slug) as DbProduct | undefined;
}

export type ProductInput = {
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
};

export function createProduct(data: ProductInput) {
  const result = getDb()
    .prepare(
      `INSERT INTO products (
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
      )`,
    )
    .run(data);
  return Number(result.lastInsertRowid);
}

export function updateProduct(id: number, data: ProductInput) {
  getDb()
    .prepare(
      `UPDATE products SET
        slug = @slug, name = @name, category_id = @category_id, image = @image,
        gallery_json = @gallery_json, label_sv = @label_sv, label_en = @label_en,
        material_sv = @material_sv, material_en = @material_en,
        finish_sv = @finish_sv, finish_en = @finish_en,
        hardware_sv = @hardware_sv, hardware_en = @hardware_en,
        colors_json = @colors_json, description_sv = @description_sv,
        description_en = @description_en, detail_intro_sv = @detail_intro_sv,
        detail_intro_en = @detail_intro_en, detail_bullets_json = @detail_bullets_json,
        specs_json = @specs_json, price_sek = @price_sek, featured = @featured,
        published = @published, priority = @priority,
        updated_at = datetime('now')
      WHERE id = @id`,
    )
    .run({ ...data, id });
}

export function patchProductFlags(
  id: number,
  patch: { published?: number; featured?: number; priority?: number },
) {
  const current = getProduct(id);
  if (!current) return false;
  getDb()
    .prepare(
      `UPDATE products SET
        published = ?, featured = ?, priority = ?,
        updated_at = datetime('now')
      WHERE id = ?`,
    )
    .run(
      patch.published ?? current.published,
      patch.featured ?? current.featured,
      patch.priority ?? current.priority,
      id,
    );
  return true;
}

export function deleteProduct(id: number) {
  getDb().prepare("DELETE FROM products WHERE id = ?").run(id);
}

export function listInquiries(): DbInquiry[] {
  return getDb()
    .prepare("SELECT * FROM inquiries ORDER BY created_at DESC")
    .all() as DbInquiry[];
}

export function getInquiry(id: number): DbInquiry | undefined {
  return getDb().prepare("SELECT * FROM inquiries WHERE id = ?").get(id) as
    | DbInquiry
    | undefined;
}

export function createInquiry(data: {
  name: string;
  phone?: string;
  email?: string;
  model?: string;
  source?: string;
  message?: string;
}) {
  const result = getDb()
    .prepare(
      `INSERT INTO inquiries (name, phone, email, model, source, message) VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .run(
      data.name,
      data.phone ?? "",
      data.email ?? "",
      data.model ?? "",
      data.source ?? "",
      data.message ?? "",
    );
  return Number(result.lastInsertRowid);
}

export function updateInquiryStatus(id: number, status: string) {
  getDb()
    .prepare(
      `UPDATE inquiries SET status = ?, updated_at = datetime('now') WHERE id = ?`,
    )
    .run(status, id);
}

export function deleteInquiry(id: number) {
  getDb().prepare("DELETE FROM inquiries WHERE id = ?").run(id);
}

export const SETTING_INQUIRY_TO_EMAILS = "inquiry_to_emails";

function getSetting(key: string): string {
  const row = getDb()
    .prepare("SELECT value FROM site_settings WHERE key = ?")
    .get(key) as { value: string } | undefined;
  return row?.value ?? "";
}

function setSetting(key: string, value: string) {
  getDb()
    .prepare(
      `INSERT INTO site_settings (key, value, updated_at)
       VALUES (?, ?, datetime('now'))
       ON CONFLICT(key) DO UPDATE SET
         value = excluded.value,
         updated_at = datetime('now')`,
    )
    .run(key, value);
}

export function getInquiryToEmailsSetting(): string {
  return getSetting(SETTING_INQUIRY_TO_EMAILS);
}

export type ProductReviewInput = {
  author_name: string;
  rating: number;
  title_sv: string;
  title_en: string;
  body_sv: string;
  body_en: string;
  published: number;
};

export function listProductReviews(
  productId: number,
  opts?: { includeDrafts?: boolean },
): DbProductReview[] {
  const includeDrafts = opts?.includeDrafts ?? true;
  const sql = includeDrafts
    ? `SELECT * FROM product_reviews WHERE product_id = ? ORDER BY created_at DESC, id DESC`
    : `SELECT * FROM product_reviews WHERE product_id = ? AND published = 1 ORDER BY created_at DESC, id DESC`;
  return getDb().prepare(sql).all(productId) as DbProductReview[];
}

export function listPublishedReviewsByProductSlug(
  slug: string,
): DbProductReview[] {
  return getDb()
    .prepare(
      `SELECT r.*
       FROM product_reviews r
       INNER JOIN products p ON p.id = r.product_id
       WHERE p.slug = ? AND r.published = 1 AND p.published = 1
       ORDER BY r.created_at DESC, r.id DESC`,
    )
    .all(slug) as DbProductReview[];
}

export function getProductReview(id: number): DbProductReview | undefined {
  return getDb()
    .prepare("SELECT * FROM product_reviews WHERE id = ?")
    .get(id) as DbProductReview | undefined;
}

export function createProductReview(
  productId: number,
  data: ProductReviewInput,
): number {
  const result = getDb()
    .prepare(
      `INSERT INTO product_reviews (
        product_id, author_name, rating,
        title_sv, title_en, body_sv, body_en, published
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      productId,
      data.author_name,
      data.rating,
      data.title_sv,
      data.title_en,
      data.body_sv,
      data.body_en,
      data.published,
    );
  return Number(result.lastInsertRowid);
}

export function updateProductReview(id: number, data: ProductReviewInput) {
  getDb()
    .prepare(
      `UPDATE product_reviews SET
        author_name = ?, rating = ?,
        title_sv = ?, title_en = ?, body_sv = ?, body_en = ?,
        published = ?, updated_at = datetime('now')
      WHERE id = ?`,
    )
    .run(
      data.author_name,
      data.rating,
      data.title_sv,
      data.title_en,
      data.body_sv,
      data.body_en,
      data.published,
      id,
    );
}

export function deleteProductReview(id: number) {
  getDb().prepare("DELETE FROM product_reviews WHERE id = ?").run(id);
}

export function setInquiryToEmailsSetting(value: string) {
  setSetting(SETTING_INQUIRY_TO_EMAILS, value);
}

export function getDashboardStats() {
  const database = getDb();
  const products = (
    database.prepare("SELECT COUNT(*) AS c FROM products").get() as { c: number }
  ).c;
  const published = (
    database
      .prepare("SELECT COUNT(*) AS c FROM products WHERE published = 1")
      .get() as { c: number }
  ).c;
  const categories = (
    database.prepare("SELECT COUNT(*) AS c FROM categories").get() as {
      c: number;
    }
  ).c;
  const inquiries = (
    database.prepare("SELECT COUNT(*) AS c FROM inquiries").get() as {
      c: number;
    }
  ).c;
  const newInquiries = (
    database
      .prepare("SELECT COUNT(*) AS c FROM inquiries WHERE status = 'new'")
      .get() as { c: number }
  ).c;
  const recentInquiries = database
    .prepare("SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 8")
    .all() as DbInquiry[];
  const monthly = database
    .prepare(
      `SELECT strftime('%Y-%m', created_at) AS month, COUNT(*) AS count
       FROM inquiries
       WHERE created_at >= datetime('now', '-11 months')
       GROUP BY month
       ORDER BY month ASC`,
    )
    .all() as { month: string; count: number }[];

  return {
    products,
    published,
    categories,
    inquiries,
    newInquiries,
    recentInquiries,
    monthly,
  };
}
