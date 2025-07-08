"use client";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiComponent } from "@/lib/types";
import { Calendar, Package } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface ComponentHeaderProps {
  component: ApiComponent;
}

export function ComponentHeader({ component }: ComponentHeaderProps) {
  const [selectedVersion, setSelectedVersion] = useState(component.version);
  const router = useRouter();
  const searchParams = useSearchParams();

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const handleVersionChange = (version: string) => {
    setSelectedVersion(version);
    const params = new URLSearchParams(searchParams);
    params.set("version", version);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Link
              href={`/profile/${component.author}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              @{component.author}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-medium">{component.name}</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3">
            {component.title}
          </h1>

          <p className="text-lg text-muted-foreground mb-4 max-w-3xl">
            {component.description}
          </p>
        </div>

        {/* Version Selector */}
        {component.allVersions && component.allVersions.length > 0 && (
          <div className="flex items-center gap-2">
            <Select value={selectedVersion} onValueChange={handleVersionChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select version" />
              </SelectTrigger>
              <SelectContent>
                {component.allVersions?.map((version) => (
                  <SelectItem key={version} value={version}>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      <span>v{version}</span>
                      {version === component.version && (
                        <Badge variant="secondary" className="text-xs">
                          Latest
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
}
