"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, GitFork, TestTube, Upload, Users } from "lucide-react";

const contributionGuidelines = [
  {
    title: "Component Requirements",
    items: [
      "Must include a valid registry.json file",
      "Must have a clear README.md with usage examples",
      "Must be compatible with shadcn's design system",
      "Must follow semantic versioning",
    ],
  },
  {
    title: "Code Quality",
    items: [
      "Components must be well-documented",
      "Include TypeScript types where applicable",
      "Follow accessibility best practices",
      "Include proper error handling",
    ],
  },
  {
    title: "Testing",
    items: [
      "Components should be tested in multiple scenarios",
      "Include visual regression tests if possible",
      "Test with different Tailwind configurations",
      "Verify compatibility with shadcn themes",
    ],
  },
];

const steps = [
  {
    icon: GitFork,
    title: "Fork the repository",
    description: "Fork the SCM registry repository to your GitHub account",
  },
  {
    icon: Code,
    title: "Create your component",
    description:
      "Use scm create to generate your component with proper structure",
  },
  {
    icon: TestTube,
    title: "Test thoroughly",
    description:
      "Test your component in different scenarios and configurations",
  },
  {
    icon: Upload,
    title: "Publish",
    description: "Use scm publish to submit your component via pull request",
  },
];

export function ContributingGuidelines() {
  return (
    <div className="space-y-6">
      {contributionGuidelines.map((section, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Steps to contribute your first component
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 border rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <step.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
