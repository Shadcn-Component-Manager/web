import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Package, Tag, Timer } from "lucide-react";

interface UserComponent {
  name: string;
  version: string;
  description: string;
  categories?: string[];
  lastUpdated: string;
}

interface UserStatsProps {
  userComponents: UserComponent[];
}

function getDaysSince(dateString: string) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );
  return diff >= 0 ? diff : "-";
}

export function UserStats({ userComponents }: UserStatsProps) {
  const totalComponents = userComponents.length;
  const allCategories = userComponents.flatMap((c) => c.categories || []);
  const totalCategories = new Set(allCategories).size;
  const lastUpdated = userComponents[0]?.lastUpdated || "Never";
  const mostUsedCategory = allCategories.length
    ? allCategories.sort(
        (a, b) =>
          allCategories.filter((v) => v === b).length -
          allCategories.filter((v) => v === a).length,
      )[0]
    : null;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Components
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalComponents}</div>
          <p className="text-sm text-muted-foreground">
            Published to the registry
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalCategories}</div>
          <p className="text-sm text-muted-foreground">
            Unique categories used
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Last Updated
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold">{lastUpdated}</div>
          <p className="text-sm text-muted-foreground">
            Most recent component update
          </p>
        </CardContent>
      </Card>
      {mostUsedCategory && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Most Used Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">{mostUsedCategory}</div>
            <p className="text-sm text-muted-foreground">
              Appears most in your components
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
