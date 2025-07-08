import { AccountSidebar } from "@/components/account/account-sidebar";
import { AccountTabs } from "@/components/account/account-tabs";
import { getSession } from "@/lib/session";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Account",
  description:
    "Manage your SCM account, view your published components, and update your profile settings.",
  robots: {
    index: false,
    follow: false,
  },
};

interface UserComponent {
  name: string;
  version: string;
  description: string;
  categories?: string[];
  lastUpdated: string;
}

export default async function AccountPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/auth/sign-in");
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
    <div className="min-h-screen py-6 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        <div className="lg:col-span-1">
          <AccountSidebar user={session.user} />
        </div>
        <div className="lg:col-span-3">
          <AccountTabs user={session.user} userComponents={userComponents} />
        </div>
      </div>
    </div>
  );
}
