export const metadata = {
  title: "Luna Nguyen - BOPA-UP Gallery",
  description: "10 unique poses - Landmark 81 Night Series - AI Influencer",
};

const POSES = [
  { id: "UP-01",  name: "Nam Doc Sach",          file: "luna-UP-01.jpg" },
  { id: "UP-02B", name: "Ngoi Chan Bat Cheo",     file: "luna-UP-02B.jpg" },
  { id: "UP-02C", name: "Ngoi Thang Lung",        file: "luna-UP-02C.jpg" },
  { id: "UP-02D", name: "Nam Meo Tren Nguc",      file: "luna-UP-02D.jpg" },
  { id: "UP-02F", name: "Nam Laptop",             file: "luna-UP-02F.jpg" },
  { id: "UP-02G", name: "Nam MacBook Nhin TP",    file: "luna-UP-02G.jpg" },
  { id: "UP-02H", name: "Ngoi An Kem",            file: "luna-UP-02H.jpg" },
  { id: "UP-02I", name: "Nam Bam iPhone",         file: "luna-UP-02I.jpg" },
  { id: "UP-02K", name: "Nam Tham + Meo",         file: "luna-UP-02K.jpg" },
  { id: "UP-02L", name: "Ngoi Suy Tu Cua Kinh",   file: "luna-UP-02L.jpg" },
];

export default function LunaGallery() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "system-ui, sans-serif", margin: 0, padding: 0 }}>
      <div style={{ borderBottom: "1px solid #1f1f1f", padding: "2rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Luna Nguyen</h1>
        <p style={{ color: "#666", marginTop: "0.4rem", fontSize: "0.85rem" }}>
          BOPA-UP &middot; Landmark 81 Night Series &middot; 10 Unique Poses
        </p>
        <p style={{ color: "#333", marginTop: "0.2rem", fontSize: "0.7rem" }}>
          Gemini 3.1 Flash Image Preview
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "3px",
        padding: "3px",
        background: "#000",
      }}>
        {POSES.map((pose) => (
          <div key={pose.id} style={{ position: "relative", background: "#111", overflow: "hidden", aspectRatio: "3/4" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/luna/${pose.file}`}
              alt={pose.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              loading="lazy"
            />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent, rgba(0,0,0,0.9))",
              padding: "2rem 0.75rem 0.6rem",
            }}>
              <div style={{ fontSize: "0.6rem", color: "#f59e0b", fontFamily: "monospace", letterSpacing: "0.05em" }}>{pose.id}</div>
              <div style={{ fontSize: "0.8rem", fontWeight: 500, marginTop: "0.1rem" }}>{pose.name}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid #1a1a1a", padding: "1.25rem", textAlign: "center", color: "#333", fontSize: "0.7rem" }}>
        BOPA-UP System &middot; mrtuandoan-blog.vercel.app
      </div>
    </main>
  );
}
