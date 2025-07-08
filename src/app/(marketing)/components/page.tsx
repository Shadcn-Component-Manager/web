import { ApiComponent } from "@/lib/types";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Explore and discover shadcn-compatible components shared by the community. Browse through a collection of UI components ready to use in your projects.",
  openGraph: {
    title: "Components - Shadcn Component Manager",
    description:
      "Explore and discover shadcn-compatible components shared by the community. Browse through a collection of UI components ready to use in your projects.",
    url: "/components",
  },
  twitter: {
    title: "Components - Shadcn Component Manager",
    description:
      "Explore and discover shadcn-compatible components shared by the community. Browse through a collection of UI components ready to use in your projects.",
  },
};

async function getComponents(): Promise<ApiComponent[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/components`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch components");
    }
    const data = await res.json();
    return data.components;
  } catch (err: any) {
    console.error(err);
    return [];
  }
}

export default async function ComponentsPage() {
  const components = await getComponents();

  return (
    <div className="container mx-auto max-w-7xl py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Explore Components
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover components shared by the community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.length === 0
          ? // Show skeleton loading when no components
            [...Array(9)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg border bg-card p-4 animate-pulse"
              >
                <div className="flex justify-between mb-2">
                  <div className="h-5 w-2/3 bg-muted rounded" />
                  <div className="h-4 w-12 bg-muted rounded" />
                </div>
                <div className="h-4 w-full bg-muted rounded mt-3" />
              </div>
            ))
          : components.map((component) => (
              <Link
                key={component.name}
                href={`/components/${component.author}/${component.name}`}
                className="rounded-lg border bg-card p-4 hover:bg-muted/50 transition-colors group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {component.author}/{component.name}
                  </h3>
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                    v{component.version}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {component.description}
                </p>
                {component.categories && component.categories.length > 0 && (
                  <div className="flex gap-1 mt-3 flex-wrap">
                    {component.categories.slice(0, 3).map((category, index) => (
                      <span
                        key={index}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                      >
                        {category}
                      </span>
                    ))}
                    {component.categories.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{component.categories.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            ))}
      </div>

      {components.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full animate-pulse" />
            <p className="text-lg font-medium">No components found</p>
            <p className="text-sm">Be the first to publish a component!</p>
          </div>
          <Link href="/publish">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Publish Your First Component
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
