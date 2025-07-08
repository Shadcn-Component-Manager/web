"use client";

import { CliCommands } from "@/components/docs/cli-commands";
import { ContributingGuidelines } from "@/components/docs/contributing-guidelines";
import { FaqSection } from "@/components/docs/faq-section";
import { HelpSection } from "@/components/docs/help-section";

export default function DocsPage() {
  return (
    <div className="container mx-auto max-w-7xl py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Documentation
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Learn how to use SCM CLI, understand the registry schema, and
          contribute to the community.
        </p>
      </div>

      <div className="space-y-12">
        {/* CLI Commands Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              CLI Commands
            </h2>
            <p className="text-muted-foreground">
              Complete reference of all SCM CLI commands and their usage
            </p>
          </div>
          <CliCommands />
        </section>

        {/* Contributing Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Contributing
            </h2>
            <p className="text-muted-foreground">
              Guidelines and steps for contributing components to the registry
            </p>
          </div>
          <ContributingGuidelines />
        </section>

        {/* FAQ Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
            <p className="text-muted-foreground">
              Common questions and answers about using SCM
            </p>
          </div>
          <FaqSection />
        </section>

        {/* Help Section */}
        <section>
          <HelpSection />
        </section>
      </div>
    </div>
  );
}
