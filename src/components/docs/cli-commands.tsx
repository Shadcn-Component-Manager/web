"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Check, Copy, Terminal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (command: string, index: number) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedIndex(index);
      toast.success("Command copied to clipboard");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      toast.error("Failed to copy command");
    }
  };

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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(cmd.command, index)}
                        className="h-8 w-8 p-0"
                      >
                        {copiedIndex === index ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {copiedIndex === index ? "Copied!" : "Copy command"}
                    </TooltipContent>
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
