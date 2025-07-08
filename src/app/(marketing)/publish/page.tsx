import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Code,
  Download,
  FileText,
  GitBranch,
  Terminal,
  Upload,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Publish Components",
  description:
    "Share your shadcn-compatible components with the community. Learn how to use the SCM CLI to create, publish, and manage your components with ease.",
  openGraph: {
    title: "Publish Components - Shadcn Component Manager",
    description:
      "Share your shadcn-compatible components with the community. Learn how to use the SCM CLI to create, publish, and manage your components with ease.",
    url: "/publish",
  },
  twitter: {
    title: "Publish Components - Shadcn Component Manager",
    description:
      "Share your shadcn-compatible components with the community. Learn how to use the SCM CLI to create, publish, and manage your components with ease.",
  },
};

export default function PublishPage() {
  const steps = [
    {
      icon: Download,
      title: "Install the CLI",
      description: "Install the SCM CLI globally to get started",
      command: "npm install -g @shadcn-component-manager/scm",
      details:
        "This installs the SCM command-line tool that you'll use to create, manage, and publish components.",
    },
    {
      icon: GitBranch,
      title: "Authenticate with GitHub",
      description: "Log in with your GitHub account to publish components",
      command: "scm login",
      details:
        "This opens a browser window for GitHub OAuth authentication. You'll need to authorize SCM to access your GitHub account.",
    },
    {
      icon: Code,
      title: "Create a Component",
      description: "Generate a new component with the SCM CLI",
      command: "scm create my-awesome-component",
      details:
        "This creates a new component directory with all necessary files, including registry.json that conforms to shadcn's schema.",
    },
    {
      icon: FileText,
      title: "Add Documentation",
      description: "Write a clear README.md and add metadata",
      details:
        "Edit the generated files to add your component's description, dependencies, and usage examples. The CLI will guide you through this process.",
    },
    {
      icon: Upload,
      title: "Publish to Registry",
      description: "Publish your component to the SCM registry",
      command: "scm publish",
      details:
        "This validates your component, creates a pull request to the registry, and handles versioning automatically.",
    },
  ];

  const features = [
    {
      title: "Automatic Schema Generation",
      description:
        "SCM automatically generates registry.json files that conform to shadcn's exact schema, ensuring compatibility.",
      icon: CheckCircle,
    },
    {
      title: "Version Management",
      description:
        "Automatic semantic versioning based on your changes. No manual version bumping required.",
      icon: CheckCircle,
    },
    {
      title: "Dependency Resolution",
      description:
        "SCM handles npm dependencies and registry dependencies automatically, updating your project configs.",
      icon: CheckCircle,
    },
    {
      title: "GitHub Integration",
      description:
        "Seamless integration with GitHub for authentication, pull requests, and community collaboration.",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="container mx-auto max-w-7xl py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Publish Your Components
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Share your shadcn-compatible components with the community. The SCM
          CLI makes publishing as simple as running a few commands.
        </p>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5" />
              Quick Start
            </CardTitle>
            <CardDescription>
              Get your first component published in minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div className="flex items-center justify-between mb-2">
                <span>Install SCM CLI</span>
                <CopyButton text="npm install -g @shadcn-component-manager/scm" />
              </div>
              <code>npm install -g @shadcn-component-manager/scm</code>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Step-by-Step Guide
          </h2>
          {steps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Step {index + 1}: {step.title}
                    </CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {step.command && (
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Command</span>
                      <CopyButton text={step.command} />
                    </div>
                    <code className="text-sm">{step.command}</code>
                  </div>
                )}
                <p className="text-sm text-muted-foreground">{step.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator />

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Why Use SCM?
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <feature.icon className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator />

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground">
            Join the community and start sharing your components today.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/docs">
              <Button variant="outline">View Documentation</Button>
            </Link>
            <Link href="/components">
              <Button>Browse Components</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
