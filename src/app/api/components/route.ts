import { getComponents } from "@/lib/registry";
import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";

export const revalidate = 300; // Revalidate every 5 minutes

export async function GET() {
  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const components = await getComponents(octokit);
    return NextResponse.json(components);
  } catch (error) {
    console.error("Failed to fetch components:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
