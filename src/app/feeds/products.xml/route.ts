import { buildGoogleProductFeedXml } from "@/lib/seo/productFeed";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("lang") === "en" ? "en" : "sv";
  const xml = buildGoogleProductFeedXml(locale);
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
