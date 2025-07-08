"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ApiComponent } from "@/lib/types";
import {
  Calendar,
  ExternalLink,
  FileText,
  Github,
  Info,
  Package,
  User,
} from "lucide-react";
import Link from "next/link";

interface ComponentDetailsProps {
  component: ApiComponent;
}

const DetailRow = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center justify-between">
    <span className="text-muted-foreground flex items-center gap-1">
      {icon}
      {label}
    </span>
    {children}
  </div>
);

export function ComponentDetails({ component }: ComponentDetailsProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          Component Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-xs">
          <DetailRow icon={<User className="h-3 w-3" />} label="Author">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-6 px-2"
                  >
                    <Link
                      href={`https://github.com/${component.author}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-xs">@{component.author}</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View GitHub profile</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DetailRow>

          <DetailRow icon={<Github className="h-3 w-3" />} label="Source">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-6 px-2"
                  >
                    <Link
                      href={`https://github.com/Shadcn-Component-Manager/registry/tree/main/components/${component.author}/${component.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-xs">
                        {component.author}/{component.name}
                      </span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View source code</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DetailRow>

          <DetailRow icon={<FileText className="h-3 w-3" />} label="Files">
            <span className="font-medium">{component.files.length}</span>
          </DetailRow>

          {component.publishedAt && (
            <DetailRow
              icon={<Calendar className="h-3 w-3" />}
              label="Published"
            >
              <span className="text-xs">
                {formatDate(component.publishedAt)}
              </span>
            </DetailRow>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
