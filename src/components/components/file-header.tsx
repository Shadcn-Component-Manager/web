"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ApiComponent } from "@/lib/types";
import { Check, Copy, ExternalLink } from "lucide-react";

interface FileHeaderProps {
  file: { path: string; content?: string };
  component: ApiComponent;
  onCopy: () => void;
  copied: boolean;
}

export function FileHeader({
  file,
  component,
  onCopy,
  copied,
}: FileHeaderProps) {
  const getFileType = (filePath: string) => {
    if (filePath.endsWith(".tsx")) return "TSX";
    if (filePath.endsWith(".ts")) return "TS";
    if (filePath.endsWith(".js")) return "JS";
    if (filePath.endsWith(".jsx")) return "JSX";
    if (filePath.endsWith(".md")) return "MD";
    if (filePath.endsWith(".css")) return "CSS";
    if (filePath.endsWith(".json")) return "JSON";
    return "TXT";
  };

  return (
    <div className="flex items-center justify-between px-3 py-1.5 border-b bg-muted/30">
      <div className="flex items-center gap-2 min-w-0">
        <Badge variant="outline" className="text-xs">
          {getFileType(file.path)}
        </Badge>
        <span className="text-xs text-muted-foreground truncate">
          {file.path}
        </span>
      </div>
      <div className="flex gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onCopy}
                className="h-8 w-8 p-0"
              >
                {copied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy file content</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                <a
                  href={`https://github.com/Shadcn-Component-Manager/registry/blob/main/components/${component.author}/${component.name}/${component.version}/${file.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>View on GitHub</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
