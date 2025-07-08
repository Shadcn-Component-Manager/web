"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ApiComponent } from "@/lib/types";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { ScrollArea } from "../ui/scroll-area";
import { FileHeader } from "./file-header";
import { FileTree } from "./file-tree";

const Shiki = dynamic(() => import("@/components/components/shiki-viewer"), {
  ssr: false,
});

interface ComponentFileViewerProps {
  component: ApiComponent;
}

function buildTree(files: { path: string; content?: string }[]): any[] {
  const root: Record<string, any> = {};
  for (const file of files) {
    const parts = file.path.split("/");
    let current = root;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] =
          i === parts.length - 1
            ? { ...file, id: file.path, name: part, isSelectable: true }
            : {
                id: parts.slice(0, i + 1).join("/"),
                name: part,
                children: {},
                isSelectable: false,
              };
      }
      current = current[part].children || current[part];
    }
  }
  function toArray(obj: any): any[] {
    return Object.values(obj).map((item: any) => {
      if (item.children) {
        return { ...item, children: toArray(item.children) };
      }
      return item;
    });
  }
  return toArray(root);
}

export function ComponentFileViewer({ component }: ComponentFileViewerProps) {
  const [selectedFile, setSelectedFile] = useState<string | undefined>(
    undefined,
  );
  const files = component.files.filter((f) => f.content);
  const tree = useMemo(() => buildTree(files), [files]);
  const selected = files.find((f) => f.path === selectedFile) || files[0];

  useEffect(() => {
    if (!selectedFile && files.length > 0) {
      setSelectedFile(files[0].path);
    }
  }, [files, selectedFile]);

  return (
    <Card className="p-0 gap-0 border rounded-lg">
      <CardContent className="p-0">
        <ResizablePanelGroup direction="horizontal" className="min-h-[600px]">
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <FileTree
              tree={tree}
              selectedFile={selectedFile}
              onFileSelect={setSelectedFile}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={75} minSize={40}>
            {selected && (
              <div className="h-full flex flex-col">
                <FileHeader file={selected} component={component} />

                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-[calc(100vh-20rem)]">
                    <Shiki
                      code={selected.content || ""}
                      lang={selected.path.split(".").pop() || "txt"}
                      className="min-h-full"
                    />
                  </ScrollArea>
                </div>
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
}
