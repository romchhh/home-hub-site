# HOME HUB — Next.js

Сайт бренду HOME HUB на **Next.js**, **React** та **TypeScript**.

## Запуск

```bash
npm install
cp .env.example .env.local   # SITE_URL + ADMIN_USER / ADMIN_PASS
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000) — за замовчуванням шведська (`/sv`), англійська: `/en`.

## Admin

- URL: `/admin` (login: `/admin/login`)
- Auth: `ADMIN_USER` / `ADMIN_PASS` in `.env.local`
- DB: SQLite at `data/homehub.db` (auto-created + seeded from catalogue)
- Sections: Dashboard, Products, Categories, Inquiries, Media
- UI language: English

## SEO

- `src/app/sitemap.ts` — sitemap з hreflang (sv/en) і сторінками моделей
- `src/app/robots.ts` — robots.txt
- `src/app/llms.txt/route.ts` — llms.txt для AI-краулерів
- `src/lib/seo/` — metadata, JSON-LD (Organization, WebSite, Product, BreadcrumbList)
- `next.config.ts` — редіректи без локалі → `/sv/…`, `/uk` → `/sv`
- `NEXT_PUBLIC_SITE_URL` — канонічний домен (див. `.env.example`)

## Структура

- `src/app/[locale]/` — сторінки (головна, про нас, каталог, моделі дверей, послуги, контакт)
- `src/dictionaries/` — тексти SV / EN
- `public/logos/` — wordmark (`wordmark-dark.webp`)
- `public/icon.png`, `public/apple-touch-icon.png` — favicon
- `public/images/` — фото продукції
