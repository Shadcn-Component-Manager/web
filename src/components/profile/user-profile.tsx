import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Github, MapPin, Users } from "lucide-react";
import Link from "next/link";

interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  blog: string | null;
  company: string | null;
  created_at: string;
}

interface UserProfileProps {
  user: GitHubUser | null;
  username: string;
}

export function UserProfile({ user, username }: UserProfileProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="w-full max-w-full p-0 border bg-background">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 px-6 py-8">
        {/* Avatar */}
        <div className="flex-shrink-0 flex items-center justify-center w-full md:w-auto">
          <Avatar className="h-28 w-28 md:h-32 md:w-32 border-2 border-border">
            <AvatarImage src={user?.avatar_url} alt={`@${username}`} />
            <AvatarFallback className="text-3xl">
              {username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-2 md:gap-3 w-full">
          <h1 className="text-2xl md:text-4xl font-bold leading-tight break-words">
            {user?.name || username}
          </h1>
          <div className="text-muted-foreground text-lg font-mono break-all">
            @{username}
          </div>
          {user?.bio && (
            <p className="mt-1 text-base md:text-lg text-muted-foreground max-w-2xl break-words">
              {user.bio}
            </p>
          )}
          <div className="flex flex-wrap gap-4 mt-2 justify-center md:justify-start">
            {user?.location && (
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> {user.location}
              </span>
            )}
            {user?.company && (
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" /> {user.company}
              </span>
            )}
            {user?.created_at && (
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                Joined {formatDate(user.created_at)}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 md:gap-3 items-center md:items-end w-full md:w-auto mt-6 md:mt-0">
          <Button variant="outline" asChild className="w-full md:w-auto">
            <Link
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
          {user?.blog && (
            <Button variant="outline" asChild className="w-full md:w-auto">
              <Link href={user.blog} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Website
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
