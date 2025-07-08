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

    // Get all components and filter by user
    const allComponents = await getComponents(octokit);
    const userComponents = allComponents.filter(
      (component) => component.author === params.username,
    );

    // Try to get GitHub user info
    let githubUser = null;
    try {
      const { data: user } = await octokit.users.getByUsername({
        username: params.username,
      });
      githubUser = user;
    } catch (error) {
      console.error("Failed to fetch GitHub user:", error);
    }

    // If no GitHub user and no components, return 404
    if (!githubUser && userComponents.length === 0) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json({
      user: githubUser,
      components: userComponents,
    });
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
