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
    // Fetch component data for description
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

    // Create SVG content as a string instead of JSX
    const svgContent = `
      <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
          </linearGradient>
          <radialGradient id="pattern1" cx="25%" cy="25%" r="50%">
            <stop offset="0%" style="stop-color:rgba(255,255,255,0.1);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgba(255,255,255,0);stop-opacity:1" />
          </radialGradient>
          <radialGradient id="pattern2" cx="75%" cy="75%" r="50%">
            <stop offset="0%" style="stop-color:rgba(255,255,255,0.1);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgba(255,255,255,0);stop-opacity:1" />
          </radialGradient>
        </defs>
        
        <!-- Background -->
        <rect width="1200" height="630" fill="url(#bg)"/>
        <rect width="1200" height="630" fill="url(#pattern1)"/>
        <rect width="1200" height="630" fill="url(#pattern2)"/>
        
        <!-- Component icon -->
        <rect x="550" y="120" width="100" height="100" rx="20" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
        <text x="600" y="175" text-anchor="middle" font-size="40" font-weight="bold" fill="white">🧩</text>
        
        <!-- Component name -->
        <text x="600" y="280" text-anchor="middle" font-size="48" font-weight="bold" fill="white" font-family="system-ui, sans-serif">${namespace}/${name}</text>
        
        <!-- Version badge -->
        ${
          version
            ? `<rect x="500" y="300" width="200" height="40" rx="20" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
        <text x="600" y="325" text-anchor="middle" font-size="18" font-weight="600" fill="white" font-family="system-ui, sans-serif">v${version}</text>`
            : ""
        }
        
        <!-- Description -->
        <text x="600" y="380" text-anchor="middle" font-size="24" fill="rgba(255,255,255,0.9)" font-family="system-ui, sans-serif">${description.length > 80 ? description.substring(0, 80) + "..." : description}</text>
        
        <!-- Install command -->
        <rect x="400" y="420" width="400" height="50" rx="12" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
        <text x="600" y="450" text-anchor="middle" font-size="20" fill="white" font-family="monospace">npx scm add ${namespace}/${name}</text>
        
        <!-- Bottom accent -->
        <rect x="0" y="622" width="1200" height="8" fill="url(#bg)"/>
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
