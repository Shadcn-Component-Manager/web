/**
 * GET /api/profile/[username]
 * Returns the profile and components for a given username.
 *
 * @param {Request} req - The incoming request
 * @param {Promise<{ params: Promise<{ username: string }> }>} context - Route context with params
 * @returns {Promise<NextResponse>} API response
 *
 * Success Response (200):
 * {
 *   user: {
 *     login: string;
 *     id: number;
 *     name: string;
 *     avatar_url: string;
 *     bio?: string;
 *     public_repos: number;
 *     followers: number;
 *     following: number;
 *     created_at: string;
 *   } | null;
 *   components: Array<{
 *     name: string;
 *     author: string;
 *     version: string;
 *     description: string;
 *     files: Array<{
 *       path: string;
 *       content: string;
 *     }>;
 *     dependencies: string[];
 *     registryDependencies: string[];
 *     categories: string[];
 *     publishedAt: string;
 *     readme?: string;
 *     docs?: string;
 *   }>;
 *   count: number;
 *   revalidated: string;
 * }
 *
 * Not Found Response (404):
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
import { getComponents } from "@/lib/registry";
import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";

export const revalidate = 300; // Revalidate every 5 minutes

export async function GET(
  req: Request,
  context: Promise<{ params: Promise<{ username: string }> }>,
) {
  try {
    const resolvedContext = await context;
    const params = await resolvedContext.params;
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const allComponents = await getComponents(octokit);
    const userComponents = allComponents.filter(
      (component) => component.author === params.username,
    );
    let githubUser = null;
    try {
      const { data: user } = await octokit.users.getByUsername({
        username: params.username,
      });
      githubUser = user;
    } catch (error) {
      console.error("Failed to fetch GitHub user:", error);
    }
    if (!githubUser && userComponents.length === 0) {
      return NextResponse.json(
        { error: "Not Found", message: "User not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({
      user: githubUser,
      components: userComponents,
      count: userComponents.length,
      revalidated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to fetch profile" },
      { status: 500 },
    );
  }
}
