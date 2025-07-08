import { UserComponents } from "@/components/profile/user-components";
import { UserProfile } from "@/components/profile/user-profile";
import { UserStats } from "@/components/profile/user-stats";
import { ApiComponent } from "@/lib/types";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata(
  { params }: ProfilePageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { username } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/profile/${username}`,
      { next: { revalidate: 300 } },
    );

    if (!res.ok) {
      return {
        title: `${username} - Profile Not Found`,
        description: `The profile for ${username} could not be found.`,
      };
    }

    const data = await res.json();
    const components: ApiComponent[] = data.components || [];

    const title = `${username} - Shadcn Component Manager`;
    const description = `${username} has published ${components.length} component${components.length !== 1 ? "s" : ""} to the SCM registry. Explore their shadcn-compatible components.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `/profile/${username}`,
        type: "profile",
        images: [
          {
            url: `/api/og/profile?username=${encodeURIComponent(username)}&count=${components.length}`,
            width: 1200,
            height: 630,
            alt: `${username} - ${components.length} components published`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [
          `/api/og/profile?username=${encodeURIComponent(username)}&count=${components.length}`,
        ],
      },
      alternates: {
        canonical: `/profile/${username}`,
      },
    };
  } catch (error) {
    return {
      title: `${username} - Profile Not Found`,
      description: `The profile for ${username} could not be found.`,
    };
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/profile/${username}`,
    { next: { revalidate: 300 } },
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  const components: ApiComponent[] = data.components || [];
  const user = data.user || null;

  return (
    <div className="min-h-screen py-6 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        <div className="lg:col-span-3 space-y-6">
          <UserProfile user={user} username={username} />
          <UserComponents components={components} username={username} />
        </div>

        <div className="space-y-4">
          <UserStats components={components} />
        </div>
      </div>
    </div>
  );
}
