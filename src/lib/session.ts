import { cookies } from "next/headers";

export interface User {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  avatar_url: string;
}

export interface Session {
  accessToken: string;
  user: User;
  expiresAt: number;
  createdAt: number;
}

export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("scm_session");

    if (!sessionCookie?.value) {
      return null;
    }

    const session: Session = JSON.parse(sessionCookie.value);

    // Validate session structure
    if (!session.accessToken || !session.user || !session.expiresAt) {
      console.warn("Invalid session structure detected");
      cookieStore.delete("scm_session");
      return null;
    }

    // Check if session has expired
    if (Date.now() > session.expiresAt) {
      console.log("Session expired, clearing cookie");
      cookieStore.delete("scm_session");
      return null;
    }

    // Validate user data
    if (!session.user.id || !session.user.login) {
      console.warn("Invalid user data in session");
      cookieStore.delete("scm_session");
      return null;
    }

    return session;
  } catch (error) {
    console.error("Error parsing session:", error);
    // Clear potentially corrupt cookie
    try {
      (await cookies()).delete("scm_session");
    } catch (clearError) {
      console.error("Error clearing session cookie:", clearError);
    }
    return null;
  }
}

export async function clearSession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("scm_session");
  } catch (error) {
    console.error("Error clearing session:", error);
  }
}
