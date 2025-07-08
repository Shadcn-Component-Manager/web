/**
 * GET /api/user/components
 * Returns all components owned by the current user.
 *
 * @returns {Promise<NextResponse>} API response
 *
 * Success Response (200):
 * {
 *   components: Array<{
 *     name: string;
 *     version: string;
 *     description: string;
 *     categories: string[];
 *     lastUpdated: string;
 *   }>;
 *   count: number;
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
import { Octokit } from "@octokit/rest";
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
    const octokit = new Octokit({ auth: session.accessToken });
    const { data: registryComponents } = await octokit.repos.getContent({
      owner: "Shadcn-Component-Manager",
      repo: "registry",
      path: "components",
    });
    const userComponents = [];
    if (Array.isArray(registryComponents)) {
      const userNamespace = registryComponents.find(
        (item) => item.type === "dir" && item.name === session.user.login,
      );
      if (userNamespace) {
        const { data: userComponentDirs } = await octokit.repos.getContent({
          owner: "Shadcn-Component-Manager",
          repo: "registry",
          path: `components/${session.user.login}`,
        });
        if (Array.isArray(userComponentDirs)) {
          for (const componentDir of userComponentDirs) {
            if (componentDir.type === "dir") {
              const { data: versions } = await octokit.repos.getContent({
                owner: "Shadcn-Component-Manager",
                repo: "registry",
                path: `components/${session.user.login}/${componentDir.name}`,
              });
              if (Array.isArray(versions)) {
                const latestVersion = versions
                  .filter((v) => v.type === "dir")
                  .sort((a, b) => b.name.localeCompare(a.name))[0];
                if (latestVersion) {
                  try {
                    const { data: registryJson } =
                      await octokit.repos.getContent({
                        owner: "Shadcn-Component-Manager",
                        repo: "registry",
                        path: `components/${session.user.login}/${componentDir.name}/${latestVersion.name}/registry.json`,
                      });
                    if ("content" in registryJson) {
                      const metadata = JSON.parse(
                        Buffer.from(registryJson.content, "base64").toString(),
                      );
                      let componentData = null;
                      if (
                        metadata.items &&
                        Array.isArray(metadata.items) &&
                        metadata.items.length > 0
                      ) {
                        componentData = metadata.items[0];
                      } else if (metadata.name && metadata.type) {
                        componentData = metadata;
                      } else if (metadata.component) {
                        componentData = metadata.component;
                      }
                      if (componentData) {
                        userComponents.push({
                          name: componentDir.name,
                          version: latestVersion.name,
                          description:
                            componentData.description ||
                            "No description available",
                          categories: componentData.categories || [],
                          lastUpdated: latestVersion.name, // Using version as date for now
                        });
                      }
                    }
                  } catch (error) {
                    console.error(
                      `Failed to fetch metadata for ${componentDir.name}:`,
                      error,
                    );
                  }
                }
              }
            }
          }
        }
      }
    }
    return NextResponse.json({
      components: userComponents,
      count: userComponents.length,
    });
  } catch (error) {
    console.error("Failed to fetch user components:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to fetch user components",
      },
      { status: 500 },
    );
  }
}
