import { ComponentFileViewer } from "@/components/components/component-file-viewer";
import { ComponentHeader } from "@/components/components/component-header";
import { ComponentReadme } from "@/components/components/component-readme";
import { ComponentSidebar } from "@/components/components/component-sidebar";
import { ApiComponent } from "@/lib/types";
import type { Metadata, ResolvingMetadata } from "next";
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

export async function generateMetadata(
  { params, searchParams }: ComponentPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { namespace, name } = await params;
  const { version } = await searchParams;

  const url = new URL(
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/components/${namespace}/${name}`,
  );
  if (version) {
    url.searchParams.set("version", version);
  }

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return {
        title: `${namespace}/${name} - Component Not Found`,
        description: `The component ${namespace}/${name} could not be found in the registry.`,
      };
    }

    const data = await res.json();
    const component: ApiComponent = data.component;

    const title = `${namespace}/${name} v${component.version}`;
    const description =
      component.description ||
      `A shadcn-compatible component by ${namespace}. Install and use this component in your React projects.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `/components/${namespace}/${name}`,
        type: "website",
        images: [
          {
            url: `/api/og/component?namespace=${encodeURIComponent(namespace)}&name=${encodeURIComponent(name)}&version=${encodeURIComponent(component.version)}`,
            width: 1200,
            height: 630,
            alt: `${title} - ${description}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [
          `/api/og/component?namespace=${encodeURIComponent(namespace)}&name=${encodeURIComponent(name)}&version=${encodeURIComponent(component.version)}`,
        ],
      },
      alternates: {
        canonical: `/components/${namespace}/${name}`,
      },
    };
  } catch (error) {
    return {
      title: `${namespace}/${name} - Component Not Found`,
      description: `The component ${namespace}/${name} could not be found in the registry.`,
    };
  }
}

async function getComponent(
  namespace: string,
  name: string,
  version?: string,
): Promise<ApiComponent | null> {
  try {
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
      return null;
    }

    const data = await res.json();
    return data.component;
  } catch (error) {
    console.error("Failed to fetch component:", error);
    return null;
  }
}

export default async function ComponentPage({
  params,
  searchParams,
}: ComponentPageProps) {
  const { namespace, name } = await params;
  const { version } = await searchParams;

  const component = await getComponent(namespace, name, version);

  if (!component) {
    notFound();
  }

  return (
    <div className="min-h-screen py-6 lg:py-10">
      <ComponentHeader component={component} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        <div className="lg:col-span-3 space-y-6">
          <ComponentReadme component={component} />

          <ComponentFileViewer component={component} />
        </div>

        <div className="space-y-4">
          <ComponentSidebar component={component} />
        </div>
      </div>
    </div>
  );
}
