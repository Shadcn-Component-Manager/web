"use client";

import Link from "next/link";
import { FaGithub, FaNpm } from "react-icons/fa6";
import { Logo } from "../ui/logo";
import { ThemeSwitcher } from "../ui/theme-switch";

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-0">
        {/* Brand & Social */}
        <div className="flex flex-col items-center md:items-start gap-4 flex-1 min-w-[180px]">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-foreground"
          >
            <Logo className="h-8 w-auto rounded" />
          </Link>
          <p className="text-muted-foreground text-sm max-w-xs text-center md:text-left">
            The luxury registry for shadcn/ui components. Discover, share, and
            build with style.
          </p>
          <div className="flex gap-3 mt-2">
            <a
              href="https://github.com/Shadcn-Component-Manager"
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
              className="hover:text-primary transition-colors"
            >
              <FaGithub size={22} />
            </a>
            <a
              href="https://www.npmjs.com/package/@shadcn-component-manager/scm"
              target="_blank"
              rel="noopener"
              aria-label="NPM"
              className="hover:text-primary transition-colors"
            >
              <FaNpm size={22} />
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start gap-2 flex-1 min-w-[140px]">
          <span className="font-semibold text-lg mb-1">Quick Links</span>
          <Link
            href="/components"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Components
          </Link>
          <Link
            href="/docs"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Docs
          </Link>
          <Link
            href="/community"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Community
          </Link>
          <Link
            href="/publish"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Publish
          </Link>
        </div>
        {/* Repositories */}
        <div className="flex flex-col items-center md:items-start gap-2 flex-1 min-w-[180px]">
          <span className="font-semibold text-lg mb-1">SCM Tooling</span>
          <a
            href="https://github.com/Shadcn-Component-Manager/web"
            target="_blank"
            rel="noopener"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Web Repo
          </a>
          <a
            href="https://github.com/Shadcn-Component-Manager/scm"
            target="_blank"
            rel="noopener"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            CLI Repo
          </a>
          <a
            href="https://github.com/Shadcn-Component-Manager/registry"
            target="_blank"
            rel="noopener"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Registry Repo
          </a>
          <a
            href="https://www.npmjs.com/package/@shadcn-component-manager/scm"
            target="_blank"
            rel="noopener"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            NPM Package
          </a>
        </div>
        {/* Theme Switcher */}
        <div className="flex flex-col items-center md:items-end flex-1 min-w-[120px] gap-4">
          <span className="font-semibold text-lg mb-1">Theme</span>
          <ThemeSwitcher />
        </div>
      </div>
      <div className="border-t mt-8 pt-6 pb-4 px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <span className="text-center">
          © {new Date().getFullYear()} SCM. All rights reserved.
        </span>
        <div className="flex gap-4 flex-wrap justify-center md:justify-end">
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="hover:text-foreground transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="/license"
            className="hover:text-foreground transition-colors"
          >
            License
          </Link>
        </div>
      </div>
    </footer>
  );
}
