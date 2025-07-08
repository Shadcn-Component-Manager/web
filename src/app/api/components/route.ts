/**
 * GET /api/components
 * Returns all components in the registry.
 *
 * @returns {Promise<NextResponse>} API response
 *
 * Success Response (200):
 * {
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

export async function GET() {
  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const components = await getComponents(octokit);
    return NextResponse.json({
      components,
      count: components.length,
      revalidated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to fetch components:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to fetch components" },
      { status: 500 },
    );
  }
}
