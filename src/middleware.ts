import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminDbEnabled } from "@/lib/adminDbEnabled";
import { defaultLocale, isLocale } from "@/lib/i18n";

function isAdminAuthed(request: NextRequest): boolean {
  const authCookie = request.cookies.get("admin_auth");
  if (!authCookie) return false;
  try {
    const decoded = Buffer.from(authCookie.value, "base64").toString();
    const [user, password] = decoded.split(":");
    return (
      user === process.env.ADMIN_USER && password === process.env.ADMIN_PASS
    );
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminDbOn = isAdminDbEnabled();

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin") ||
    pathname.startsWith("/api/auth")
  ) {
    if (!adminDbOn) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          { error: "Admin panel is temporarily disabled" },
          { status: 503 },
        );
      }
      const url = request.nextUrl.clone();
      url.pathname = `/${defaultLocale}`;
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/admin")) {
    const authed = isAdminAuthed(request);
    if (pathname === "/admin/login") {
      if (authed) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }
    if (!authed) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/sitemaps/") ||
    pathname === "/llms.txt" ||
    pathname === "/llms-full.txt" ||
    pathname === "/manifest.webmanifest" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segment = pathname.split("/")[1];
  if (segment === "uk") {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/uk/, "/sv");
    return NextResponse.redirect(url);
  }
  if (isLocale(segment)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip upload API so large multipart bodies are not buffered/truncated by middleware.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/admin/uploads).*)",
  ],
};
