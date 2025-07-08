"use client";

import { Badge } from "@/components/ui/badge";
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
import Link from "next/link";

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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      "npm install -g @shadcn-component-manager/scm",
                    )
                  }
                >
                  Copy
                </Button>
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          navigator.clipboard.writeText(step.command)
                        }
                      >
                        Copy
                      </Button>
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

        <Card>
          <CardHeader>
            <CardTitle>Shadcn Schema Compliance</CardTitle>
            <CardDescription>
              SCM automatically generates files that conform to shadcn's
              registry.json schema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Every component published through SCM automatically includes a
                registry.json file that follows shadcn's exact schema. This
                ensures your components work seamlessly with existing shadcn
                projects.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">registry.json</Badge>
                <Badge variant="secondary">registry-item.json</Badge>
                <Badge variant="secondary">cssVars</Badge>
                <Badge variant="secondary">Tailwind CSS</Badge>
                <Badge variant="secondary">React</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center">Ready to Publish?</CardTitle>
            <CardDescription className="text-center">
              Join the community and share your components
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/docs">View Documentation</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/components">Browse Components</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
