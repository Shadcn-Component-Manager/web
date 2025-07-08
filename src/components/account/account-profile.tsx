import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { User } from "@/lib/session";

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <Card className="w-full p-6">
      <div className="flex flex-col items-center justify-center gap-3">
        <Avatar className="h-16 w-16 border-2 border-border">
          <AvatarImage src={user.avatar_url} alt={`@${user.login}`} />
          <AvatarFallback className="text-xl">
            {user.login?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="text-lg font-semibold">@{user.login}</div>
        {user.name && (
          <div className="text-muted-foreground text-sm font-normal">
            {user.name}
          </div>
        )}
      </div>
    </Card>
  );
}
