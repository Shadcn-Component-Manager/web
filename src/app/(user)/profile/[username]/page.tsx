import { UserComponents } from "@/components/profile/user-components";
import { UserProfile } from "@/components/profile/user-profile";
import { UserStats } from "@/components/profile/user-stats";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/profile/${username}`,
      {
        next: { revalidate: 300 },
      },
    );
    if (!res.ok) notFound();
    const { user, components } = await res.json();

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 w-full py-8 flex flex-col gap-8">
          <UserProfile user={user} username={username} />

          <div className="flex flex-col lg:flex-row gap-8 w-full">
            <aside className="w-full lg:w-1/3 xl:w-1/4 flex-shrink-0 lg:sticky lg:top-24 space-y-6 mb-8 lg:mb-0">
              <UserStats components={components} />
            </aside>

            <main className="flex-1 min-w-0">
              <UserComponents components={components} username={username} />
            </main>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    notFound();
  }
}
