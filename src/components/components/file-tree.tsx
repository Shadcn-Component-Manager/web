"use client";

import {
  Tree,
  File as TreeFile,
  Folder as TreeFolder,
  type TreeViewElement,
} from "@/components/ui/file-tree";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileCode } from "lucide-react";

interface FileTreeProps {
  tree: TreeViewElement[];
  selectedFile?: string;
  onFileSelect: (file: string) => void;
}

// Recursive component to handle unlimited nesting
function TreeItem({
  item,
  selectedFile,
  onFileSelect,
}: {
  item: TreeViewElement;
  selectedFile?: string;
  onFileSelect: (file: string) => void;
}) {
  if (item.children && item.children.length > 0) {
    return (
      <TreeFolder
        key={item.id}
        element={item.name}
        value={item.id}
        className="truncate"
      >
        {item.children.map((child) => (
          <TreeItem
            key={child.id}
            item={child}
            selectedFile={selectedFile}
            onFileSelect={onFileSelect}
          />
        ))}
      </TreeFolder>
    );
  }

  return (
    <TreeFile
      key={item.id}
      value={item.id}
      onClick={() => onFileSelect(item.id)}
      isSelectable={true}
      isSelect={selectedFile === item.id}
      className="truncate whitespace-nowrap"
    >
      {item.name}
    </TreeFile>
  );
}

export function FileTree({ tree, selectedFile, onFileSelect }: FileTreeProps) {
  // Get ALL expandable items from the entire tree (unlimited depth)
  const getAllExpandableItems = (items: TreeViewElement[]): string[] => {
    const expandableItems: string[] = [];

    const traverse = (elements: TreeViewElement[]) => {
      elements.forEach((element) => {
        if (element.children && element.children.length > 0) {
          expandableItems.push(element.id);
          traverse(element.children);
        }
      });
    };

    traverse(items);
    return expandableItems;
  };

  const allExpandableItems = getAllExpandableItems(tree);

  return (
    <div className="w-full h-full border-r">
      <div className="p-3 border-b">
        <div className="flex items-center gap-2">
          <FileCode className="h-4 w-4" />
          <span className="text-sm font-medium">Files</span>
        </div>
      </div>
      <ScrollArea className="h-96 lg:h-[calc(100vh-300px)]">
        <div className="p-2">
          <Tree
            elements={tree}
            initialExpandedItems={allExpandableItems}
            initialSelectedId={selectedFile}
            indicator
          >
            {tree.map((item) => (
              <TreeItem
                key={item.id}
                item={item}
                selectedFile={selectedFile}
                onFileSelect={onFileSelect}
              />
            ))}
          </Tree>
        </div>
      </ScrollArea>
    </div>
  );
}
