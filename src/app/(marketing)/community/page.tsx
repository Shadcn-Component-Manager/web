import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { GitFork, Github, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

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

export const metadata: Metadata = {
  title: "Community",
  description:
    "Connect with fellow developers, share your components, and contribute to the SCM ecosystem. Join our growing community of shadcn component creators.",
  openGraph: {
    title: "Community - Shadcn Component Manager",
    description:
      "Connect with fellow developers, share your components, and contribute to the SCM ecosystem. Join our growing community of shadcn component creators.",
    url: "/community",
  },
  twitter: {
    title: "Community - Shadcn Component Manager",
    description:
      "Connect with fellow developers, share your components, and contribute to the SCM ecosystem. Join our growing community of shadcn component creators.",
  },
};

async function getCommunityData() {
  try {
    const componentsRes = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/components`,
      { next: { revalidate: 300 } },
    );

    if (!componentsRes.ok) {
      return { components: [], authors: [] };
    }

    const componentsData = await componentsRes.json();
    const components: RegistryComponent[] = componentsData.components;

    const authorMap = new Map<string, number>();
    components.forEach((component: RegistryComponent) => {
      const count = authorMap.get(component.author) || 0;
      authorMap.set(component.author, count + 1);
    });

    const authors: RegistryAuthor[] = Array.from(authorMap.entries())
      .map(([username, count]) => ({
        username,
        componentCount: count,
      }))
      .sort((a, b) => b.componentCount - a.componentCount);

    return { components, authors };
  } catch (error) {
    console.error("Failed to fetch community data:", error);
    return { components: [], authors: [] };
  }
}

export default async function CommunityPage() {
  const { components, authors } = await getCommunityData();

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

      <div className="grid grid-cols-3 p-0 gap-2 md:gap-6 mb-12">
        <Card>
          <CardContent className="p-2 md:p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <GitFork className="h-8 w-8 text-primary" />
            </div>
            <div className="text-2xl font-bold">{components.length}</div>
            <div className="text-sm text-muted-foreground">Components</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2 md:p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="text-2xl font-bold">{authors.length}</div>
            <div className="text-sm text-muted-foreground">Contributors</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2 md:p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Github className="h-8 w-8 text-primary" />
            </div>
            <div className="text-2xl font-bold">1</div>
            <div className="text-sm text-muted-foreground">Registry</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="flex flex-col h-[500px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Top Contributors
            </CardTitle>
            <CardDescription>
              Community members who have published the most components
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            {authors.length > 0 ? (
              <ScrollArea className="h-[320px] px-6">
                <div className="space-y-4 pr-4">
                  {authors.slice(0, 5).map((author, index) => (
                    <Link key={index} href={`/profile/${author.username}`}>
                      <div className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {author.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {author.username}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {author.componentCount} component
                            {author.componentCount !== 1 ? "s" : ""}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-shrink-0"
                        >
                          View Profile
                        </Button>
                      </div>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-8 text-muted-foreground h-[320px] flex flex-col items-center justify-center">
                <Users className="h-12 w-12 mb-4 opacity-50" />
                <p>No components published yet</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/components">View All Components</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col h-[500px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitFork className="h-5 w-5" />
              Recent Components
            </CardTitle>
            <CardDescription>
              Latest components added to the registry
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            {components.length > 0 ? (
              <ScrollArea className="h-[320px] px-6">
                <div className="space-y-4 pr-4">
                  {components.slice(0, 5).map((component, index) => (
                    <Link
                      key={index}
                      href={`/components/${component.author}/${component.name}`}
                    >
                      <div className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {component.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {component.author}/{component.name}
                          </div>
                          <div className="text-sm text-muted-foreground line-clamp-2">
                            {component.description}
                          </div>
                        </div>
                        <Badge variant="secondary" className="flex-shrink-0">
                          v{component.version}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-8 text-muted-foreground h-[320px] flex flex-col items-center justify-center">
                <GitFork className="h-12 w-12 mb-4 opacity-50" />
                <p>No components published yet</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/components">View All Components</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Separator className="my-12" />

      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Join the Community
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Start contributing to the SCM ecosystem by publishing your own
          shadcn-compatible components.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/publish">
            <Button>Publish Your First Component</Button>
          </Link>
          <Link href="/docs">
            <Button variant="outline">Read Documentation</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
