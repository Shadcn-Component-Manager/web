/**
 * GET /auth/callback
 * Handles GitHub OAuth callback and creates user session.
 *
 * @param {Request} request - The incoming OAuth callback request
 * @returns {Promise<NextResponse>} Redirect response with session cookie
 *
 * Query Parameters:
 * - code: string - OAuth authorization code from GitHub
 * - next: string - Redirect URL after successful authentication
 * - error: string - OAuth error code (if any)
 * - error_description: string - OAuth error description (if any)
 *
 * Success Response: Redirect to next URL with session cookie
 * Error Response: Redirect to sign-in page with error parameters
 */
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/account";
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");

  if (error) {
    return NextResponse.redirect(
      new URL(
        `/auth/sign-in?error=oauth&message=${encodeURIComponent(errorDescription || error)}`,
        requestUrl.origin,
      ),
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/auth/sign-in?error=no_code", requestUrl.origin),
    );
  }

  try {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("GitHub OAuth configuration is missing");
    }

    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
        }),
      },
    );

    if (!tokenResponse.ok) {
      throw new Error("Failed to exchange code for token");
    }

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      throw new Error(tokenData.error_description || tokenData.error);
    }

    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error("No access token received from GitHub");
    }

    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user data from GitHub");
    }

    const userData = await userResponse.json();

    if (!userData.id || !userData.login) {
      throw new Error("Invalid user data received from GitHub");
    }

    const sessionData = {
      accessToken,
      user: {
        id: userData.id,
        login: userData.login,
        name: userData.name || userData.login,
        email: userData.email,
        avatar_url: userData.avatar_url,
      },
      expiresAt: Date.now() + 8 * 60 * 60 * 1000, // 8 hours
      createdAt: Date.now(),
    };

    const response = NextResponse.redirect(new URL(next, requestUrl.origin));

    response.cookies.set("scm_session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 8 * 60 * 60, // 8 hours
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("OAuth callback error:", error);

    const errorMessage = error.message || "An unknown error occurred";
    return NextResponse.redirect(
      new URL(
        `/auth/sign-in?error=unknown&message=${encodeURIComponent(errorMessage)}`,
        requestUrl.origin,
      ),
    );
  }
}
