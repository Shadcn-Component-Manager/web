"use client";

import { CopyButton } from "@/components/shared/copy-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ApiComponent } from "@/lib/types";
import { BookOpen, FileText, Package, Settings } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface ComponentReadmeProps {
  component: ApiComponent;
}

export function ComponentReadme({ component }: ComponentReadmeProps) {
  const [selectedVersion, setSelectedVersion] = useState(component.version);
  const router = useRouter();
  const searchParams = useSearchParams();

  const readmeFile = component.files.find((f) =>
    f.path.toLowerCase().endsWith("readme.md"),
  );

  const readmeContent = readmeFile?.content;

  // Check if readme has content beyond just title and description
  const hasExtendedContent =
    readmeFile?.content &&
    readmeFile.content.trim() !==
      `# ${component.title}\n\n${component.description}`.trim();

  const handleVersionChange = (version: string) => {
    setSelectedVersion(version);
    const params = new URLSearchParams(searchParams);
    params.set("version", version);
    router.push(`?${params.toString()}`);
  };

  return (
    <Card>
      <CardContent className="space-y-6">
        {hasExtendedContent && readmeContent && (
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="readme"
          >
            <AccordionItem value="readme" className="border rounded-lg">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-2 text-left">
                  <BookOpen className="h-4 w-4" />
                  <span className="font-medium">Documentation</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                  <div className="prose prose-stone dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed bg-transparent border-none p-0 m-0">
                      {readmeContent}
                    </pre>
                  </div>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {/* Installation Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Package className="h-5 w-5" />
            Installation
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg border">
              <code className="text-sm font-mono flex-1 mr-2">
                scm add {component.author}/{component.name}
              </code>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CopyButton
                      text={`scm add ${component.author}/${component.name}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>Copy install command</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {component.allVersions && component.allVersions.length > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Version:</span>
                <Select
                  value={selectedVersion}
                  onValueChange={handleVersionChange}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {component.allVersions?.map((version) => (
                      <SelectItem key={version} value={version}>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          <span>v{version}</span>
                          {version === component.allVersions?.[0] && (
                            <span className="text-xs text-muted-foreground">
                              (Latest)
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Setup Instructions Accordion */}
            {component.docs && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem
                  value="setup-instructions"
                  className="border rounded-lg"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center gap-2 text-left">
                      <Settings className="h-4 w-4" />
                      <span className="font-medium">Setup Instructions</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <ScrollArea className="h-[300px] w-full rounded-md border p-3 bg-muted/30">
                      <pre className="whitespace-pre-wrap text-xs font-mono leading-relaxed">
                        {component.docs}
                      </pre>
                    </ScrollArea>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
