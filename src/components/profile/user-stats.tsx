import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiComponent } from "@/lib/types";
import { BarChart3, GitFork, Package } from "lucide-react";

interface UserStatsProps {
  components: ApiComponent[];
}

export function UserStats({ components }: UserStatsProps) {
  // Calculate stats
  const totalComponents = components.length;
  const totalCategories = new Set(components.flatMap((c) => c.categories || []))
    .size;
  const totalDependencies = components.reduce(
    (sum, c) => sum + (c.dependencies?.length || 0),
    0,
  );
  const totalRegistryDependencies = components.reduce(
    (sum, c) => sum + (c.registryDependencies?.length || 0),
    0,
  );

  // Get most used categories
  const categoryCounts = components.reduce(
    (acc, component) => {
      component.categories?.forEach((category) => {
        acc[category] = (acc[category] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>,
  );

  const topCategories = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([category, count]) => ({ category, count }));

  return (
    <div className="space-y-4">
      {/* Stats Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {totalComponents}
              </div>
              <div className="text-xs text-muted-foreground">Components</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {totalCategories}
              </div>
              <div className="text-xs text-muted-foreground">Categories</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {totalDependencies}
              </div>
              <div className="text-xs text-muted-foreground">NPM Deps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {totalRegistryDependencies}
              </div>
              <div className="text-xs text-muted-foreground">Shadcn Deps</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Categories */}
      {topCategories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Top Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topCategories.map(({ category, count }) => (
                <div
                  key={category}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm font-medium">{category}</span>
                  <span className="text-sm text-muted-foreground">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitFork className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {components.slice(0, 3).map((component, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {component.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    v{component.version}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
