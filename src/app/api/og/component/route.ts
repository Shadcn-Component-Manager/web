import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const namespace = searchParams.get("namespace");
  const name = searchParams.get("name");
  const version = searchParams.get("version");

  if (!namespace || !name) {
    return new Response("Missing namespace or name", { status: 400 });
  }

  try {
    const componentUrl = new URL(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/components/${namespace}/${name}`,
    );
    if (version) {
      componentUrl.searchParams.set("version", version);
    }

    const componentRes = await fetch(componentUrl.toString());
    let description = "A shadcn-compatible component";

    if (componentRes.ok) {
      const componentData = await componentRes.json();
      description = componentData.component.description || description;
    }

    const svgContent = `
      <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="white"/>
        <text x="600" y="180" text-anchor="middle" font-size="48" font-weight="bold" fill="#1a1a1a" font-family="system-ui, sans-serif">${namespace}/${name}</text>
        ${version ? `<rect x="500" y="210" width="200" height="40" rx="20" fill="#BA271E"/><text x="600" y="238" text-anchor="middle" font-size="20" font-weight="600" fill="white" font-family="system-ui, sans-serif">v${version}</text>` : ""}
        <text x="600" y="300" text-anchor="middle" font-size="24" fill="#1a1a1a" font-family="system-ui, sans-serif">${description.length > 80 ? description.substring(0, 80) + "..." : description}</text>
        <rect x="400" y="370" width="400" height="50" rx="12" fill="#BA271E"/>
        <text x="600" y="402" text-anchor="middle" font-size="20" fill="white" font-family="monospace">npx scm add ${namespace}/${name}</text>
      </svg>
    `;

    return new Response(svgContent, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
