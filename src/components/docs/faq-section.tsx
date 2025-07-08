"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I resolve dependency conflicts?",
    answer:
      "SCM automatically resolves dependencies when installing components. If conflicts occur, the CLI will prompt you to choose which version to use or suggest compatible alternatives.",
  },
  {
    question: "Can I use SCM with existing shadcn projects?",
    answer:
      "Yes! SCM is designed to work seamlessly with existing shadcn projects. It reads your components.json configuration and installs components in the correct locations.",
  },
  {
    question: "How do I update my published components?",
    answer:
      "Use scm publish again after making changes. SCM will automatically increment the version number based on your changes.",
  },
  {
    question: "What if my component is rejected?",
    answer:
      "Check the pull request comments for feedback. Common issues include missing documentation, invalid schema, or security concerns. Fix the issues and update your component.",
  },
  {
    question: "How do I handle component versioning?",
    answer:
      "SCM follows semantic versioning. Use scm publish with --patch, --minor, or --major flags to specify version increments, or let SCM auto-detect changes.",
  },
  {
    question: "Can I use SCM in a monorepo?",
    answer:
      "Yes! SCM supports monorepos. Use scm init in each package directory or configure a workspace-level setup. Components can be shared across packages.",
  },
];

export function FaqSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Frequently Asked Questions
        </CardTitle>
        <CardDescription>
          Common questions and answers about using SCM
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index}>
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
              {index < faqs.length - 1 && <Separator className="mt-6" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
