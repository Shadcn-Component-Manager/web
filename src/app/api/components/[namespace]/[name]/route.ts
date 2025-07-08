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

    // Get version from URL search params
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
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(component);
  } catch (error) {
    console.error("Failed to fetch component:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
