"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GitFork, Github, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RegistryComponent {
  name: string;
  author: string;
  description: string;
  version: string;
  categories?: string[];
}

interface RegistryAuthor {
  username: string;
  componentCount: number;
}

export default function CommunityPage() {
  const [components, setComponents] = useState<RegistryComponent[]>([]);
  const [authors, setAuthors] = useState<RegistryAuthor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCommunityData() {
      try {
        // Fetch all components from the registry
        const componentsRes = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/components`,
        );
        if (componentsRes.ok) {
          const componentsData = await componentsRes.json();
          setComponents(componentsData);

          // Calculate authors and their component counts
          const authorMap = new Map<string, number>();
          componentsData.forEach((component: RegistryComponent) => {
            const count = authorMap.get(component.author) || 0;
            authorMap.set(component.author, count + 1);
          });

          const authorsData = Array.from(authorMap.entries())
            .map(([username, count]) => ({
              username,
              componentCount: count,
            }))
            .sort((a, b) => b.componentCount - a.componentCount);

          setAuthors(authorsData);
        }
      } catch (error) {
        console.error("Failed to fetch community data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCommunityData();
  }, []);

  return (
    <div className="container mx-auto max-w-7xl py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Community Hub
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with fellow developers, share your components, and contribute
          to the SCM ecosystem.
        </p>
      </div>

      {/* Registry Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <GitFork className="h-8 w-8 text-primary" />
            </div>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-12 bg-muted rounded animate-pulse mx-auto" />
              ) : (
                components.length
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Total Components
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-12 bg-muted rounded animate-pulse mx-auto" />
              ) : (
                authors.length
              )}
            </div>
            <div className="text-sm text-muted-foreground">Contributors</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Github className="h-8 w-8 text-primary" />
            </div>
            <div className="text-2xl font-bold">1</div>
            <div className="text-sm text-muted-foreground">Registry</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Top Contributors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Top Contributors
            </CardTitle>
            <CardDescription>
              Community members who have published the most components
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-lg border"
                  >
                    <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                      <div className="h-3 w-32 bg-muted rounded animate-pulse" />
                    </div>
                    <div className="h-8 w-20 bg-muted rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : authors.length > 0 ? (
              <>
                <div className="space-y-4">
                  {authors.slice(0, 5).map((author, index) => (
                    <Link key={index} href={`/profile/${author.username}`}>
                      <div className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {author.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{author.username}</div>
                          <div className="text-sm text-muted-foreground">
                            {author.componentCount} component
                            {author.componentCount !== 1 ? "s" : ""}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/components">View All Components</Link>
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No components published yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Components */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitFork className="h-5 w-5" />
              Recent Components
            </CardTitle>
            <CardDescription>
              Latest components added to the registry
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="p-3 rounded-lg border">
                    <div className="flex items-start justify-between mb-2">
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                        <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                      </div>
                    </div>
                    <div className="h-3 w-full bg-muted rounded animate-pulse mb-2" />
                    <div className="flex gap-1">
                      {[...Array(2)].map((_, j) => (
                        <div
                          key={j}
                          className="h-5 w-12 bg-muted rounded animate-pulse"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : components.length > 0 ? (
              <>
                <div className="space-y-4">
                  {components.slice(0, 5).map((component, index) => (
                    <Link
                      key={index}
                      href={`/components/${component.author}/${component.name}`}
                    >
                      <div className="p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-medium">
                              {component.author}/{component.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              v{component.version}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {component.description}
                        </p>
                        {component.categories &&
                          component.categories.length > 0 && (
                            <div className="mt-2 flex gap-1">
                              {component.categories
                                .slice(0, 3)
                                .map((category, catIndex) => (
                                  <Badge
                                    key={catIndex}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {category}
                                  </Badge>
                                ))}
                            </div>
                          )}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/components">Browse All Components</Link>
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <GitFork className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No components available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Separator className="my-12" />

      {/* Get Started Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to contribute?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join the community by publishing your own shadcn/ui components. Use
          the SCM CLI to create, develop, and publish components to the
          registry.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/publish">Publish Component</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs">Read Documentation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
