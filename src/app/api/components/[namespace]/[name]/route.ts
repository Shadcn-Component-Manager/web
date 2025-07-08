/**
 * GET /api/components/[namespace]/[name]
 * Returns a specific component by namespace and name (optionally version).
 *
 * @param {Request} req - The incoming request
 * @param {Promise<{ params: Promise<{ namespace: string; name: string }> }>} context - Route context with params
 * @returns {Promise<NextResponse>} API response
 *
 * Success Response (200):
 * {
 *   component: {
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
 *   };
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
import { getComponent } from "@/lib/registry";
import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";

export const revalidate = 300; // Revalidate every 5 minutes

export async function GET(
  req: Request,
  context: Promise<{ params: Promise<{ namespace: string; name: string }> }>,
) {
  try {
    const resolvedContext = await context;
    const params = await resolvedContext.params;
    const url = new URL(req.url);
    const version = url.searchParams.get("version");
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const component = await getComponent(
      octokit,
      params.namespace,
      params.name,
      version,
    );
    if (!component) {
      return NextResponse.json(
        { error: "Not Found", message: "Component not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({
      component,
      revalidated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to fetch component:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to fetch component" },
      { status: 500 },
    );
  }
}
