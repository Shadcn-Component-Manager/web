"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Check, Copy, FileText, Package } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

interface ComponentReadmeProps {
  component: ApiComponent;
}

export function ComponentReadme({ component }: ComponentReadmeProps) {
  const [copied, setCopied] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(component.version);
  const router = useRouter();
  const searchParams = useSearchParams();

  const readmeFile = component.files.find((f) =>
    f.path.toLowerCase().endsWith("readme.md"),
  );

  const readmeContent =
    readmeFile?.content || `# ${component.title}\n\n${component.description}`;

  const handleCopy = () => {
    const command = `scm add ${component.author}/${component.name}`;
    navigator.clipboard.writeText(command);
    setCopied(true);
    toast.success("Install command copied");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVersionChange = (version: string) => {
    setSelectedVersion(version);
    const params = new URLSearchParams(searchParams);
    params.set("version", version);
    router.push(`?${params.toString()}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Documentation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Readme Content */}
        <div className="prose prose-stone dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Custom styling for better mobile experience
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold mb-4">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold mb-3 mt-6">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold mb-2 mt-4">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 leading-relaxed">{children}</p>
              ),
              code: ({ children, className }) => (
                <code
                  className={`${className} bg-muted px-1 py-0.5 rounded text-sm font-mono`}
                >
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
                  {children}
                </pre>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-1">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-1">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="text-sm">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary/20 pl-4 italic text-muted-foreground mb-4">
                  {children}
                </blockquote>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-primary hover:underline underline-offset-2"
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href?.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                >
                  {children}
                </a>
              ),
            }}
          >
            {readmeContent}
          </ReactMarkdown>
        </div>

        {/* Installation Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Package className="h-5 w-5" />
            Installation
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <code className="text-sm font-mono flex-1 mr-2">
                scm add {component.author}/{component.name}
              </code>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="h-8 w-8 p-0"
                    >
                      {copied ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
