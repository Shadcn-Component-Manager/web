"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExternalLink, Package } from "lucide-react";
import Link from "next/link";
import React from "react";

interface DependencyListProps {
  dependencies: string[];
  title: string;
  icon: React.ReactNode;
  getUrl: (dep: string) => string;
  getTooltip: (dep: string) => string;
}

export function DependencyList({
  dependencies,
  title,
  icon,
  getUrl,
  getTooltip,
}: DependencyListProps) {
  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon &&
            React.cloneElement(icon as React.ReactElement<any>, {
              className: "h-5 w-5",
            })}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-40">
          <div className="space-y-1">
            {dependencies.map((dep) => {
              const packageName = dep.split("@")[0];
              const version = dep.includes("@") ? dep.split("@")[1] : "";

              return (
                <div
                  key={dep}
                  className="flex items-center justify-between p-2 rounded border text-xs"
                >
                  <div className="flex items-center gap-1">
                    <Package className="h-3 w-3 text-muted-foreground" />
                    <span className="font-medium">{packageName}</span>
                    {version && (
                      <span className="text-muted-foreground">@{version}</span>
                    )}
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-6 w-6 p-0"
                        >
                          <Link
                            href={getUrl(dep)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{getTooltip(dep)}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
