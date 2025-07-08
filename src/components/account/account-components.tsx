import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Package, Plus } from "lucide-react";
import Link from "next/link";

interface UserComponent {
  name: string;
  version: string;
  description: string;
  categories?: string[];
  lastUpdated: string;
}

interface AccountComponentsProps {
  userComponents: UserComponent[];
  userLogin: string;
}

export function AccountComponents({
  userComponents,
  userLogin,
}: AccountComponentsProps) {
  if (userComponents.length === 0) {
    return (
      <Card className="mt-8">
        <CardContent className="p-12 text-center">
          <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">
            No components published yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Start building and sharing your shadcn/ui components with the
            community.
          </p>
          <Button asChild>
            <a
              href="https://scm.mintlify.app/cli/publish"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Plus className="h-4 w-4 mr-2" />
              Publish Your First Component
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {userComponents.map((component, index) => (
        <Card key={index} className="gap-0 p-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">
                    <Link
                      href={`/profile/${userLogin}`}
                      className="hover:underline"
                    >
                      {component.name}
                    </Link>
                  </h3>
                  <Badge variant="outline">v{component.version}</Badge>
                </div>
                <p className="text-muted-foreground mb-3">
                  {component.description}
                </p>
                <div className="flex items-center gap-2">
                  {component.categories &&
                    component.categories.map((category, catIndex) => (
                      <Badge
                        key={catIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {category}
                      </Badge>
                    ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/components/${userLogin}/${component.name}`}>
                    View
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`https://github.com/Shadcn-Component-Manager/registry/tree/main/components/${userLogin}/${component.name}`}
                    target="_blank"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
