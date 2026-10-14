import { buildProductFeedJson } from "@/lib/seo/productFeed";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("lang") === "en" ? "en" : "sv";
  const body = buildProductFeedJson(locale);
  return Response.json(body, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
