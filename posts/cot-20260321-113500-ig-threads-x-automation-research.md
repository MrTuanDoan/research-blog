# COT: Nghiên Cứu Sơ Bộ — Instagram, Threads & X (Twitter) Automation + Anti-Detection

**Date:** 2026-03-21  
**Topic:** Platform-specific automation & anti-detection cho Instagram, Threads, X  
**Extends:** `cot-20260321-112140-api-scanning-automation-research.md` (Facebook + API Scanning)  
**Task:** 50 câu hỏi nghiên cứu cho 3 platforms

---

## 🧠 Chain of Thought

### So sánh Detection Architecture giữa các platform

| Platform | Detection Stack | API Stance | Anti-bot Level | Unique Challenge |
|----------|----------------|-----------|----------------|------------------|
| **Facebook** | FBShield + Sigma ML | Graph API restricted | 🔴 Rất cao | Checkpoint + ID verify |
| **Instagram** | Shared Meta stack (FBShield) | Không có public API cho posting | 🔴 Rất cao | Rate limiting cực kỳ aggressive, shadow ban |
| **Threads** | Meta stack nhưng mới → nhẹ hơn | Threads API (mới mở 2024) | 🟡 Trung bình | API mới = ít ổn định, nhưng dễ hơn IG |
| **X (Twitter)** | Arkose Labs CAPTCHA + heuristics | API v2 + Enterprise (trả tiền) | 🟠 Cao | API tốn phí, rate limit chặt, Elon changes random |

### Reasoning

**Instagram:** Cùng Meta ecosystem → share rất nhiều detection logic với Facebook. Nhưng IG có thêm challenges riêng:
- Không có official posting API cho personal accounts
- Mobile-first → nhiều request patterns khác desktop
- Shadow ban rất phổ biến → khó detect mình đang bị
- Hashtag & Explore algorithm bị ảnh hưởng bởi engagement patterns

**Threads:** Meta mở Threads API 2024 — cơ hội lớn nhất vì:
- Platform mới, detection chưa mature
- Official API cho posting, reading, replying
- Rate limits dễ chịu hơn IG/FB
- Nhưng API scope hạn chế, và Meta có thể tighten bất cứ lúc nào

**X (Twitter):** Post-Elon era tạo chaos nhưng cũng tạo cơ hội:
- API v2 có tiers rõ ràng (Free, Basic $100/mo, Pro $5000/mo)
- Arkose Labs CAPTCHA cho web login
- Nitter/alternatives bị kill → scraping khó hơn
- Nhưng community tools vẫn active (tweepy, twikit, etc.)

### Structure: 50 câu hỏi chia đều

- **Instagram:** 18 câu (nền tảng khó nhất, cần nhiều research nhất)
- **Threads:** 14 câu (nền tảng mới, ít complexity hơn)
- **X (Twitter):** 18 câu (ecosystem phức tạp, API tiers, scraping alternatives)

---

## 📋 50 Câu Hỏi Nghiên Cứu

---

### 📸 DOMAIN 3: Instagram Automation & Anti-Detection

#### Nhóm A: Instagram API & Request Analysis (1–6)

**1.** Instagram Web dùng **GraphQL API** (endpoint `graphql/query`) — cấu trúc query hash và variables ra sao? Làm thế nào map UI action → GraphQL mutation?

**2.** Instagram Mobile App dùng **Private API** (`i.instagram.com/api/v1/`) khác hẳn Web. Nên target Web hay Mobile API khi automation, và trade-offs là gì?

**3.** Khi post ảnh/Reels lên Instagram, flow gồm **upload → configure → publish** qua nhiều endpoints — sequence chính xác là gì và có middleware check nào giữa các bước?

**4.** Instagram dùng **x-ig-app-id**, **x-asbd-id**, **x-csrftoken** trong headers — cái nào bắt buộc, cái nào decorative? Thiếu cái nào sẽ bị block ngay?

**5.** **Instagram Reels upload** qua web có khác mobile không? Platform có ưu tiên push content từ mobile hơn web (reach/algorithm penalty)?

**6.** Instagram có **server-side rendering (SSR)** hay **client-side hydration**? Ảnh hưởng thế nào đến việc scrape content vs dùng API?

#### Nhóm B: Instagram Detection & Shadow Ban (7–12)

**7.** **Instagram Shadow Ban** hoạt động chính xác thế nào — post không hiện trong Explore/hashtag, hay reach bị throttle dần? Cách detect mình đang bị shadow ban?

**8.** Instagram tracking **device_id**, **phone_id**, **uuid** cho mỗi login session — các ID này được generate thế nào và phải persist bao lâu để không bị nghi?

**9.** **Action blocks** (temporary ban trên specific actions: like, follow, comment) — trigger bởi gì? Số lượng per hour hay pattern-based?

**10.** Instagram có **trust score** per account không? Account creator vs consumer vs business → score khác nhau? Verified badge ảnh hưởng threshold?

**11.** **Engagement pods** (nhóm like/comment lẫn nhau) bị Instagram detect bằng cách nào — network graph analysis, timing correlation, hay content analysis?

**12.** Khi Instagram detect automation, nó **escalate gradually** (warning → action block → temporary ban → permanent) hay có thể skip thẳng đến ban?

#### Nhóm C: Instagram-Specific Technical Challenges (13–18)

**13.** **Instagram Login Challenge**: khi login từ device/IP mới, Instagram bắt verify qua email/SMS/authenticator — làm thế nào handle programmatically?

**14.** Instagram image upload yêu cầu **specific image dimensions và compression** — JPEG quality, aspect ratio (4:5, 1:1, 16:9) — bị reject nếu sai?

**15.** **Carousel posts** (multiple images) — upload flow khác single post thế nào? API sequence và size limits?

**16.** Instagram **DM automation** (Direct Messages) — API endpoint nào, có separate rate limits không, và risk level so với public actions?

**17.** **Instagram Stories** upload flow — 24h expiry, sticker overlays, polls — có thể automate full-featured stories không hay chỉ basic image?

**18.** Instagram **Explore page algorithm** — automated engagement patterns (rapid like/comment) có bị penalize trong Explore ranking không, dù không bị ban?

---

### 🧵 DOMAIN 4: Threads Automation & Anti-Detection

#### Nhóm D: Threads API & Architecture (19–25)

**19.** **Threads API** (official, launched 2024) — scope hiện tại: post text, images, videos, reply, quote — còn thiếu gì so với web UI? Rate limits chính thức?

**20.** Threads API dùng **OAuth 2.0** với Instagram login — token lifetime bao lâu? Refresh flow có stable không hay hay bị revoke?

**21.** **Threads Web** (`threads.net`) dùng API backend nào — cùng GraphQL với Instagram hay separate? Có thể intercept và replay web requests thay vì dùng official API?

**22.** Threads có **separate detection system** hay hoàn toàn rely vào Meta's shared stack? Account bị ban trên Threads có ảnh hưởng Instagram không (và ngược lại)?

**23.** **Threads API rate limits** cụ thể: bao nhiêu posts/hour, replies/hour, media uploads/day? Có burst allowance không?

**24.** Threads có **edit post** feature — API có support không? Workflow: post → edit sau vài phút có bị flag là automation pattern?

**25.** **Threads Search/Discovery** — content từ API posts có được index vào search/For You feed bình thường không, hay bị deprioritize vs native posts?

#### Nhóm E: Threads-Specific Opportunities (26–32)

**26.** Threads đang trong **growth phase** — Meta có đang relax detection để boost content volume không? Window of opportunity bao lâu?

**27.** **Cross-posting Instagram ↔ Threads** — official feature vs API automation: cái nào safer? Instagram post tự share sang Threads có khác gì API post riêng?

**28.** Threads **conversation threading** (replies, quotes) — automation reply chains có bị detect dễ hơn single posts không?

**29.** **Threads Insights API** — có thể pull analytics (views, likes, replies) programmatically không? Dùng để auto-optimize content strategy?

**30.** Threads có **webhook/callback** khi có reply/mention không, hay phải polling? Polling frequency nào an toàn?

**31.** **Media attachments** trên Threads — image/video upload qua API có preprocessing requirements (resize, compress) giống Instagram không?

**32.** Account **Threads-only** (không link Instagram) — có ít detection hơn không? Hay thiếu IG linking = trust score thấp hơn?

---

### 🐦 DOMAIN 5: X (Twitter) Automation & Anti-Detection

#### Nhóm F: X API Landscape 2026 (33–38)

**33.** **X API v2 tiers** hiện tại: Free (read-only?), Basic ($100/mo), Pro ($5000/mo), Enterprise — mỗi tier cho phép gì chính xác? Giới hạn posts/reads per month?

**34.** **Free tier API** — năm 2026 còn cho phép post hay chỉ read? Có thể dùng Free tier cho monitoring rồi switch sang paid cho actions?

**35.** **X API OAuth 2.0 PKCE** vs OAuth 1.0a — cái nào preferred cho automation? Bot accounts vs User accounts có access scope khác nhau?

**36.** X có **Arkose Labs CAPTCHA** cho web login — programmatic solve có khả thi không? Cost per solve? Alternative: maintain persistent session cookies?

**37.** Sau khi Elon mua Twitter, API terms thay đổi liên tục — làm thế nào **track policy changes** kịp thời để không bị revoke access?

**38.** **X Premium (Blue) accounts** — có higher API limits không? Posting từ Premium account có reach advantage so với free account?

#### Nhóm G: X Scraping & Unofficial Access (39–44)

**39.** **Nitter đã chết** (2024) — alternatives nào còn hoạt động cho public tweet scraping năm 2026? RSS bridges? Guest token exploitation?

**40.** X web client (`x.com`) dùng **GraphQL API** phức tạp với `queryId` thay đổi mỗi build — làm thế nào auto-extract queryId từ JS bundles?

**41.** **twikit, tweepy, snscrape** — library nào còn maintain và hoạt động năm 2026? Có unofficial library nào mới thay thế?

**42.** X có **guest tokens** cho unauthenticated access — còn hoạt động không? Rate limits và scope của guest access?

**43.** **X Spaces** (audio) — có API để join/record/transcribe không? Hay phải browser automation?

**44.** X **DM automation** — API v2 có DM endpoints không? Enterprise-only hay available ở Basic tier?

#### Nhóm H: X Anti-Detection Specifics (45–50)

**45.** X detect automation bằng **signals nào**: posting frequency, engagement ratio (bao nhiêu tweet vs reply vs like), device consistency, hay content analysis?

**46.** **X rate limits per action** — bao nhiêu tweets/hour, likes/day, follows/day, DMs/day là safe? Có difference giữa API actions vs web UI actions?

**47.** X có **automated account labeling** ("Automated by...") — khi nào bắt buộc, khi nào optional? Label này ảnh hưởng reach không?

**48.** **Thread automation** trên X (multi-tweet threads) — API v2 có native thread support không? Timing giữa các tweets trong thread nên bao lâu?

**49.** X **Community Notes** (fact-checking) — automated accounts có bị target bởi Community Notes nhiều hơn không? Ảnh hưởng thế nào đến account longevity?

**50.** **X Lists, Bookmarks, Polls** — các feature phụ này có API support không? Dùng chúng để warm up account (tạo organic behavior) có hiệu quả?

---

## 🗺️ Cross-Platform Research Roadmap

### So sánh Risk vs Opportunity

```
                    Risk ←————————————————→ Opportunity
                    
Instagram   ████████████████░░░░  High risk, high reward (visual content king)
Facebook    ██████████████░░░░░░  High risk, moderate reward (declining organic)  
X (Twitter) ████████████░░░░░░░░  Medium risk, medium reward (API exists but costly)
Threads     ██████░░░░░░░░░░░░░░  Low risk, high opportunity (new platform, growth phase)
```

### Priority Execution Order

**Phase 1 — Threads (tuần 1–2):** ← Dễ nhất, ROI nhanh nhất
- Q19–Q23: Threads API setup, rate limits, OAuth flow
- Q26: Growth phase window assessment
- Q27: Cross-posting IG ↔ Threads strategy

**Phase 2 — X Twitter (tuần 2–3):** ← API có sẵn, trả tiền = ít risk hơn
- Q33–Q35: API tier selection, cost analysis
- Q40–Q41: Scraping alternatives nếu cần supplement API
- Q46, Q48: Rate limits + thread automation

**Phase 3 — Instagram (tuần 3–5):** ← Khó nhất, cần kết quả từ Phase 1–2
- Q1–Q3: API/GraphQL mapping
- Q7–Q9: Shadow ban + detection research
- Q13: Login challenge handling

**Phase 4 — Cross-platform integration (tuần 5–6):**
- Unified content pipeline: create once → distribute to all 4 platforms
- Shared proxy/fingerprint pool
- Centralized analytics dashboard

---

## 💡 Key Insights

### Per-Platform

**Instagram:**
1. **Không có official posting API** cho personal accounts → phải dùng Private API hoặc browser automation = risk cao nhất
2. **Shadow ban** là killer — có thể bị months mà không biết, engagement chết dần
3. **Mobile API** (`i.instagram.com`) nhìn chung safer hơn Web API vì Instagram designed cho mobile-first
4. **device_id persistence** là critical — thay đổi device_id = red flag ngay lập tức

**Threads:**
5. **Window of opportunity** đang mở — Meta muốn grow Threads → detection nhẹ hơn IG/FB
6. **Official API** = safest path — dùng API chính thức, stay within rate limits, gần như zero risk
7. **Cross-posting trap** — Instagram auto-share sang Threads khác với Threads API post → cẩn thận duplicates

**X (Twitter):**
8. **API tiers** = pay-to-play — $100/mo (Basic) là minimum viable cho posting automation
9. **GraphQL queryId rotation** — X thay đổi queryIds mỗi deploy → scraping cần auto-adaptation layer
10. **Automated label** — X bắt buộc label cho bot accounts, nhưng labeled accounts bị reach penalty

### Cross-Platform

11. **Threads → Instagram pipeline** có synergy mạnh nhất vì cùng Meta ecosystem + shared account
12. **Content adaptation** cần thiết: X = short text + links, IG = visual-first, Threads = conversational, FB = long-form
13. **Proxy strategy** nên per-platform: residential cho Meta (IG/FB/Threads), datacenter okay cho X API (vì dùng official API)
14. **One account, multiple platforms** ít rủi ro hơn **multiple accounts, one platform**

---

## 🔗 Related Research

- **Facebook + API Scanning:** `cot-20260321-112140-api-scanning-automation-research.md`
- **ClawNano2:** Request interception Chrome Extension → applicable cho IG/X web scraping
- **OpenClaw Browser Control:** Applicable cho behavioral mimicry trên tất cả platforms

---

*COT Output — Antigravity | 2026-03-21*
