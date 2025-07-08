
import { ComponentFileViewer } from "@/components/components/component-file-viewer";
import { ComponentHeader } from "@/components/components/component-header";
import { ComponentReadme } from "@/components/components/component-readme";
import { ComponentSidebar } from "@/components/components/component-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { ApiComponent } from "@/lib/types";
import { notFound } from "next/navigation";

interface ComponentPageProps {
  params: Promise<{
    namespace: string;
    name: string;
  }>;
  searchParams: Promise<{
    version?: string;
  }>;
}

export default async function ComponentPage({
  params,
  searchParams,
}: ComponentPageProps) {
  const { namespace, name } = await params;
  const { version } = await searchParams;

  const url = new URL(
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/components/${namespace}/${name}`,
  );
  if (version) {
    url.searchParams.set("version", version);
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  const component: ApiComponent = data.component;

  return (
    <div className="min-h-screen py-6 lg:py-10">
      <ComponentHeader component={component} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        <div className="lg:col-span-3 space-y-6">
          <ComponentReadme component={component} />

          {component.docs && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Setup Instructions
                </h2>
                <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg overflow-x-auto">
                  {component.docs}
                </pre>
              </CardContent>
            </Card>
          )}

          <ComponentFileViewer component={component} />
        </div>

        <div className="space-y-4">
          <ComponentSidebar component={component} />
        </div>
      </div>
    </div>
  );
}
