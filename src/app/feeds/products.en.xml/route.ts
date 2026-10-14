import { buildGoogleProductFeedXml } from "@/lib/seo/productFeed";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  const xml = buildGoogleProductFeedXml("en");
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
