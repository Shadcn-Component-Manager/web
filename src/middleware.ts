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

  // Check origin for API routes
  if (pathname.startsWith("/api/")) {
    const origin = request.headers.get("origin");
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "https://scm-registry.vercel.app",
    ];
    
    // Allow requests from our own origin or no origin (server-side requests)
    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json(
        { error: "Forbidden", message: "Invalid origin" },
        { status: 403 }
      );
    }
  }

  // Only protect /account route
  if (pathname.startsWith("/account")) {
    if (!hasValidSession) {
      const signInUrl = new URL("/auth/sign-in", request.url);
      signInUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // If user is authenticated and trying to access auth routes, redirect to account
  if (hasValidSession && pathname.startsWith("/auth/")) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  // Allow all other routes to pass through
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
