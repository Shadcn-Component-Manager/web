"use client";

import { CopyButton } from "@/components/shared/copy-button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Terminal } from "lucide-react";

const cliCommands = [
  {
    command: "scm add <namespace>/<name>[@version]",
    description: "Install a component",
    details:
      "Installs a component from the registry into your project, resolving dependencies automatically.",
  },
  {
    command: "scm login",
    description: "Authenticate with GitHub",
    details:
      "Authenticate with GitHub OAuth to enable publishing and other authenticated features.",
  },
  {
    command: "scm create <name>",
    description: "Create a new component",
    details:
      "Generates a new component with the specified name, including all necessary files and registry.json.",
  },
  {
    command: "scm publish",
    description: "Publish your component",
    details:
      "Validates and publishes your component to the registry via a GitHub pull request.",
  },
  {
    command: "scm search <query>",
    description: "Search for components",
    details:
      "Search the registry for components by name, description, or tags.",
  },
  {
    command: "scm fork <namespace>/<name>",
    description: "Fork a component",
    details:
      "Create a local copy of a component for customization and republishing.",
  },
];

export function CliCommands() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="h-5 w-5" />
          CLI Commands Reference
        </CardTitle>
        <CardDescription>
          Complete reference of all SCM CLI commands and their usage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {cliCommands.map((cmd, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{cmd.command.split(" ")[0]}</Badge>
                  <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {cmd.command}
                  </code>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CopyButton text={cmd.command} />
                    </TooltipTrigger>
                    <TooltipContent>Copy command</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="font-medium text-sm mb-1">{cmd.description}</p>
              <p className="text-sm text-muted-foreground">{cmd.details}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
