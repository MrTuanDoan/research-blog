const GITHUB_API_URL =
  "https://api.github.com/repos/MrTuanDoan/research-blog/contents/posts";
const RAW_BASE_URL =
  "https://raw.githubusercontent.com/MrTuanDoan/research-blog/master/posts";

// No auth needed — research-blog is public
const GITHUB_HEADERS: Record<string, string> = {
  Accept: "application/vnd.github.v3+json",
};

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  source?: string;
  excerpt: string;
  filename: string;
}

export interface Post extends PostMeta {
  content: string;
}

// ---------------------------------------------------------------------------
// Filename parsing
// ---------------------------------------------------------------------------

/**
 * Parse slug from filename like `cot-20250301-143022-some-topic.md`
 * Returns the topic portion after the timestamp.
 */
function slugFromFilename(filename: string): string {
  // Remove .md extension
  const base = filename.replace(/\.md$/, "");
  // Match cot-YYYYMMDD-HHMMSS-{topic}
  const match = base.match(/^cot-\d{8}-\d{6}-(.+)$/);
  return match ? match[1] : base;
}

// ---------------------------------------------------------------------------
// Metadata extraction from markdown content
// ---------------------------------------------------------------------------

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "Untitled";
}

function extractDate(content: string): string {
  const match = content.match(/\*\*Date:\*\*\s*(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : "";
}

function extractSource(content: string): string | undefined {
  const match = content.match(/\*\*Source:\*\*\s*(https?:\/\/\S+)/);
  return match ? match[1] : undefined;
}

function extractExcerpt(content: string, maxLen = 150): string {
  // Skip the title line and metadata lines, find first real paragraph
  const lines = content.split("\n");
  const paragraphLines: string[] = [];

  let pastHeader = false;
  for (const line of lines) {
    const trimmed = line.trim();
    // Skip empty lines, headings, and metadata lines
    if (!trimmed) {
      if (pastHeader && paragraphLines.length > 0) break;
      continue;
    }
    if (trimmed.startsWith("#") || trimmed.startsWith("**Date:") || trimmed.startsWith("**Source:")) {
      pastHeader = true;
      continue;
    }
    if (trimmed.startsWith("---")) {
      pastHeader = true;
      continue;
    }
    pastHeader = true;
    paragraphLines.push(trimmed);
  }

  const text = paragraphLines.join(" ");
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

interface GitHubFileEntry {
  name: string;
  path: string;
  type: string;
  download_url: string | null;
}

export async function getAllPosts(opts?: { fresh?: boolean }): Promise<PostMeta[]> {
  const cacheOpt = opts?.fresh
    ? { cache: "no-store" as const }
    : { next: { revalidate: 3600 } };

  const res = await fetch(GITHUB_API_URL, {
    ...cacheOpt,
    headers: GITHUB_HEADERS,
  });

  if (!res.ok) {
    console.error(`GitHub API error: ${res.status} ${res.statusText}`);
    return [];
  }

  const files: GitHubFileEntry[] = await res.json();

  const mdFiles = files.filter(
    (f) => f.type === "file" && f.name.endsWith(".md")
  );

  // Fetch content for each file in parallel
  const posts = await Promise.all(
    mdFiles.map(async (file): Promise<PostMeta | null> => {
      try {
        const rawUrl = `${RAW_BASE_URL}/${file.name}`;
        const contentRes = await fetch(rawUrl, {
          ...cacheOpt,
        });
        if (!contentRes.ok) return null;

        const content = await contentRes.text();
        return {
          slug: slugFromFilename(file.name),
          title: extractTitle(content),
          date: extractDate(content),
          source: extractSource(content),
          excerpt: extractExcerpt(content),
          filename: file.name,
        };
      } catch {
        return null;
      }
    })
  );

  // Filter nulls and sort newest first
  return posts
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Always fetch fresh so new posts are immediately available
  const allPosts = await getAllPosts({ fresh: true });
  const meta = allPosts.find((p) => p.slug === slug);
  if (!meta) return null;

  const rawUrl = `${RAW_BASE_URL}/${meta.filename}`;
  const res = await fetch(rawUrl, { cache: "no-store" });
  if (!res.ok) return null;

  const content = await res.text();
  return { ...meta, content };
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}
