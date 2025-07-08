import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  title: {
    default: "Shadcn Component Manager",
    template: "%s | Shadcn Component Manager",
  },
  description:
    "Shadcn Component Manager is an open-source CLI tool and registry ecosystem designed to extend shadcn's component model, enabling developers to create, share, and install UI components with ease.",
  keywords: [
    "shadcn",
    "components",
    "ui",
    "react",
    "typescript",
    "tailwind",
    "registry",
    "cli",
    "developer tools",
    "open source",
  ],
  authors: [{ name: "Shadcn Component Manager Team" }],
  creator: "Shadcn Component Manager",
  publisher: "Shadcn Component Manager",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Shadcn Component Manager",
    description:
      "Build and share shadcn-compatible components with the community. Discover, publish, and install UI components with ease.",
    siteName: "Shadcn Component Manager",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shadcn Component Manager - Build and share components with the community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadcn Component Manager",
    description:
      "Build and share shadcn-compatible components with the community. Discover, publish, and install UI components with ease.",
    images: ["/og-image.png"],
    creator: "@shadcn",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen bg-background">
            <SiteHeader />
            <main className="container mx-auto max-w-7xl px-4 min-h-screen">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
