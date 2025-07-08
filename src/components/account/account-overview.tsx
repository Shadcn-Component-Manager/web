import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { UserStats } from "./account-stats";

interface UserComponent {
  name: string;
  version: string;
  description: string;
  categories?: string[];
  lastUpdated: string;
}

interface AccountOverviewProps {
  userComponents: UserComponent[];
  userLogin: string;
}

export function AccountOverview({
  userComponents,
  userLogin,
}: AccountOverviewProps) {
  return (
    <div className="space-y-6">
      <UserStats userComponents={userComponents} />
      {userComponents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Components</CardTitle>
            <CardDescription>
              Your most recently published components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userComponents.slice(0, 3).map((component, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex-1">
                    <div className="font-medium">
                      <Link
                        href={`/profile/${userLogin}`}
                        className="hover:underline"
                      >
                        {component.name}
                      </Link>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {component.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-muted-foreground">
                        v{component.version}
                      </span>
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
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/components/${userLogin}/${component.name}`}>
                      View
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
