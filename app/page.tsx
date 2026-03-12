import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const revalidate = 3600;

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-zinc-100 mb-3">
          Tuan&apos;s Research Notes
        </h1>
        <p className="text-zinc-400 text-lg">
          Chain-of-Thought analyses, deep dives, and research notes.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-zinc-500 text-center py-20">
          No posts yet. Check back soon.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group block rounded-xl border border-zinc-800 bg-zinc-900 p-6 hover:border-indigo-500 hover:bg-zinc-800/60 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-semibold text-zinc-100 group-hover:text-indigo-400 transition-colors leading-snug">
                  {post.title}
                </h2>
                <span className="shrink-0 text-sm text-zinc-500 mt-0.5">
                  {post.date}
                </span>
              </div>
              {post.excerpt && (
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              )}
              {post.source && (
                <span className="mt-3 inline-block text-xs text-indigo-400/70">
                  🔗 Source available
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
