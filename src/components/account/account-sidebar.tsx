import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Github, LogOut, Plus } from "lucide-react";
import Link from "next/link";
import { UserProfile } from "./account-profile";

interface AccountSidebarProps {
  user: any;
}

export function AccountSidebar({ user }: AccountSidebarProps) {
  return (
    <aside className="w-full lg:w-1/4 flex-shrink-0 space-y-6 mb-8 lg:mb-0">
      <UserProfile user={user} />
      <Card className="p-0 border bg-background">
        <div className="flex flex-col gap-2 p-4">
          <Button asChild variant="outline" className="w-full">
            <Link href={`/profile/${user.login}`}>
              <ExternalLink className="h-4 w-4 mr-2" />
              View Public Profile
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-2" />
              View GitHub
            </Link>
          </Button>
          <Button asChild className="w-full">
            <Link href="/publish">
              <Plus className="h-4 w-4 mr-2" />
              Publish Component
            </Link>
          </Button>
        </div>
      </Card>
    </aside>
  );
}
