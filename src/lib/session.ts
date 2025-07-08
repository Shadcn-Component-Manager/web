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
}

export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("scm_session");

    if (!sessionCookie?.value) {
      return null;
    }

    const session: Session = JSON.parse(sessionCookie.value);

    if (Date.now() > session.expiresAt) {
      // Clear the expired cookie
      cookieStore.delete("scm_session");
      return null;
    }

    return session;
  } catch (error) {
    console.error("Error parsing session:", error);
    // Clear potentially corrupt cookie
    (await cookies()).delete("scm_session");
    return null;
  }
}
