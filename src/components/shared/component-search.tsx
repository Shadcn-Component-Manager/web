"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ApiComponent } from "@/lib/types";
import {
  Calendar,
  Eye,
  Search,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

interface ComponentSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ComponentSearch({ open, onOpenChange }: ComponentSearchProps) {
  const [components, setComponents] = useState<ApiComponent[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchComponents() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/components`,
        );
        if (res.ok) {
          const data = await res.json();
          setComponents(data);
        }
      } catch (error) {
        console.error("Failed to fetch components for search", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchComponents();
  }, []);

  const filteredComponents = components.filter((component) =>
    `${component.author}/${component.name}`
      .toLowerCase()
      .includes(searchValue.toLowerCase()),
  );

  const runCommand = useCallback(
    (command: () => unknown) => {
      onOpenChange(false);
      command();
    },
    [onOpenChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          Math.min(prev + 1, filteredComponents.length - 1),
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && filteredComponents[selectedIndex]) {
        e.preventDefault();
        onOpenChange(false);
      }
    },
    [filteredComponents, selectedIndex, onOpenChange],
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchValue]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <div className="relative w-full max-w-4xl max-h-[80vh] overflow-hidden rounded border">
        {/* Header Section */}
        <div className="relative p-6 border-b">
          <div className="flex items-center gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Component Explorer</h2>
              <p className="text-sm text-muted-foreground">
                Discover and navigate components instantly
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative flex items-center">
              <div className="absolute left-4 z-10">
                <Search className="w-5 h-5 text-muted-foreground" />
              </div>
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search components by name or author..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full h-14 pl-12 pr-12 text-base border-0 bg-muted/30 rounded-xl focus:ring-2 focus:ring-ring focus:outline-none placeholder:text-muted-foreground"
              />
              <div className="absolute right-4 z-10">
                <Sparkles className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
            {searchValue && (
              <div className="mt-2 text-xs text-muted-foreground">
                {filteredComponents.length} result
                {filteredComponents.length !== 1 ? "s" : ""} found
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="relative max-h-[60vh] overflow-y-auto">
          <CommandList className="p-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            ) : filteredComponents.length === 0 ? (
              <CommandEmpty className="py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Search className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">No components found</p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search terms
                    </p>
                  </div>
                </div>
              </CommandEmpty>
            ) : (
              <CommandGroup
                heading="Available Components"
                className="space-y-1"
              >
                {filteredComponents.map((component, index) => (
                  <Link
                    key={`${component.author}/${component.name}`}
                    href={`/components/${component.author}/${component.name}`}
                    onClick={() => onOpenChange(false)}
                  >
                    <CommandItem
                      value={`${component.author}/${component.name}`}
                      className={`relative group cursor-pointer rounded-xl p-4 transition-all duration-200 ${
                        selectedIndex === index
                          ? "bg-accent border border-border"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div
                        className="absolute left-0.25 top-0 bottom-0 w-2 rounded-l-xl bg-primary opacity-0 transition-opacity duration-200"
                        style={{ opacity: selectedIndex === index ? 1 : 0 }}
                      />

                      <div className="flex items-center justify-between w-full pl-2">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-muted-foreground truncate">
                                {component.author}
                              </span>
                              <span className="text-muted-foreground">/</span>
                              <span className="text-sm font-semibold truncate">
                                {component.name}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 mt-1">
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  Author
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  Component
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted">
                            <Eye className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs">View</span>
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </div>

        {/* Footer Section */}
        <div className="relative p-4 border-t bg-muted/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>ESC Close</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-3 h-3" />
              <span>{filteredComponents.length} components available</span>
            </div>
          </div>
        </div>
      </div>
    </CommandDialog>
  );
}
