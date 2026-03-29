import Link from "next/link";
import { INFLUENCERS } from "@/lib/influencers-data";

export const metadata = {
  title: "AI Influencer Gallery",
  description: "AI-generated influencers — portraits, character sheets, macro shots, BOPA poses",
};

export default function InfluencersPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      <style>{`
        .inf-card img { transition: transform 0.35s ease; }
        .inf-card:hover img { transform: scale(1.05); }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #1a1a1a", padding: "2.5rem 2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: 0, letterSpacing: "-0.03em" }}>
          AI Influencer Gallery
        </h1>
        <p style={{ color: "#555", marginTop: "0.5rem", fontSize: "0.85rem" }}>
          {INFLUENCERS.length} characters &middot; Gemini Image Generation &middot; BOPA-UP System
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "2px",
        padding: "2px",
        background: "#000",
      }}>
        {INFLUENCERS.map((inf) => (
          <Link
            key={inf.slug}
            href={`/influencers/${inf.slug}`}
            className="inf-card"
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
          >
            <div style={{ position: "relative", background: "#111", overflow: "hidden", aspectRatio: "3/4" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/influencers/${inf.slug}/base.jpg`}
                alt={inf.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                loading="lazy"
              />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.92))",
                padding: "2.5rem 0.85rem 0.75rem",
              }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.02em" }}>{inf.name}</div>
                {inf.niche && (
                  <div style={{ fontSize: "0.6rem", color: "#888", marginTop: "0.2rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{inf.niche}</div>
                )}
                <div style={{ fontSize: "0.55rem", color: "#f59e0b", fontFamily: "monospace", marginTop: "0.3rem" }}>
                  {inf.imageCount} image{inf.imageCount !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ padding: "2rem", textAlign: "center", color: "#333", fontSize: "0.7rem", borderTop: "1px solid #1a1a1a", marginTop: "2px" }}>
        mrtuandoan-blog.vercel.app &middot; AI Influencer System
      </div>
    </main>
  );
}
