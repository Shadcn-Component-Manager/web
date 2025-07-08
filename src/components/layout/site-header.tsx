"use server";

import { MainNav } from "@/components/layout/main-nav";
import { UserNav } from "@/components/layout/user-nav";
import { SearchTrigger } from "@/components/shared/search-trigger";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { getSession } from "@/lib/session";
import Link from "next/link";

export async function SiteHeader() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex w-full items-center">
            <Logo className="h-7 w-auto rounded" />
          </Link>
          <MainNav />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchTrigger />
          </div>
          <nav className="flex items-center space-x-2">
            {session?.user ? (
              <UserNav user={session.user} />
            ) : (
              <Button asChild>
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
