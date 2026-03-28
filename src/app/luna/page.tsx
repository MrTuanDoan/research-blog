export const metadata = {
  title: "Luna Nguyễn — BOPA-UP Gallery",
  description: "10 unique poses · Landmark 81 Night Series · AI Influencer",
};

const POSES = [
  { id: "UP-01",  name: "Nằm Đọc Sách",               file: "luna-UP-01.jpg" },
  { id: "UP-02B", name: "Ngồi Chân Bắt Chéo",          file: "luna-UP-02B.jpg" },
  { id: "UP-02C", name: "Ngồi Thẳng Lưng",             file: "luna-UP-02C.jpg" },
  { id: "UP-02D", name: "Nằm Mèo Trên Ngực",           file: "luna-UP-02D.jpg" },
  { id: "UP-02F", name: "Nằm Laptop",                  file: "luna-UP-02F.jpg" },
  { id: "UP-02G", name: "Nằm MacBook Nhìn TP",         file: "luna-UP-02G.jpg" },
  { id: "UP-02H", name: "Ngồi Ăn Kem",                 file: "luna-UP-02H.jpg" },
  { id: "UP-02I", name: "Nằm Bấm iPhone",              file: "luna-UP-02I.jpg" },
  { id: "UP-02K", name: "Nằm Thảm + Mèo",             file: "luna-UP-02K.jpg" },
  { id: "UP-02L", name: "Ngồi Suy Tư Cửa Kính",       file: "luna-UP-02L.jpg" },
];

export default function LunaGallery() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "system-ui, sans-serif", margin: 0, padding: 0 }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid #1f1f1f", padding: "2rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Luna Nguyễn</h1>
        <p style={{ color: "#666", marginTop: "0.4rem", fontSize: "0.85rem", margin: "0.4rem 0 0" }}>
          BOPA-UP · Landmark 81 Night Series · 10 Unique Poses
        </p>
        <p style={{ color: "#333", marginTop: "0.2rem", fontSize: "0.7rem" }}>
          Gemini 3.1 Flash Image Preview
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "3px",
        padding: "3px",
        background: "#000",
      }}>
        {POSES.map((pose) => (
          <div
            key={pose.id}
            style={{ position: "relative", background: "#111", overflow: "hidden", aspectRatio: "3/4" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/luna/${pose.file}`}
              alt={pose.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              loading="lazy"
            />
            {/* Always-visible label */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(transparent, rgba(0,0,0,0.9))",
              padding: "2rem 0.75rem 0.6rem",
            }}>
              <div style={{ fontSize: "0.6rem", color: "#f59e0b", fontFamily: "monospace", letterSpacing: "0.05em" }}>
                {pose.id}
              </div>
              <div style={{ fontSize: "0.8rem", fontWeight: 500, marginTop: "0.1rem" }}>
                {pose.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #1a1a1a",
        padding: "1.25rem",
        textAlign: "center",
        color: "#333",
        fontSize: "0.7rem",
      }}>
        BOPA-UP System · mrtuandoan-blog.vercel.app
      </div>
    </main>
  );
}
