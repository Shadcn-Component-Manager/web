import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApiComponent } from "@/lib/types";
import { ExternalLink, Package, Plus } from "lucide-react";
import Link from "next/link";

interface UserComponentsProps {
  components: ApiComponent[];
  username: string;
}

export function UserComponents({ components, username }: UserComponentsProps) {
  if (components.length === 0) {
    return (
      <Card className="mt-8">
        <CardContent className="p-12 text-center">
          <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">
            No components published yet
          </h3>
          <p className="text-muted-foreground mb-6">
            @{username} hasn't published any components to the SCM registry yet.
          </p>
          <Button asChild>
            <Link href="/publish">
              <Plus className="h-4 w-4 mr-2" />
              Publish Your First Component
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Published Components
          </h2>
          <p className="text-muted-foreground">
            {components.length} component{components.length !== 1 ? "s" : ""}{" "}
            published
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {components.map((component, index) => (
          <Card
            key={index}
            className="gap-0 transition-shadow hover:shadow-lg border border-border bg-background"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">
                    <Link
                      href={`/components/${username}/${component.name}`}
                      className="hover:underline"
                    >
                      {component.name}
                    </Link>
                  </CardTitle>
                  <CardDescription className="flex-wrap text-muted-foreground">
                    {component.description}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="ml-2 flex-shrink-0">
                  v{component.version}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {/* Categories */}
              {component.categories && component.categories.length > 0 && (
                <div className="flex flex-wrap gap-1">
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
                  {component.categories.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{component.categories.length - 3} more
                    </Badge>
                  )}
                </div>
              )}

              {/* Dependencies */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {component.dependencies &&
                  component.dependencies.length > 0 && (
                    <span>
                      {component.dependencies.length} npm dep
                      {component.dependencies.length !== 1 ? "s" : ""}
                    </span>
                  )}
                {component.registryDependencies &&
                  component.registryDependencies.length > 0 && (
                    <>
                      {component.dependencies &&
                        component.dependencies.length > 0 && <span>•</span>}
                      <span>
                        {component.registryDependencies.length} shadcn dep
                        {component.registryDependencies.length !== 1 ? "s" : ""}
                      </span>
                    </>
                  )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href={`/components/${username}/${component.name}`}>
                    View
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`https://github.com/Shadcn-Component-Manager/registry/tree/main/components/${username}/${component.name}`}
                    target="_blank"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
