import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About COT Research Notes",
};

export default function AboutPage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold text-zinc-100">About</h1>

      <div className="prose prose-invert prose-indigo max-w-none prose-p:text-zinc-300 prose-a:text-indigo-400">
        <p>
          <strong>COT Research Notes</strong> is a public blog that surfaces
          Chain-of-Thought research outputs. Every post is automatically fetched
          from a GitHub repository where experiments, explorations, and findings
          are stored as Markdown files.
        </p>

        <h2>How it works</h2>
        <p>
          The site pulls Markdown files from the{" "}
          <a
            href="https://github.com/MrTuanDoan/Tuan-RnD"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tuan-RnD
          </a>{" "}
          repository on GitHub. Each file in the <code>cot-outputs</code>{" "}
          directory becomes a blog post. Metadata like the title, date, and
          source link are extracted directly from the Markdown content.
        </p>

        <h2>Tech stack</h2>
        <ul>
          <li>
            <strong>Next.js 15</strong> — App Router with server components
          </li>
          <li>
            <strong>Tailwind CSS v4</strong> — Styling and typography
          </li>
          <li>
            <strong>react-markdown</strong> — Markdown rendering with syntax
            highlighting
          </li>
          <li>
            <strong>Vercel</strong> — Deployment with ISR (revalidate every
            hour)
          </li>
        </ul>

        <h2>Author</h2>
        <p>
          Built by{" "}
          <a
            href="https://github.com/MrTuanDoan"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tuan Doan
          </a>
          .
        </p>
      </div>
    </>
  );
}
