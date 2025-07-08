import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const count = searchParams.get("count");

  if (!username) {
    return new Response("Missing username", { status: 400 });
  }

  const componentCount = parseInt(count || "0");

  const svgContent = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="white"/>
      <text x="600" y="180" text-anchor="middle" font-size="48" font-weight="bold" fill="#1a1a1a" font-family="system-ui, sans-serif">@${username}</text>
      <rect x="500" y="210" width="200" height="40" rx="20" fill="#BA271E"/>
      <text x="600" y="235" text-anchor="middle" font-size="16" font-weight="600" fill="white" font-family="system-ui, sans-serif">${componentCount} component${componentCount !== 1 ? "s" : ""} published</text>
      <text x="600" y="300" text-anchor="middle" font-size="24" fill="#1a1a1a" font-family="system-ui, sans-serif">${componentCount > 0 ? `Explore ${username}'s scm profile` : `${username} is a member of the SCM community`}</text>
    </svg>
  `;

  return new Response(svgContent, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
