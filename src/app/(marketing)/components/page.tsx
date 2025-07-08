"use client";

import { ApiComponent } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ComponentsPage() {
  const [components, setComponents] = useState<ApiComponent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComponents() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/components`,
        );
        if (!res.ok) {
          throw new Error("Failed to fetch components");
        }
        const data = await res.json();
        setComponents(data.components);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchComponents();
  }, []);

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

      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? [...Array(9)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg border bg-card p-4 animate-pulse"
              >
                <div className="h-5 w-2/3 bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded mt-3" />
                <div className="h-4 w-1/3 bg-muted rounded mt-4" />
              </div>
            ))
          : components.map((component) => (
              <Link
                key={component.name}
                href={`/components/${component.author}/${component.name}`}
                className="rounded-lg border bg-card p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold">
                    {component.author}/{component.name}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    v{component.version}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground truncate">
                  {component.description}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
}
