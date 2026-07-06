import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const suspicious = request.nextUrl.pathname.includes("..") || request.nextUrl.pathname.includes("%2e%2e");
  if (suspicious) return new NextResponse(null, { status: 400 });
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"]
};
