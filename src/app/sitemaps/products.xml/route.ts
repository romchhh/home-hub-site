import { buildProductsSitemapXml, sitemapResponseHeaders } from "@/lib/seo/sitemapXml";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  return new Response(buildProductsSitemapXml(), { headers: sitemapResponseHeaders });
}
