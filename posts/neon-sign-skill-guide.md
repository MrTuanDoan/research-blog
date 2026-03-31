# /neon-sign — Skill Tạo Ảnh Neon Sign Bằng AI

*Từ ý tưởng thô → prompt có cấu trúc → ảnh photorealistic → gửi thẳng Telegram. Tất cả tự động.*

---

## Skill này làm được gì?

Bạn có một quán cà phê, nhà hàng, salon, gym — và muốn hình dung neon sign của quán trông như thế nào trước khi đặt làm thật. Hoặc bạn đang bán dịch vụ thiết kế neon sign và cần tạo concept nhanh cho khách.

**/neon-sign** là một AI skill chạy trên OpenClaw, làm đúng một việc: biến ý tưởng thô thành ảnh neon sign photorealistic — rồi gửi thẳng vào Telegram của bạn.

**Pipeline đầy đủ:**
```
Ý tưởng thô → Phân tích spec → Build prompt → Gemini gen → Lưu file → Gửi Telegram
```

---

## 3 Phase chính

### Phase 1: Concept → Prompt

Đây là bước quan trọng nhất. Một prompt tệ = ảnh tệ, dù model mạnh đến đâu.

Khi nhận ý tưởng thô (ví dụ: *"neon sign cho quán phở"*), skill sẽ extract hoặc hỏi thêm:

| Thông tin | Ví dụ |
|-----------|-------|
| Tên quán | "PHO 24" |
| Loại hình | restaurant, cafe, bar, salon, gym |
| Màu neon | warm pink-red, electric blue, neon green |
| Nền | dark wood, brick wall, concrete, velvet |
| Style | retro, modern, street, luxury, kawaii |
| Extra | icon tô phở, underline, arrow, frame |

Sau đó build thành prompt 5 block:

```
[SIGN TEXT] + [FONT STYLE] + [COLOR BLOCK] + [BACKGROUND] + [EXTRAS]
+ [ENVIRONMENT] + [STYLE ANCHOR] + [QUALITY SUFFIX]
```

---

### Cấu trúc prompt chuẩn

**Template:**
```
A photorealistic neon sign photo. The sign reads: "[TÊN]" in [FONT]
neon lettering. [MÀU TUBE] against [NỀN]. [EXTRAS].
[GÓC CHỤP + MÔI TRƯỜNG]. [STYLE ANCHOR].
4K, Ultra HD, Rich details, Sharp clarity, Stable picture.
```

**Ví dụ thực tế — quán phở:**
```
A photorealistic neon sign photo. The sign reads: "PHO 24" in bold
brush-stroke neon lettering. Warm pink-red glowing neon tubes against
dark wood paneling. A small neon steaming bowl icon sits above the text.
Warm red-orange underglow spills softly onto the wall. Shot at eye level,
interior of a cozy Vietnamese restaurant at night, shallow depth of field,
warm ambient fill light. 1980s neon diner aesthetic, aged glass tube texture,
warm tungsten ambient. 4K, Ultra HD, Rich details, Sharp clarity, Stable picture.
```

**Ví dụ thực tế — cafe minimalist:**
```
A photorealistic neon sign photo. The sign reads: "DRIP" in clean modern
geometric neon lettering. Electric blue glowing tubes against dark exposed
concrete wall. A thin neon underline traces beneath the lettering. Soft
blue-white underglow spills onto the wall surface. Shot at eye level,
interior of a modern minimalist cafe at night, shallow DOF. Clean geometric
composition, pure color saturation, Kodak Vision3 500T, subtle lens flare
on brightest bend. 4K, Ultra HD, Rich details, Sharp clarity, Stable picture.
```

---

### Bảng màu theo loại hình

| Loại hình | Màu tube | Nền |
|-----------|----------|-----|
| Nhà hàng Việt | Warm pink-red / golden yellow | Dark wood / brick |
| Bar / Nightclub | Electric blue / neon green | Black concrete |
| Salon / Beauty | Hot pink / rose gold | White marble / mirror |
| Gym | Neon green / electric white | Dark metal |
| Cafe | Electric blue / warm white | Concrete / exposed brick |
| Retail / Fashion | Coral / magenta | Clean dark |
| Hotel | Warm golden | Dark velvet |

### Style Anchor theo aesthetic

| Style | Keywords |
|-------|---------|
| **Retro** | `1980s neon diner aesthetic, slight glow flicker, aged glass tube, warm tungsten ambient` |
| **Modern** | `clean geometric layout, pure color saturation, studio lighting` |
| **Cinematic** | `Kodak Vision3 500T, motivated practical lighting, subtle lens flare` |
| **Street** | `graffiti wall, rain-wet floor reflection, harsh contrast, raw urban night` |
| **Luxury** | `black velvet backdrop, thin elegant neon, gold-tinted glow, 85mm portrait lens` |

---

### Phase 2: Generation — Gemini Image API

Skill dùng **Gemini 3.1 Flash Image Preview** để generate. Hỗ trợ:

**Single prompt:**
```
/neon-sign quán cafe tên DRIP, style modern, nền bê tông
```

**Multi-reference (tối đa 9 ảnh):**
```
/neon-sign --ref anh-mau-1.jpg anh-mau-2.jpg
           quán bar tên VOID, style street urban
```

Khi dùng nhiều ref:
- Ảnh đầu tiên = style anchor chính (~40–50% weight)
- Các ảnh sau = color / layout / environment reference
- Prompt luôn mở đầu: *"Using the reference images for style, color, and layout guidance:"*

---

### Phase 3: Delivery

Sau khi gen xong:
1. **Lưu ảnh** → `neon-sign-projects/{project}/images/generated/`
2. **Lưu prompt** → `prompts/{filename}.txt` (sidecar tự động)
3. **Gửi Telegram** → bot gửi ảnh + caption vào chat
4. **Log** → cập nhật `PROJECT.md`

Caption format: `"{Tên quán} — {style} neon · {địa chỉ} · AI Concept"`

---

## Tính năng đặc biệt: Google Places Search

Đây là tính năng dành cho ai muốn scale — tìm khách hàng tiềm năng và pitch neon sign concept.

**Workflow:**
```
/neon-sign --search "Footscray, Melbourne" --type restaurant --limit 10
```

1. Gọi Google Places API → lấy danh sách quán trong khu vực
2. Với mỗi quán → tự suy ra concept sign (tên + loại hình → màu + style)
3. Generate ảnh cho từng quán
4. Gửi lên Telegram từng cái một
5. Lưu toàn bộ vào `neon-sign-projects/batch-{location}-{date}/`

**Kết quả:** 10 quán ở Footscray → 10 neon sign concept → trong ~5 phút → thẳng vào Telegram.

Dùng để: cold outreach ("tôi đã tạo concept neon sign cho quán của bạn, miễn phí, xem thử nhé")

---

## Cấu trúc project folder

```
neon-sign-projects/
└── ten-project/
    ├── PROJECT.md          ← brief, business info, generation log
    ├── images/
    │   ├── generated/      ← tất cả ảnh đã gen
    │   └── refs/           ← ảnh reference do user upload
    └── prompts/
        └── sign-v1.txt     ← prompt lưu kèm từng ảnh
```

---

## Smoke test đã chạy

Ảnh đầu tiên đã gen thành công và gửi vào Telegram:

- **Sign:** PHO 24
- **Style:** retro, warm pink-red neon, dark wood
- **Size:** 793KB
- **Status:** ✅ Gemini API OK · ✅ Telegram bot sent

---

## Cách dùng ngay

Nhắn vào Telegram:

```
/neon-sign [mô tả ý tưởng của bạn]
```

Ví dụ:
- `"neon sign cho quán bún bò tên BOBA, màu đỏ, tường gạch, retro"`
- `"sign cho salon nail tên GLOW UP, hot pink, minimalist"`
- `"search nhà hàng ở Quận 1 HCM, gen sign cho tất cả"`

---

*Built by Tuan Doan · [mrtuandoan-blog.vercel.app](https://mrtuandoan-blog.vercel.app)*
