import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Code, ExternalLink, FileText, Users } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex flex-col items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">
                Terms of Service
              </h1>
              <p className="text-muted-foreground">
                Important information about using our platform
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Last updated: 07/08/2025</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Terms of Service
              </CardTitle>
              <CardDescription>
                By using Shadcn Component Manager, you agree to these terms and
                conditions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <section>
                  <h3 className="text-lg font-semibold mb-3">
                    1. Acceptance of Terms
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using the Shadcn Component Manager (SCM)
                    website, you accept and agree to be bound by the terms and
                    provision of this agreement.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">
                    2. Description of Service
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    SCM is an open-source platform that provides a registry for
                    shadcn-compatible UI components. The service allows users to
                    discover, install, and publish components through our CLI
                    tool and web interface.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">
                    3. User Accounts
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To access certain features of SCM, you must authenticate
                    with GitHub. You are responsible for maintaining the
                    confidentiality of your account and for all activities that
                    occur under your account.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">
                    4. User Content
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Users may publish components to the SCM registry. By
                    publishing content, you grant SCM a non-exclusive,
                    worldwide, royalty-free license to use, display, and
                    distribute your content in connection with the service.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">
                    5. Acceptable Use
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    You agree not to use the service to:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                      Publish malicious or harmful code
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                      Violate any applicable laws or regulations
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                      Infringe on the intellectual property rights of others
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                      Attempt to gain unauthorized access to the service
                    </li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">
                    6. Intellectual Property
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    SCM is open-source software licensed under the MIT License.
                    Components published by users remain the property of their
                    respective authors, subject to the licenses they choose.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">7. Disclaimers</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The service is provided "as is" without warranties of any
                    kind. SCM is not responsible for the quality, safety, or
                    legality of components published by users.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">
                    8. Limitation of Liability
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    SCM shall not be liable for any indirect, incidental,
                    special, consequential, or punitive damages resulting from
                    your use of the service.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">
                    9. Changes to Terms
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify these terms at any time.
                    Continued use of the service after changes constitutes
                    acceptance of the new terms.
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold mb-3">10. Contact</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about these Terms of Service,
                    please contact us through our GitHub repository.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 pt-8 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>Need help? Contact our support team</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/Shadcn-Component-Manager"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Code className="w-4 h-4" />
                  GitHub
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
