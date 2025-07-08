import { AccountSidebar } from "@/components/account/account-sidebar";
import { AccountTabs } from "@/components/account/account-tabs";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import Link from "next/link";

interface UserComponent {
  name: string;
  version: string;
  description: string;
  categories?: string[];
  lastUpdated: string;
}

export default async function AccountPage() {
  const session = await getSession();
  if (!session) {
    return (
      <div className="container mx-auto max-w-4xl py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
        <p className="text-muted-foreground mb-6">
          Please sign in to access your account dashboard.
        </p>
        <Button asChild>
          <Link href="/auth/sign-in">Sign In</Link>
        </Button>
      </div>
    );
  }

  let userComponents: UserComponent[] = [];
  try {
    const userComponentsRes = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/user/components`,
      {
        headers: {
          Cookie: `scm_session=${encodeURIComponent(JSON.stringify(session))}`,
        },
        next: { revalidate: 300 },
      },
    );
    if (userComponentsRes.ok) {
      const data = await userComponentsRes.json();
      userComponents = data.components;
    }
  } catch (error) {
    console.error("Failed to fetch user components:", error);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 w-full flex flex-col lg:flex-row gap-8">
        <AccountSidebar user={session.user} />
        <AccountTabs user={session.user} userComponents={userComponents} />
      </div>
    </div>
  );
}
