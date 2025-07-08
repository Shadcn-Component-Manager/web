import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get session from cookies
  const sessionCookie = request.cookies.get("scm_session");
  const hasValidSession =
    sessionCookie?.value &&
    (() => {
      try {
        const session = JSON.parse(sessionCookie.value);
        return Date.now() < session.expiresAt;
      } catch {
        return false;
      }
    })();

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/auth/sign-in",
    "/auth/callback",
    "/auth/sign-out",
    "/components",
    "/community",
    "/terms",
    "/privacy",
    "/license",
  ];

  // Check if current path is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // API routes that don't require authentication
  const publicApiRoutes = ["/api/components", "/api/profile"];

  const isPublicApiRoute = publicApiRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // If it's a public route or public API route, allow access
  if (isPublicRoute || isPublicApiRoute) {
    return NextResponse.next();
  }

  // If user is not authenticated and trying to access protected routes
  if (!hasValidSession) {
    // For API routes, return 401
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // For other routes, redirect to sign-in
    const signInUrl = new URL("/auth/sign-in", request.url);
    signInUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If user is authenticated and trying to access auth routes, redirect to account
  if (hasValidSession && pathname.startsWith("/auth/")) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
