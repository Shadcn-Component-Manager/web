import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface AccountSettingsProps {
  userLogin: string;
}

export function AccountSettings({ userLogin }: AccountSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your account preferences and settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">GitHub Account</h4>
            <p className="text-sm text-muted-foreground">
              Connected to @{userLogin}
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link
              href="https://github.com/settings/applications"
              target="_blank"
            >
              Manage Access
            </Link>
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Registry Access</h4>
            <p className="text-sm text-muted-foreground">
              Publish components to the SCM registry
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link
              href="https://github.com/Shadcn-Component-Manager/registry"
              target="_blank"
            >
              View Registry
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
