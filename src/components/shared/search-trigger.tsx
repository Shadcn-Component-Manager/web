"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ComponentSearch } from "./component-search";

interface SearchTriggerProps {
  variant?: "header" | "homepage";
}

export function SearchTrigger({ variant = "header" }: SearchTriggerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const buttonClass =
    variant === "homepage"
      ? "relative h-12 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground px-4 py-3 pr-10"
      : "relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64";

  return (
    <>
      <Button
        variant="outline"
        className={buttonClass}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search components...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <ComponentSearch open={open} onOpenChange={setOpen} />
    </>
  );
}
