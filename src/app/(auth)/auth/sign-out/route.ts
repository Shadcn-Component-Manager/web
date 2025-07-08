import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });

    // Clear the cookie in the response
    response.cookies.delete("scm_session");

    return response;
  } catch (error) {
    console.error("Sign out error:", error);
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
  }
}

export async function GET() {
  // Redirect to sign-in page after clearing session
  try {
    const response = NextResponse.redirect(
      new URL(
        "/auth/sign-in",
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      ),
    );

    // Clear the cookie in the response
    response.cookies.delete("scm_session");

    return response;
  } catch (error) {
    console.error("Sign out error:", error);
    return NextResponse.redirect(
      new URL(
        "/auth/sign-in",
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      ),
    );
  }
}
