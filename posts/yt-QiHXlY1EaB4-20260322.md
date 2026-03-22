# AI Agent Tìm Website Xấu & Redesign Thành $5,000 Builds — Keypoints + Timestamps

**Nguồn:** https://youtu.be/QiHXlY1EaB4  
**Kênh:** Jay E | RoboNuggets  
**Ngày đăng:** 2026-03-21  
**Tóm tắt:** 2026-03-22

---

## 🎯 TL;DR

Build một AI agent system tự động: (1) scrape Google Maps tìm doanh nghiệp có website xấu, (2) đánh giá website bằng screenshot, (3) redesign thành site đẹp $5K-look bằng single HTML file, (4) deploy lên Vercel miễn phí → gửi cho client như demo pitch. Toàn bộ pipeline chạy tự động, chi phí ~$0.20/lần chạy.

---

## 📍 Keypoints + Timestamps

### 🔥 Concept & Cơ Hội
| Timestamp | Keypoint |
|-----------|---------|
| **00:00** | Intro: Agent scrapes city → redesigns ugly websites → hands you batch of polished demos to send |
| **00:14** | Schedule agent daily → 20-100 finished websites per day automatically |
| **01:45** | Opportunity: hầu hết local businesses có website trông như xây từ năm 2000 |
| **01:59** | Vấn đề: họ biết website xấu nhưng agency tính $4K-$5K+ nên để vậy |
| **02:09** | Giải pháp mới: show them what their website COULD be → thuyết phục hơn nhiều so với cold email |

---

### 🛠️ "Beautiful Websites Agent Toolkit" — 4 Skills
| Timestamp | Keypoint |
|-----------|---------|
| **02:56** | Tên toolkit: **"Beautiful Websites Agent Toolkit"** — gửi cho OpenClaw/Claude Code là chạy được |
| **03:02** | Gồm **4 skills** (mỗi skill là 1 text file) + 1 workflow.mmd file điều phối |
| **03:36** | Skills hoàn toàn reusable — dùng lại cho các workflow khác không liên quan |
| **04:32** | `workflow.mmd` là file text định nghĩa thứ tự bước, các edge cases và watch-outs |

---

### 📍 Skill 1: Scrape Google Maps (Apify)
| Timestamp | Keypoint |
|-----------|---------|
| **06:03** | Tool: **Apify** — "Google Maps Email Extractor" actor |
| **06:29** | Input: niche + city + số lượng (VD: "50 nail salons in Sydney") |
| **07:02** | Agent tự filter: chỉ giữ listing có **website + email** |
| **07:31** | Agent tự drop junk emails mà không cần code thêm (inherent AI smartness) |
| **08:08** | Listing không có website → cơ hội **pitch new website** thay vì redesign |
| **06:48** | Agent báo cost trước khi chạy (transparency best practice trong skill) |

---

### 📸 Skill 2: Screenshot & Qualify (Playwright)
| Timestamp | Keypoint |
|-----------|---------|
| **09:46** | Tool: **Playwright** (free) — chụp full-page screenshot từng website |
| **09:51** | Agent nhìn screenshot, tự quyết định website có đáng redesign không |
| **10:31** | Qualification criteria: outdated visual design, table layouts, flat typography, cluttered layout |
| **10:46** | Kết quả demo: hơn 50% trong 50 listings được qualify là cần redesign |
| **10:59** | Website đã đẹp (Sir Beauty) → agent tự skip, không pitch |

---

### 🎨 Skill 3: Redesign → Single HTML File
| Timestamp | Keypoint |
|-----------|---------|
| **10:18** | "This is where the magic happens" |
| **11:31** | Output: **single HTML file** trông như $5,000+ custom design |
| **11:45** | Steps: đọc website cũ → check build log (tránh repeat design) → search Unsplash stock photos → verify photo URLs → generate HTML |
| **11:06** | Built-in **design system** là key tạo ra quality output |
| **11:12** | Based on open-source "**taste skill**" by developer Leon (link trong video) |
| **11:45** | Tự verify Unsplash photo URLs để tránh broken images |
| **12:30** | Agent redesign ALL qualified websites in one go |

---

### 🚀 Skill 4: Deploy lên Vercel (Free)
| Timestamp | Keypoint |
|-----------|---------|
| **12:06** | Tool: **Vercel CLI** — deploy miễn phí |
| **12:20** | Output: URL dạng `*.vercel.app` — live link gửi thẳng cho prospect |
| **12:45** | Step 3 & 4 thường chạy cùng nhau (generate → deploy ngay) |
| **13:45** | 5 websites live trong vài phút, tổng chi phí: **~$0.20** (chỉ cho Apify scraping) |

---

### 🔄 Pipeline Extension & Bigger Picture
| Timestamp | Keypoint |
|-----------|---------|
| **13:13** | Extend: thêm Step 5 → aggregate sites → kết nối **Instantly** để automate cold outreach |
| **13:23** | Schedule pipeline daily/weekly trong OpenClaw cho một region cụ thể |
| **13:29** | Framework này áp dụng cho nhiều lĩnh vực: **SEO audits, social media presence, Google Business profiles** |
| **14:31** | Core pattern: *find a problem → automate the fix → pitch the solution to clients* |
| **13:56** | Refine design skill cho các industry/niche khác nhau |

---

### 🖥️ RoboLabs Visual Interface
| Timestamp | Keypoint |
|-----------|---------|
| **03:36** | Robolabs đang build **visual interface** để present agent systems cho clients |
| **03:47** | Lý do cần: Claude Code (wall of code) hay OpenClaw (Telegram chat) đều không ideal để show clients |
| **03:08** | Mỗi skill được visualize như một node — không intimidating cho người mới |

---

## 💰 Economics

| Item | Chi phí |
|------|---------|
| Apify scraping (50 listings) | ~$0.20 |
| Playwright | Free |
| Vercel deployment | Free |
| OpenClaw/Claude API | Negligible per run |
| **Tổng per batch (50 businesses)** | **~$0.20** |
| Potential revenue per client | **$2,000 – $5,000+** |

---

## 🔑 Key Insight

> Skills = text files. Workflow = text file. Toàn bộ intelligence nằm trong well-written documentation hướng dẫn agent làm từng bước — không cần code bằng tay.

---

*Video bởi Jay E | RoboNuggets | Tóm tắt: Antigravity — 2026-03-22*
