"use client";

import { ApiComponent } from "@/lib/types";
import { Package, Zap } from "lucide-react";
import { ComponentCategories } from "./component-categories";
import { ComponentDetails } from "./component-details";
import { DependencyList } from "./component-dependency-list";

interface ComponentSidebarProps {
  component: ApiComponent;
}

export function ComponentSidebar({ component }: ComponentSidebarProps) {
  const isShadcnComponent = (dep: string) => {
    const shadcnComponents = [
      "button",
      "input",
      "card",
      "dialog",
      "dropdown-menu",
      "select",
      "textarea",
      "badge",
      "avatar",
      "alert",
      "alert-dialog",
      "accordion",
      "breadcrumb",
      "calendar",
      "carousel",
      "checkbox",
      "collapsible",
      "command",
      "context-menu",
      "drawer",
      "form",
      "hover-card",
      "label",
      "menubar",
      "navigation-menu",
      "pagination",
      "popover",
      "progress",
      "radio-group",
      "resizable",
      "scroll-area",
      "separator",
      "sheet",
      "skeleton",
      "slider",
      "switch",
      "table",
      "tabs",
      "toggle",
      "toggle-group",
      "tooltip",
    ];
    return shadcnComponents.includes(dep.toLowerCase());
  };

  return (
    <div className="space-y-4">
      <ComponentDetails component={component} />

      {component.dependencies && component.dependencies.length > 0 && (
        <DependencyList
          dependencies={component.dependencies}
          title="NPM Dependencies"
          icon={<Package className="h-3 w-3" />}
          getUrl={(dep) => `https://www.npmjs.com/package/${dep.split("@")[0]}`}
          getTooltip={() => "View on npm"}
        />
      )}

      {component.registryDependencies &&
        component.registryDependencies.length > 0 && (
          <DependencyList
            dependencies={component.registryDependencies}
            title="Shadcn Components"
            icon={<Zap className="h-3 w-3" />}
            getUrl={(dep) =>
              isShadcnComponent(dep)
                ? `https://ui.shadcn.com/docs/components/${dep}`
                : `/components?search=${dep}`
            }
            getTooltip={(dep) =>
              isShadcnComponent(dep) ? "View shadcn docs" : "Search registry"
            }
          />
        )}

      {component.categories && component.categories.length > 0 && (
        <ComponentCategories categories={component.categories} />
      )}
    </div>
  );
}
