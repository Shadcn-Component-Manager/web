"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import * as shiki from "shiki";

interface ShikiViewerProps {
  code: string;
  lang?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export default function ShikiViewer({
  code,
  lang = "tsx",
  showLineNumbers = true,
  className,
}: ShikiViewerProps) {
  const [html, setHtml] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    let mounted = true;

    async function highlight() {
      try {
        setIsLoading(true);

        // Use a nice theme that works well with both light and dark
        const shikiTheme =
          resolvedTheme === "dark" ? "github-dark" : "github-light";

        const highlighter = await shiki.createHighlighter({
          langs: [
            lang,
            "typescript",
            "javascript",
            "jsx",
            "tsx",
            "json",
            "css",
            "scss",
            "html",
            "markdown",
          ],
          themes: [shikiTheme],
        });

        const highlightedHtml = highlighter.codeToHtml(code, {
          lang: lang === "tsx" ? "typescript" : lang,
          theme: shikiTheme,
        });

        if (mounted) {
          setHtml(highlightedHtml);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Shiki highlighting error:", error);
        if (mounted) {
          setHtml(`<pre><code>${code}</code></pre>`);
          setIsLoading(false);
        }
      }
    }

    highlight();

    return () => {
      mounted = false;
    };
  }, [code, lang, theme, resolvedTheme]);

  // Add line numbers if requested
  const addLineNumbers = (html: string) => {
    if (!showLineNumbers) return html;

    const lines = code.split("\n");
    const lineNumbers = lines.map((_, i) => i + 1).join("\n");

    return html.replace(
      /<pre[^>]*>([\s\S]*)<\/pre>/,
      `<pre class="line-numbers"><span class="line-numbers-rows">${lineNumbers}</span>$1</pre>`,
    );
  };

  // Simple, minimal CSS
  const customStyles = `
    .shiki-viewer {
      border-radius: 0.5rem;
      overflow: hidden;
      border: 1px solid hsl(var(--border));
    }
    
    .shiki-viewer pre {
      margin: 0;
      padding: 1rem;
      overflow-x: auto;
      background: transparent;
      font-size: 0.875rem;
      line-height: 1.5;
      white-space: pre;
      word-wrap: normal;
      overflow-wrap: normal;
    }
    
    .shiki-viewer code {
      background: transparent;
      padding: 0;
      border-radius: 0;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      white-space: pre;
      word-wrap: normal;
      overflow-wrap: normal;
    }
    
    .shiki-viewer .line-numbers {
      display: flex;
    }
    
    .shiki-viewer .line-numbers .line-numbers-rows {
      display: flex;
      flex-direction: column;
      padding-right: 0.2rem;
      margin-right: 0.2rem;
      border-right: 1px solid hsl(var(--border));
      text-align: right;
      color: hsl(var(--muted-foreground));
      font-size: 0.75rem;
      user-select: none;
    }
    
    .shiki-viewer .line-numbers .line-numbers-rows > span {
      display: block;
      min-width: 2rem;
    }
    
    .shiki-viewer .line-numbers .highlighted {
      background: hsl(var(--accent));
      color: hsl(var(--accent-foreground));
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div ref={ref} className={cn("shiki-viewer", className)}>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-pulse text-muted-foreground">
              Loading code...
            </div>
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: addLineNumbers(html),
            }}
          />
        )}
      </div>
    </>
  );
}
