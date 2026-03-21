# COT: Nghiên Cứu Sơ Bộ — API Request Scanning & Automation Anti-Detection

**Date:** 2026-03-21  
**Topic:** API scanning, AI image gen automation, Facebook automation + anti-detection  
**Task:** Liệt kê 50 câu hỏi nghiên cứu cốt lõi cho 2 lĩnh vực

---

## 🧠 Chain of Thought

### Phân tích bài toán

**Bài toán 1: Scan & intercept API requests từ web platform**
- Mục tiêu: Bắt HTTP request từ browser khi dùng web app gen AI (Midjourney, Stable Diffusion web UI, Kling, Sora, etc.)
- Để làm gì: Tái tạo request đó programmatically → tự động hóa mà không cần thao tác manual trên UI
- Hướng tiếp cận: Browser devtools, MitM proxy (Burp Suite, mitmproxy, Charles), Chrome Extension (như ClawNano2), Playwright/Puppeteer intercept
- Rủi ro: Rate limiting, auth tokens, CORS, HTTPS pinning, WebSocket, binary protocols

**Bài toán 2: Facebook automation + anti-detection**
- Mục tiêu: Tự động hóa hành vi trên Facebook (post, comment, react, browse) mà không bị detect là bot
- Challenge: Facebook có hệ thống ML-based bot detection rất mạnh (FBShield, Sigma)
- Hướng: Behavioral mimicry, browser fingerprint evasion, residential proxies, human-delay simulation, session management

### Reasoning Framework

Với 50 câu hỏi, tôi chia thành các nhóm:

**Domain 1 — API Scanning (25 câu):**
- Kỹ thuật intercepting
- Authentication & tokens
- Protocol analysis
- Replay & automation
- Edge cases & obstacles

**Domain 2 — Facebook Anti-Detection (25 câu):**
- Bot detection mechanisms
- Browser fingerprinting
- Behavioral patterns
- Infrastructure & identity
- Long-term sustainability

---

## 📋 50 Câu Hỏi Nghiên Cứu

---

### 🔍 DOMAIN 1: API Request Scanning & Automation

#### Nhóm A: Kỹ Thuật Intercepting (1–8)

**1.** Các tool nào tốt nhất để intercept HTTPS request từ browser: mitmproxy, Burp Suite, Charles Proxy, hay Playwright network intercept — và trường hợp nào dùng cái nào?

**2.** Khi một trang web dùng **WebSocket** thay vì REST HTTP để stream kết quả (ví dụ: streaming image gen progress), làm thế nào để capture và replay WebSocket messages?

**3.** Làm thế nào để intercept request trong **Chrome Extension** (như ClawNano2) mà không cần MitM proxy — `chrome.webRequest` vs `chrome.declarativeNetRequest` vs `fetch` monkey-patching?

**4.** Khi platform dùng **HTTP/2 multiplexing**, các tool thông thường có capture đủ headers và streams không? Cần công cụ gì đặc biệt?

**5.** Một số platform dùng **gRPC** (binary protobuf) thay vì JSON REST — làm sao decode và replay gRPC calls?

**6.** Nếu request payload được **encrypt hoặc obfuscate** ở JavaScript trước khi gửi (ví dụ: custom JS crypto), làm thế nào để reverse engineer cấu trúc thật?

**7.** **SSL Certificate Pinning** trên web app (Service Worker, pinned fetch) có phổ biến không? Cách bypass?

**8.** Làm thế nào phân biệt API endpoint nào là **essential** (cần thiết để tạo ảnh) và endpoint nào là **noise** (analytics, tracking, heartbeat) trong một session đầy đủ?

#### Nhóm B: Authentication & Session (9–14)

**9.** Hầu hết AI image gen platforms dùng auth mechanism nào — JWT, session cookie, Bearer token, OAuth? Cái nào khó replay nhất và tại sao?

**10.** Nhiều token có **short TTL** (expire sau vài phút). Làm thế nào để auto-refresh token trong automation flow mà không phải login lại thủ công?

**11.** **CSRF tokens** được nhúng trong form hay JavaScript — làm thế nào extract dynamically trước mỗi request?

**12.** Nếu platform dùng **fingerprint-based session binding** (session tied to browser fingerprint, IP, User-Agent), làm sao replay request từ môi trường khác mà không bị invalidate?

**13.** **Multi-factor auth** (2FA, CAPTCHA trước khi được token) — làm thế nào handle trong automation? Tách phase auth ra khỏi automation loop?

**14.** Một số platform issue **one-time use upload tokens** cho từng file/request. Làm thế nào detect và auto-generate/fetch các token này trong automation?

#### Nhóm C: Phân Tích & Reverse Engineering (15–19)

**15.** Tools nào tốt nhất để **diff** nhiều request sessions để tìm ra phần nào là static (có thể hardcode) và phần nào là dynamic (phải fetch mỗi lần)?

**16.** Khi platform obfuscate JavaScript (minified + webpack), workflow nào hiệu quả nhất để tìm API endpoint: search string literals, breakpoints trong DevTools, hay Source Maps?

**17.** Làm thế nào phân tích **rate limit** của một API: request per minute, per hour, per account? Cách test mà không bị ban account?

**18.** Một số platform dùng **GraphQL** — làm thế nào introspect schema và build automation query mà không có public docs?

**19.** Khi kết quả trả về là **binary stream** (raw image bytes, base64, hay pre-signed S3 URL), làm thế nào handle pipeline từ request → file?

#### Nhóm D: Replay & Automation (20–25)

**20.** Khi đã có captured request, **công cụ nào tốt nhất** để convert sang script có thể replay: curl → Python requests → Playwright fetch intercept → custom TS?

**21.** Làm thế nào thiết kế **batch automation** với CSV input (danh sách prompts) mà có rate limiting, retry logic, và error handling đúng chuẩn?

**22.** Nếu platform thay đổi API structure sau update, làm thế nào **detect breaking changes** sớm và tự động re-capture?

**23.** **Concurrent requests**: platform có cho phép parallel requests không? Làm thế nào test limit mà không bị detect là abuser?

**24.** Làm thế nào lưu trữ và quản lý **session state** (cookies, tokens, headers) giữa nhiều runs — file-based, keychain, database?

**25.** Khi automation scale lên nhiều accounts, làm thế nào **isolate session** giữa các account để tránh cross-contamination?

---

### 🤖 DOMAIN 2: Facebook Automation & Anti-Detection

#### Nhóm E: Facebook Bot Detection Mechanisms (26–32)

**26.** Facebook dùng những **signals** nào để detect automation: mouse movement patterns, scroll velocity, click timing, keystroke dynamics, hay network-level signals?

**27.** **FBShield / Sigma system** của Facebook hoạt động như thế nào ở high level? Machine learning hay rule-based? Cái gì trigger checkpoint?

**28.** Facebook có **client-side JS tracking** nào gửi behavior data về server ngoài các API requests thông thường không? Làm thế nào identify và handle?

**29.** **Account age và activity history** ảnh hưởng thế nào đến detection threshold? Account mới vs account 5 năm tuổi có threshold khác nhau không?

**30.** **Checkpoint vs Ban vs Shadow Ban** — ba trạng thái này khác nhau thế nào, và signal nào dẫn đến từng loại?

**31.** Facebook có **rate limits** per action không — bao nhiêu likes/hour, posts/day, comments/hour là "safe zone"?

**32.** **Graph API vs Web Scraping**: dùng official Graph API có ít rủi ro detection hơn không, hay Facebook vẫn detect abuse qua API?

#### Nhóm F: Browser Fingerprinting Evasion (33–38)

**33.** Các thành phần **browser fingerprint** nào Facebook thu thập: Canvas fingerprint, WebGL, AudioContext, fonts, screen resolution, timezone — cái nào quan trọng nhất?

**34.** **Playwright vs Puppeteer vs Selenium** — cái nào khó detect nhất năm 2026? Có `headless` flags nào vẫn bị detect không?

**35.** **Undetected ChromeDriver / playwright-stealth / rebrowser-patches** — các library này hoạt động thế nào và effectiveness của chúng đến đâu?

**36.** Làm thế nào fake **consistent fingerprint** qua nhiều sessions — cùng fingerprint mỗi lần (giả người thật dùng máy cũ) hay random mỗi lần?

**37.** **WebRTC IP leak** khi dùng proxy/VPN — làm thế nào disable hoặc spoof WebRTC để tránh real IP leak?

**38.** **TLS fingerprint (JA3/JA4)** — Facebook có check TLS handshake fingerprint không? Python requests vs Chrome có JA3 khác nhau?

#### Nhóm G: Behavioral Mimicry (39–44)

**39.** Làm thế nào model **human scroll patterns**: không đều đặn, dừng lại khi đọc, back-scroll, đọc comments — distribution nào realistic nhất?

**40.** **Mouse movement**: Bezier curves, micro-jitter, acceleration/deceleration — OpenClaw hay Playwright có built-in human mouse simulation không?

**41.** **Session duration và timing**: người thật browse Facebook bao lâu mỗi lần? Peak hours? Làm thế nào calibrate automation schedule cho realistic?

**42.** Sau khi post content, người thật thường làm gì? **Idle period**, check notifications, reply comments — làm thế nào simulate post-action behavior?

**43.** **Typing simulation**: khi comment hoặc post, typing speed, correction patterns, paste vs type — WPM nào là human-like?

**44.** **Cognitive pauses**: người thật dừng lại trước khi click Like, đọc trước khi comment — làm thế nào model decision-making delays?

#### Nhóm H: Infrastructure & Identity Management (45–50)

**45.** **Residential proxies vs Datacenter proxies vs Mobile proxies** — loại nào an toàn nhất cho Facebook automation năm 2026?

**46.** Làm thế nào **rotate IP** mà không làm Facebook nghi ngờ — IP phải consistent trong một session hay có thể change mid-session?

**47.** **Account warmup strategy**: tài khoản mới cần được "ủ" bao lâu và qua những activity nào trước khi bắt đầu automation?

**48.** **Multi-account management**: dùng chung cookie jar, proxy pool, hay browser profile cho nhiều accounts — rủi ro linking accounts?

**49.** Nếu account bị **checkpoint (phone verify, ID verify)**, có thể recover programmatically không, hay phải manual intervention?

**50.** **Long-term sustainability**: automation strategy nào có thể sustain 6+ tháng mà không bị ban — pure mimicry, official API, hay hybrid approach?

---

## 🗺️ Research Roadmap

### Priority Order (dựa trên impact × feasibility):

**Tier 1 — Bắt đầu ngay (tuần 1–2):**
- Q3, Q8, Q15, Q20 (ClawNano2 intercept + replay pipeline)
- Q33, Q35, Q39 (fingerprint + basic behavioral mimicry)

**Tier 2 — Nghiên cứu tiếp (tuần 3–4):**
- Q9, Q10, Q11 (auth handling)
- Q26, Q31, Q45 (Facebook detection + infrastructure)

**Tier 3 — Deep dive khi có base:**
- Q5, Q6, Q7 (advanced protocol challenges)
- Q46, Q47, Q48 (multi-account management)

---

## 💡 Key Insights

1. **ClawNano2** đã solve phần lớn Q1–Q4 cho web-based API scanning — extend với CSV batch replay
2. **Facebook automation** risk cao nhất ở fingerprinting layer, không phải behavior layer
3. Hai domain này **có thể kết hợp**: scan Facebook API requests → replay programmatically + stealth browser
4. Ưu tiên **residential mobile proxies** cho Facebook — datacenter IPs bị blacklist nhiều
5. **Account warmup** là bước hay bị skip nhất → leading cause of early bans

---

*COT Output — Antigravity | 2026-03-21*
