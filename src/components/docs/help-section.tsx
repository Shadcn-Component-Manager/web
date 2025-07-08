"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Github, MessageCircle } from "lucide-react";
import Link from "next/link";

export function HelpSection() {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Need More Help?
        </CardTitle>
        <CardDescription>
          Join our community for support and discussions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/community">
              <MessageCircle className="mr-2 h-4 w-4" />
              Community Hub
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              href="https://github.com/Shadcn-Component-Manager/Shadcn-Component-Manager-WEB/issues"
              target="_blank"
            >
              <Github className="mr-2 h-4 w-4" />
              Report Issues
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
