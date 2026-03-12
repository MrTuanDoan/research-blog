import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/posts";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { BackButton } from "@/components/back-button";

// Dynamic rendering — fetch at request time so new posts appear immediately
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PostPageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article>
      <BackButton />

      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-zinc-100">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
          {post.date && (
            <time dateTime={post.date}>
              {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          {post.source && (
            <a
              href={post.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Source ↗
            </a>
          )}
        </div>
      </header>

      <MarkdownRenderer content={post.content} />
    </article>
  );
}
