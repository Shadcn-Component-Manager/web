"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex justify-center items-center mx-auto w-full space-x-6 text-sm font-medium">
      <Link
        href="/components"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname?.startsWith("/components")
            ? "text-foreground"
            : "text-foreground/60",
        )}
      >
        Components
      </Link>
      <Link
        href="/community"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname?.startsWith("/community")
            ? "text-foreground"
            : "text-foreground/60",
        )}
      >
        Community
      </Link>
      <a
        href="https://scm.mintlify.app"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-foreground/80 text-foreground/60"
      >
        Docs
      </a>
    </nav>
  );
}
