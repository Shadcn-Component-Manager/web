/**
 * GET /api/user
 * Returns the current user's session and profile info.
 *
 * @returns {Promise<NextResponse>} API response
 *
 * Success Response (200):
 * {
 *   user: {
 *     id: number;
 *     login: string;
 *     name: string;
 *     email: string;
 *     avatar_url: string;
 *     bio?: string;
 *     public_repos: number;
 *     followers: number;
 *     following: number;
 *     created_at: string;
 *   };
 *   session: {
 *     expiresAt: number;
 *     createdAt: number;
 *   };
 * }
 *
 * Unauthorized Response (401):
 * {
 *   error: string;
 *   message: string;
 * }
 *
 * Error Response (500):
 * {
 *   error: string;
 *   message: string;
 * }
 */
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized", message: "No valid session found" },
        { status: 401 },
      );
    }
    return NextResponse.json({
      user: session.user,
      session: {
        expiresAt: session.expiresAt,
        createdAt: session.createdAt,
      },
    });
  } catch (error) {
    console.error("User API error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to retrieve user data",
      },
      { status: 500 },
    );
  }
}
