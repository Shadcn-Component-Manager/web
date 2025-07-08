import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GitFork, Users } from "lucide-react";

export default function CommunityLoading() {
  return (
    <div className="container mx-auto max-w-7xl py-10">
      {/* Header Skeleton */}
      <div className="text-center mb-12">
        <div className="h-10 w-1/3 bg-muted rounded animate-pulse mx-auto" />
        <div className="h-6 w-1/2 bg-muted rounded animate-pulse mx-auto mt-4" />
      </div>

      {/* Registry Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-8 w-16 bg-muted rounded animate-pulse mx-auto mb-2" />
              <div className="h-4 w-24 bg-muted rounded animate-pulse mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Top Contributors Skeleton */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <div className="h-6 w-32 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-4 w-64 bg-muted rounded animate-pulse" />
          </CardHeader>
          <CardContent>
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
            <div className="mt-4">
              <div className="h-10 w-full bg-muted rounded animate-pulse" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Components Skeleton */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <GitFork className="h-5 w-5" />
              <div className="h-6 w-36 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-4 w-48 bg-muted rounded animate-pulse" />
          </CardHeader>
          <CardContent>
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
                    <div className="h-5 w-12 bg-muted rounded animate-pulse" />
                    <div className="h-5 w-16 bg-muted rounded animate-pulse" />
                    <div className="h-5 w-14 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="h-10 w-full bg-muted rounded animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-12" />

      {/* Get Started Section Skeleton */}
      <div className="text-center">
        <div className="h-8 w-48 bg-muted rounded animate-pulse mx-auto mb-4" />
        <div className="h-5 w-96 bg-muted rounded animate-pulse mx-auto mb-6" />
        <div className="flex gap-4 justify-center">
          <div className="h-10 w-32 bg-muted rounded animate-pulse" />
          <div className="h-10 w-36 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
