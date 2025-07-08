import { ImageResponse } from "next/og";
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
      
      <!-- User avatar -->
      <circle cx="600" cy="180" r="60" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="3"/>
      <text x="600" y="195" text-anchor="middle" font-size="48" font-weight="bold" fill="white" font-family="system-ui, sans-serif">${username.charAt(0).toUpperCase()}</text>
      
      <!-- Username -->
      <text x="600" y="280" text-anchor="middle" font-size="48" font-weight="bold" fill="white" font-family="system-ui, sans-serif">@${username}</text>
      
      <!-- Component count -->
      <rect x="450" y="300" width="300" height="50" rx="25" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
      <text x="600" y="330" text-anchor="middle" font-size="24" font-weight="600" fill="white" font-family="system-ui, sans-serif">${componentCount} component${componentCount !== 1 ? "s" : ""} published</text>
      
      <!-- Description -->
      <text x="600" y="380" text-anchor="middle" font-size="24" fill="rgba(255,255,255,0.9)" font-family="system-ui, sans-serif">${
        componentCount > 0
          ? `Explore ${username}'s shadcn-compatible components`
          : `${username} is a member of the SCM community`
      }</text>
      
      <!-- Stats -->
      <g transform="translate(400, 420)">
        <text x="100" y="0" text-anchor="middle" font-size="32" font-weight="bold" fill="rgba(255,255,255,0.8)" font-family="system-ui, sans-serif">${componentCount}</text>
        <text x="100" y="25" text-anchor="middle" font-size="16" fill="rgba(255,255,255,0.8)" font-family="system-ui, sans-serif">Components</text>
      </g>
      <g transform="translate(700, 420)">
        <text x="100" y="0" text-anchor="middle" font-size="32" font-weight="bold" fill="rgba(255,255,255,0.8)" font-family="system-ui, sans-serif">SCM</text>
        <text x="100" y="25" text-anchor="middle" font-size="16" fill="rgba(255,255,255,0.8)" font-family="system-ui, sans-serif">Registry</text>
      </g>
      
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
}
