/**
 * POST /auth/sign-out
 * Signs out the user by clearing session cookie and returns JSON response.
 *
 * @returns {Promise<NextResponse>} JSON response indicating sign-out status
 *
 * Success Response (200):
 * {
 *   success: boolean;
 *   message: string;
 * }
 *
 * Error Response (500):
 * {
 *   error: string;
 * }
 */

/**
 * GET /auth/sign-out
 * Signs out the user by clearing session cookie and redirects to sign-in page.
 *
 * @returns {Promise<NextResponse>} Redirect response to sign-in page
 *
 * Success Response: Redirect to /auth/sign-in
 * Error Response: Redirect to /auth/sign-in (with fallback)
 */
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Successfully signed out",
    });

    response.cookies.delete("scm_session");

    return response;
  } catch (error) {
    console.error("Sign out error:", error);
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const response = NextResponse.redirect(
      new URL(
        "/auth/sign-in",
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      ),
    );

    response.cookies.delete("scm_session");

    return response;
  } catch (error) {
    console.error("Sign out error:", error);

    const fallbackResponse = NextResponse.redirect(
      new URL(
        "/auth/sign-in",
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      ),
    );

    fallbackResponse.cookies.delete("scm_session");

    return fallbackResponse;
  }
}
