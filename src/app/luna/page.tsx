import Image from "next/image";

const POSES = [
  { id: "UP-01",  name: "Nằm Đọc Sách",              file: "luna-UP-01.jpg" },
  { id: "UP-02B", name: "Ngồi Chân Bắt Chéo Nhìn TP", file: "luna-UP-02B.jpg" },
  { id: "UP-02C", name: "Ngồi Thẳng Lưng",            file: "luna-UP-02C.jpg" },
  { id: "UP-02D", name: "Nằm Mèo Trên Ngực",          file: "luna-UP-02D.jpg" },
  { id: "UP-02F", name: "Nằm Laptop",                 file: "luna-UP-02F.jpg" },
  { id: "UP-02G", name: "Nằm MacBook Nhìn TP",        file: "luna-UP-02G.jpg" },
  { id: "UP-02H", name: "Ngồi Ăn Kem",                file: "luna-UP-02H.jpg" },
  { id: "UP-02I", name: "Nằm Bấm iPhone",             file: "luna-UP-02I.jpg" },
  { id: "UP-02K", name: "Nằm Thảm + Mèo Nhìn TP",    file: "luna-UP-02K.jpg" },
  { id: "UP-02L", name: "Ngồi Suy Tư Cửa Kính",      file: "luna-UP-02L.jpg" },
];

export const metadata = {
  title: "Luna Nguyễn — BOPA-UP Gallery",
  description: "10 unique poses · Landmark 81 Night Series · AI Influencer",
};

export default function LunaGallery() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Luna Nguyễn</h1>
        <p className="mt-2 text-gray-400 text-sm">
          BOPA-UP · Landmark 81 Night Series · 10 Unique Poses
        </p>
        <p className="mt-1 text-gray-600 text-xs">
          Generated with Gemini 3.1 Flash Image Preview
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-1 p-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {POSES.map((pose) => (
          <div key={pose.id} className="group relative overflow-hidden bg-gray-900">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={`/luna/${pose.file}`}
                alt={pose.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <div>
                <span className="text-xs font-mono text-amber-400">{pose.id}</span>
                <p className="text-sm font-medium text-white leading-tight">{pose.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 px-6 py-6 text-center text-gray-600 text-xs">
        <p>BOPA-UP System · AI Influencer Pipeline · mrtuandoan-blog.vercel.app</p>
      </div>
    </main>
  );
}
