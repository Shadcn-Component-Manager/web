"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ComponentSearch } from "./component-search";

interface SearchTriggerProps {
  variant?: "header" | "homepage";
}

let globalSearchOpen = false;
const listeners: Array<(open: boolean) => void> = [];

function setGlobalSearchOpen(open: boolean) {
  globalSearchOpen = open;
  listeners.forEach((listener) => listener(open));
}

function getShortcutKey() {
  if (typeof window === "undefined") return "Ctrl";
  return /Mac|iPhone|iPad|iPod/.test(window.navigator.userAgent) ? "⌘" : "Ctrl";
}

export function SearchTrigger({ variant = "header" }: SearchTriggerProps) {
  const [open, setOpen] = useState(false);
  const [shortcutKey, setShortcutKey] = useState("Ctrl");

  useEffect(() => {
    setShortcutKey(getShortcutKey());
  }, []);

  useEffect(() => {
    listeners.push(setOpen);

    return () => {
      const index = listeners.indexOf(setOpen);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (!globalSearchOpen) {
          setGlobalSearchOpen(true);
        }
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    setGlobalSearchOpen(newOpen);
  };

  const buttonClass =
    variant === "homepage"
      ? "relative h-12 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground px-4 py-3 pr-14"
      : "relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-14 md:w-40 lg:w-64";

  return (
    <>
      <Button
        variant="outline"
        className={buttonClass}
        onClick={() => handleOpenChange(true)}
        type="button"
      >
        <span className="hidden lg:inline-flex">Search components...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 flex h-7 items-center gap-1 rounded border bg-muted px-2 font-mono text-xs font-medium opacity-100 sm:flex shadow-sm"
          style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)" }}
        >
          <span>{shortcutKey}</span>
          <span>K</span>
        </kbd>
      </Button>
      <ComponentSearch open={open} onOpenChange={handleOpenChange} />
    </>
  );
}
