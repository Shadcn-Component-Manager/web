"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiComponent } from "@/lib/types";
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  FileCode,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ComponentFilesProps {
  component: ApiComponent;
}

export function ComponentFiles({ component }: ComponentFilesProps) {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const handleCopyFile = (filePath: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFile(filePath);
    toast.success("File content copied to clipboard");
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const getFileIcon = (filePath: string) => {
    if (filePath.endsWith(".tsx") || filePath.endsWith(".ts"))
      return <FileCode className="h-4 w-4" />;
    if (filePath.endsWith(".md")) return <FileText className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const getFileType = (filePath: string) => {
    if (filePath.endsWith(".tsx")) return "TypeScript React";
    if (filePath.endsWith(".ts")) return "TypeScript";
    if (filePath.endsWith(".js")) return "JavaScript";
    if (filePath.endsWith(".jsx")) return "JavaScript React";
    if (filePath.endsWith(".md")) return "Markdown";
    if (filePath.endsWith(".css")) return "CSS";
    if (filePath.endsWith(".json")) return "JSON";
    return "Text";
  };

  const filesWithContent = component.files.filter((file) => file.content);

  if (filesWithContent.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCode className="h-5 w-5" />
          Component Files
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={filesWithContent[0]?.path} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filesWithContent.map((file) => (
              <TabsTrigger
                key={file.path}
                value={file.path}
                className="flex items-center gap-2"
              >
                {getFileIcon(file.path)}
                <span className="truncate">{file.path.split("/").pop()}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {filesWithContent.map((file) => (
            <TabsContent key={file.path} value={file.path} className="mt-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{getFileType(file.path)}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {file.path}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopyFile(file.path, file.content || "")
                      }
                    >
                      {copiedFile === file.path ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={`https://github.com/Shadcn-Component-Manager/registry/blob/main/components/${component.author}/${component.name}/${component.version}/${file.path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm max-h-96 overflow-y-auto">
                    <code>{file.content}</code>
                  </pre>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="w-full" asChild>
            <a
              href={`https://github.com/Shadcn-Component-Manager/registry/tree/main/components/${component.author}/${component.name}/${component.version}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 h-4 w-4" />
              View All Files on GitHub
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
