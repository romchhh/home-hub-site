import { buildGoogleProductFeedXml } from "@/lib/seo/productFeed";

/** Static feed snapshot; rebuild or wait for revalidate after catalogue changes. */
export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  const xml = buildGoogleProductFeedXml("sv");
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
