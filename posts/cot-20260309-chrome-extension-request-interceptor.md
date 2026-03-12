# COT: Chrome Extension — Request Interceptor + Batch Replay
Date: 2026-03-09
Topic: Browser extension tự động capture và replay requests với prompt list

---

## Mục tiêu

Build Chrome extension cho phép:
1. Capture HTTP request khi user thao tác trên web AI tool (vd: martini.film)
2. Lưu request thành template có variable slots
3. Batch replay với prompt list do user cung cấp (CSV/JSON)
4. Thu thập kết quả tự động

---

## Kiến trúc tổng quan

```
[Target Website] → [Extension captures XHR/fetch] → [Extension stores request template]
                                                              ↓
                          [User provides prompt list] → [Extension replaces variables]
                                                              ↓
                                               [Batch replay requests] → [Collect responses]
```

---

## Thành phần kỹ thuật

### 1. Request Capture Layer
- **Phương pháp:** Inject `content_script` → override `window.fetch` và `XMLHttpRequest.prototype`
- **Intercept:** endpoint URL, method, headers (auth token, content-type), body/payload
- **Lưu template:** Serialize → gửi qua `chrome.runtime.sendMessage` lên background

### 2. Request Template Storage
Template format:
```json
{
  "id": "martini_generate",
  "url": "https://api.martini.film/v1/generate",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer {{TOKEN}}",
    "Content-Type": "application/json"
  },
  "body": {
    "prompt": "{{PROMPT}}",
    "reference_image": "{{IMAGE_URL}}",
    "style": "{{STYLE}}",
    "cfg_scale": 7.5
  }
}
```

### 3. Variable Detection & Mapping
- Extension phân tích body → suggest string fields làm variable
- User mark field → `{{VARIABLE}}`
- Map variable với column trong CSV

### 4. Batch Replay Engine
- Iterate từng row trong prompt list
- Replace variables → fire fetch() từ trong content script (bypass CORS)
- Rate limiting: configurable delay
- Response collector: lưu kết quả

### 5. Extension UI (Sidepanel)
```
[Captured Requests] → [Variable Mapper] → [Upload CSV] → [Run Batch] → [Results Log]
```

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Extension | Chrome MV3 |
| Language | TypeScript + Vite |
| Storage | chrome.storage.local |
| UI | React (popup/sidepanel) |
| CSV | papaparse |
| Styling | Tailwind CSS |

---

## Implementation Plan

### Phase 1 — Core Capture (2-3 ngày)
```
manifest.json (MV3)
├── background/service_worker.js
│   ├── RequestTemplateStore
│   └── BatchRunner
├── content_scripts/interceptor.js
│   ├── Override fetch/XHR
│   └── Send to background
└── popup/
    ├── RequestList.js
    └── VariableMapper.js
```
**Milestone:** Thấy list captured requests sau khi dùng martini.film

### Phase 2 — Batch Replay (3-4 ngày)
```
├── background/BatchRunner.js
│   ├── loadPromptList(csv)
│   ├── renderTemplate(template, row)
│   ├── executeRequest(rendered)
│   └── collectResult(response)
└── popup/
    ├── BatchConfig.js (upload CSV, map vars, delay, run/pause)
    └── ResultsView.js (success count, error log, export)
```
**Milestone:** 20 prompts → 20 requests tự động → log kết quả

### Phase 3 — Polish (2 ngày)
- Sidepanel UX
- Auto-refresh token
- Profile system (multiple site templates)
- Export/Import templates

---

## Thách thức & Giải pháp

| Thách thức | Giải pháp |
|-----------|-----------|
| Auth token expiry | Capture từ cookie/localStorage mỗi batch run |
| CORS | Chạy request từ content script trong tab target |
| Dynamic headers | Inject execution-time headers |
| File upload | Base64 hoặc pre-upload → lấy URL |
| Rate limiting | Randomized delay + retry-after |

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Site update API | Medium | High | Re-capture nhanh (<5 min) |
| Bot detection | Medium | Medium | Delay + human intervals |
| MV3 service worker sleep | Medium | Low | Keep-alive ping |

---

## Kết luận

**Khả thi 100%** — pattern đã proven (Postman, ModHeader, etc.)

**Điểm mạnh:**
- Chạy in-tab → auth cookies tự nhiên
- Generic — hoạt động bất kỳ website nào
- Template reuse cho nhiều AI tools

**Ước tính:** 7-10 ngày với Claude Code
**Next step:** Init repo → dùng `coding-agent` skill để build

---

*Saved: 2026-03-09 | /cot command*
