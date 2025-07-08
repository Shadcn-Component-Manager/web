"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountComponents } from "./account-components";
import { AccountOverview } from "./account-overview";
import { AccountSettings } from "./account-settings";

interface UserComponent {
  name: string;
  version: string;
  description: string;
  categories?: string[];
  lastUpdated: string;
}

interface AccountTabsProps {
  user: any;
  userComponents: UserComponent[];
}

export function AccountTabs({ user, userComponents }: AccountTabsProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="components">My Components</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <AccountOverview
          userComponents={userComponents}
          userLogin={user.login}
        />
      </TabsContent>
      <TabsContent value="components">
        <AccountComponents
          userComponents={userComponents}
          userLogin={user.login}
        />
      </TabsContent>
      <TabsContent value="settings">
        <AccountSettings userLogin={user.login} />
      </TabsContent>
    </Tabs>
  );
}
