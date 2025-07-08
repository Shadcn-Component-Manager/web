import { getSession } from "@/lib/session";
import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const octokit = new Octokit({ auth: session.accessToken });

    // Get components from the SCM registry that belong to this user
    const { data: registryComponents } = await octokit.repos.getContent({
      owner: "Shadcn-Component-Manager",
      repo: "registry",
      path: "components",
    });

    const userComponents = [];

    if (Array.isArray(registryComponents)) {
      // Find user's namespace in the registry
      const userNamespace = registryComponents.find(
        (item) => item.type === "dir" && item.name === session.user.login,
      );

      if (userNamespace) {
        // Get user's components
        const { data: userComponentDirs } = await octokit.repos.getContent({
          owner: "Shadcn-Component-Manager",
          repo: "registry",
          path: `components/${session.user.login}`,
        });

        if (Array.isArray(userComponentDirs)) {
          for (const componentDir of userComponentDirs) {
            if (componentDir.type === "dir") {
              // Get the latest version
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
                  // Get component metadata
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

                      // Try different possible structures
                      let componentData = null;

                      // Check if it has an items array (shadcn format)
                      if (
                        metadata.items &&
                        Array.isArray(metadata.items) &&
                        metadata.items.length > 0
                      ) {
                        componentData = metadata.items[0];
                      }
                      // Check if it's a direct component object
                      else if (metadata.name && metadata.type) {
                        componentData = metadata;
                      }
                      // Check if it's wrapped in a different structure
                      else if (metadata.component) {
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

    return NextResponse.json(userComponents);
  } catch (error) {
    console.error("Failed to fetch user components:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
