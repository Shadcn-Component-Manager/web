import { Octokit } from "@octokit/rest";
import pLimit from "p-limit";
import { RegistryItem, registryItemSchema } from "./types";

const REPO_OWNER = "Shadcn-Component-Manager";
const REPO_NAME = "registry";

interface ComponentIdentifier {
  namespace: string;
  name: string;
  version: string;
  path: string;
}

let componentTreeCache: ComponentIdentifier[] | null = null;
let componentTreeCacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getComponentTree(
  octokit: Octokit,
): Promise<ComponentIdentifier[]> {
  const now = Date.now();
  if (componentTreeCache && now - componentTreeCacheTimestamp < CACHE_TTL) {
    return componentTreeCache;
  }

  const { data: mainBranch } = await octokit.repos.getBranch({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    branch: "main",
  });

  const treeSha = mainBranch.commit.sha;

  const { data: tree } = await octokit.git.getTree({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    tree_sha: treeSha,
    recursive: "1",
  });

  const componentIdentifiers: ComponentIdentifier[] = [];
  const regex = /^components\/([^/]+)\/([^/]+)\/([^/]+)\/registry\.json$/;

  for (const item of tree.tree) {
    if (item.path && item.type === "blob") {
      const match = item.path.match(regex);
      if (match) {
        componentIdentifiers.push({
          namespace: match[1],
          name: match[2],
          version: match[3],
          path: item.path,
        });
      }
    }
  }

  componentTreeCache = componentIdentifiers;
  componentTreeCacheTimestamp = now;

  return componentIdentifiers;
}

export async function getComponents(octokit: Octokit) {
  const tree = await getComponentTree(octokit);
  const componentMap = new Map<
    string,
    RegistryItem & { version: string; author: string }
  >();
  const limit = pLimit(10);

  const promises = tree.map((identifier) =>
    limit(async () => {
      try {
        const { data: content } = await octokit.repos.getContent({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          path: identifier.path,
          ref: "main",
        });

        if ("content" in content) {
          const fileContent = Buffer.from(content.content, "base64").toString(
            "utf-8",
          );
          const registryData = JSON.parse(fileContent);

          // Try different possible structures
          let componentData = null;

          // Check if it has an items array (shadcn format)
          if (
            registryData.items &&
            Array.isArray(registryData.items) &&
            registryData.items.length > 0
          ) {
            componentData = registryData.items[0];
          }
          // Check if it's a direct component object
          else if (registryData.name && registryData.type) {
            componentData = registryData;
          }
          // Check if it's wrapped in a different structure
          else if (registryData.component) {
            componentData = registryData.component;
          }

          if (!componentData) {
            console.error(
              `No component data found in ${identifier.path}. Available keys:`,
              Object.keys(registryData),
            );
            return;
          }

          const parsed = registryItemSchema.safeParse(componentData);
          if (parsed.success) {
            const fullName = `${identifier.namespace}/${identifier.name}`;
            if (
              !componentMap.has(fullName) ||
              identifier.version > componentMap.get(fullName)!.version
            ) {
              componentMap.set(fullName, {
                ...parsed.data,
                version: identifier.version,
                author: identifier.namespace,
              });
            }
          }
        }
      } catch (error) {
        console.error(`Failed to fetch or parse ${identifier.path}:`, error);
      }
    }),
  );

  await Promise.all(promises);
  return Array.from(componentMap.values());
}

export async function getComponent(
  octokit: Octokit,
  namespace: string,
  name: string,
  version?: string | null,
) {
  const tree = await getComponentTree(octokit);
  const componentVersions = tree.filter(
    (c) => c.namespace === namespace && c.name === name,
  );

  if (componentVersions.length === 0) {
    return null;
  }

  // If a specific version is requested, find it
  let targetVersion = componentVersions.reduce((latest, current) =>
    current.version > latest.version ? current : latest,
  );

  if (version) {
    const specificVersion = componentVersions.find(
      (v) => v.version === version,
    );
    if (specificVersion) {
      targetVersion = specificVersion;
    } else {
      console.warn(
        `Version ${version} not found, using latest version ${targetVersion.version}`,
      );
    }
  }

  try {
    // First, fetch the registry.json file for the target version
    const { data: registryContent } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: targetVersion.path,
      ref: "main",
    });

    if (!("content" in registryContent)) {
      throw new Error("Registry file not found");
    }

    const registryJsonString = Buffer.from(
      registryContent.content,
      "base64",
    ).toString("utf-8");
    const registryJson = JSON.parse(registryJsonString);

    console.log("Registry JSON structure:", Object.keys(registryJson));
    console.log(
      "Registry JSON content:",
      JSON.stringify(registryJson, null, 2),
    );

    // Try different possible structures
    let componentData = null;

    // Check if it has an items array (shadcn format)
    if (
      registryJson.items &&
      Array.isArray(registryJson.items) &&
      registryJson.items.length > 0
    ) {
      componentData = registryJson.items[0];
    }
    // Check if it's a direct component object
    else if (registryJson.name && registryJson.type) {
      componentData = registryJson;
    }
    // Check if it's wrapped in a different structure
    else if (registryJson.component) {
      componentData = registryJson.component;
    }

    if (!componentData) {
      console.error(
        "No component data found in registry.json. Available keys:",
        Object.keys(registryJson),
      );
      return null;
    }

    const parsed = registryItemSchema.safeParse(componentData);
    if (!parsed.success) {
      console.error("Failed to parse component data:", parsed.error);
      console.error("Component data:", componentData);
      return null;
    }

    // Now fetch all the component files
    const componentDir = targetVersion.path.substring(
      0,
      targetVersion.path.lastIndexOf("/"),
    );
    const fileContents: Record<string, string> = {};

    // Fetch each file listed in the registry.json
    for (const file of parsed.data.files) {
      try {
        const filePath = `${componentDir}/${file.path}`;
        const { data: fileContent } = await octokit.repos.getContent({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          path: filePath,
          ref: "main",
        });

        if ("content" in fileContent) {
          const content = Buffer.from(fileContent.content, "base64").toString(
            "utf-8",
          );
          fileContents[file.path] = content;
        }
      } catch (error) {
        console.error(`Failed to fetch file ${file.path}:`, error);
        // Continue with other files even if one fails
      }
    }

    // Also try to fetch README.md if it exists
    try {
      const readmePath = `${componentDir}/README.md`;
      const { data: readmeContent } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: readmePath,
        ref: "main",
      });

      if ("content" in readmeContent) {
        const content = Buffer.from(readmeContent.content, "base64").toString(
          "utf-8",
        );
        fileContents["README.md"] = content;
      }
    } catch (error) {
      // README.md is optional, so we don't log this as an error
    }

    return {
      ...parsed.data,
      version: targetVersion.version,
      author: targetVersion.namespace,
      allVersions: componentVersions
        .map((v) => v.version)
        .sort()
        .reverse(),
      files: parsed.data.files.map((f) => ({
        ...f,
        content: fileContents[f.path] || "",
      })),
    };
  } catch (error) {
    console.error(`Failed to fetch component ${namespace}/${name}:`, error);
    return null;
  }
}
