"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeSwitcher } from "@/components/ui/theme-switch";
import type { User } from "@/lib/session";
import { LogOut, Settings, User as UserIcon } from "lucide-react";
import Link from "next/link";

interface UserNavProps {
  user: User;
}

export function UserNav({ user }: UserNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatar_url} alt={`@${user.login}`} />
            <AvatarFallback className="text-sm font-medium">
              {user.login.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-4" align="end" forceMount>
        {/* User Info */}
        <div className="flex items-center gap-3 pb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar_url} alt={`@${user.login}`} />
            <AvatarFallback className="text-sm font-medium">
              {user.login.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-none truncate">
              {user.name || user.login}
            </p>
            <p className="text-xs text-muted-foreground leading-none mt-1">
              @{user.login}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Theme Switcher */}
        <div className="py-2">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Theme
          </p>
          <ThemeSwitcher className="w-full justify-center" />
        </div>

        <DropdownMenuSeparator />

        {/* Actions */}
        <div className="space-y-1">
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={`/profile/${user.login}`} className="flex items-center">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>View Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/account" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Account Settings</span>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* Sign Out */}
        <DropdownMenuItem
          asChild
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <Link href="/auth/sign-out" className="flex items-center">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
