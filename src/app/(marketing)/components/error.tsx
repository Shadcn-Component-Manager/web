"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, Package, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ComponentsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Components page error:", error);
  }, [error]);

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

      <div className="max-w-2xl mx-auto">
        <Card className="border-destructive/50">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-xl">Failed to load components</CardTitle>
            <CardDescription>
              We encountered an error while fetching the component list. This
              might be a temporary issue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Error:</strong>{" "}
                {error.message || "Failed to fetch components"}
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={reset} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
              <Button variant="outline" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                Still having issues? Try these alternatives:
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/community">Community Hub</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="https://scm.mintlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Documentation
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="https://scm.mintlify.app/cli/publish"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Publish Component
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
