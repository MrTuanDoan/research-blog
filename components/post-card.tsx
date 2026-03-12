import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface PostCardProps {
  readonly post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-indigo-500/50 hover:bg-zinc-900">
        <div className="mb-2 flex items-center gap-3">
          {post.date && (
            <time
              dateTime={post.date}
              className="text-sm text-zinc-500"
            >
              {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </div>
        <h2 className="mb-2 text-xl font-semibold text-zinc-100 group-hover:text-indigo-400 transition-colors">
          {post.title}
        </h2>
        <p className="text-sm leading-relaxed text-zinc-400">
          {post.excerpt}
        </p>
      </article>
    </Link>
  );
}
