import { notFound } from "next/navigation";
import Link from "next/link";
import { INFLUENCERS } from "@/lib/influencers-data";

export function generateStaticParams() {
  return INFLUENCERS.map((inf) => ({ slug: inf.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const inf = INFLUENCERS.find((i) => i.slug === slug);
  if (!inf) return {};
  return {
    title: `${inf.name} — AI Influencer`,
    description: `${inf.name} · ${inf.niche || inf.subtitle} · ${inf.imageCount} images`,
  };
}

const FOLDER_LABELS: Record<string, string> = {
  bopa: "BOPA-UP Poses",
  "char-sheet": "Character Sheet",
  macro: "Macro Shots",
  outfit: "Outfits",
  video: "Video Frames",
};

export default async function InfluencerPage({ params }: Props) {
  const { slug } = await params;
  const inf = INFLUENCERS.find((i) => i.slug === slug);
  if (!inf) notFound();

  const groups: Record<string, typeof inf.images> = {};
  for (const img of inf.images) {
    if (!groups[img.folder]) groups[img.folder] = [];
    groups[img.folder].push(img);
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      {/* Nav */}
      <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid #1a1a1a" }}>
        <Link href="/influencers" style={{ color: "#888", textDecoration: "none", fontSize: "0.8rem" }}>
          ← All Influencers
        </Link>
      </div>

      {/* Hero */}
      <div style={{ display: "flex", gap: "2rem", padding: "2rem 1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ width: "260px", flexShrink: 0, borderRadius: "4px", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/influencers/${inf.slug}/base.jpg`}
            alt={inf.name}
            style={{ width: "100%", display: "block" }}
          />
        </div>
        <div style={{ flex: 1, minWidth: "200px", paddingTop: "0.5rem" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, margin: "0 0 0.4rem", letterSpacing: "-0.02em" }}>
            {inf.name}
          </h1>
          {inf.subtitle && (
            <p style={{ color: "#666", fontSize: "0.8rem", margin: "0 0 0.3rem" }}>{inf.subtitle}</p>
          )}
          {inf.niche && (
            <p style={{ color: "#888", fontSize: "0.85rem", margin: "0 0 1.2rem" }}>{inf.niche}</p>
          )}
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            <span style={{ background: "#1a1a1a", padding: "0.3rem 0.75rem", borderRadius: "999px", fontSize: "0.7rem", color: "#f59e0b", fontFamily: "monospace" }}>
              {inf.imageCount} images
            </span>
            {Object.keys(groups).length > 0 && (
              <span style={{ background: "#1a1a1a", padding: "0.3rem 0.75rem", borderRadius: "999px", fontSize: "0.7rem", color: "#888", fontFamily: "monospace" }}>
                {Object.keys(groups).length} categories
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Image sections */}
      {Object.entries(groups).map(([folder, imgs]) => (
        <section key={folder} style={{ padding: "0 1.5rem 2.5rem" }}>
          <h2 style={{
            fontSize: "0.65rem", fontFamily: "monospace", color: "#f59e0b",
            letterSpacing: "0.12em", textTransform: "uppercase",
            margin: "0 0 0.75rem", borderBottom: "1px solid #1a1a1a", paddingBottom: "0.5rem"
          }}>
            {FOLDER_LABELS[folder] || folder}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "3px" }}>
            {imgs.map((img) => (
              <div key={img.file} style={{ position: "relative", background: "#111", overflow: "hidden", aspectRatio: "3/4" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/influencers/${inf.slug}/${img.file}`}
                  alt={img.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                  padding: "1.5rem 0.6rem 0.5rem",
                }}>
                  <div style={{ fontSize: "0.6rem", color: "#aaa", fontFamily: "monospace" }}>{img.name}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {inf.images.length === 0 && (
        <div style={{ padding: "3rem 1.5rem", textAlign: "center", color: "#444", fontSize: "0.85rem" }}>
          Only base portrait available — more content coming soon.
        </div>
      )}

      <div style={{ padding: "2rem", textAlign: "center", color: "#333", fontSize: "0.7rem", borderTop: "1px solid #1a1a1a" }}>
        mrtuandoan-blog.vercel.app · AI Influencer System
      </div>
    </main>
  );
}
