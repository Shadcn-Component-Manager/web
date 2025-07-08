"use client";

import { SearchTrigger } from "@/components/shared/search-trigger";
import { ApiComponent } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [recentComponents, setRecentComponents] = useState<ApiComponent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const componentsRes = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/components`,
        );

        if (!componentsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const componentsData = await componentsRes.json();

        // Assuming the API returns components sorted by recent first
        setRecentComponents(componentsData.slice(0, 6));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto max-w-7xl relative">
      <section className="mx-auto max-w-3xl text-center py-20">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Build and share components with the community
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Discover, publish, and install shadcn-compatible components. Powered
          by a GitHub-based registry.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="relative w-full max-w-lg">
            <SearchTrigger variant="homepage" />
          </div>
        </div>
      </section>

      <section className="py-10">
        <h2 className="text-2xl font-semibold tracking-tight">
          Recently Updated
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border bg-card p-4 animate-pulse"
                >
                  <div className="h-5 w-2/3 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded mt-3" />
                  <div className="h-4 w-1/3 bg-muted rounded mt-4" />
                </div>
              ))
            : recentComponents.map((component) => (
                <Link
                  key={component.name}
                  href={`/components/${component.author}/${component.name}`}
                >
                  <div className="rounded-lg border bg-card p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="font-semibold">
                      {component.author}/{component.name}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground truncate">
                      {component.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        v{component.version}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </section>
    </div>
  );
}
