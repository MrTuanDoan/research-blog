"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface MarkdownRendererProps {
  readonly content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert prose-indigo max-w-none prose-headings:text-zinc-100 prose-p:text-zinc-300 prose-a:text-indigo-400 prose-strong:text-zinc-200 prose-code:text-indigo-300 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
