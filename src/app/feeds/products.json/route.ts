import { buildProductFeedJson } from "@/lib/seo/productFeed";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  const body = buildProductFeedJson("sv");
  return Response.json(body, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
