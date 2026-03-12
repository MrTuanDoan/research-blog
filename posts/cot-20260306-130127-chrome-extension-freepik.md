# /cot — Chrome Extension tự động hóa Freepik.com

**Date:** 2026-03-06  
**Task:** Thiết kế chiến lược xây dựng Chrome Extension để automate thao tác trên Freepik, bao gồm record & replay workflow.

---

## Question
Bắt đầu từ đâu? Ngôn ngữ nào? Playwright có dùng được không? Record → workflow automation có khả thi?

---

## Key Finding: Playwright KHÔNG dùng được trong Extension

Playwright/Puppeteer chạy ở server side, tạo browser instance riêng.
Extension thì chạy bên trong browser đang dùng — chỉ dùng được JavaScript/TypeScript.

---

## Recommended Stack

- Language: TypeScript
- Build tool: Vite + WXT (https://wxt.dev)
- UI: React (popup/sidepanel)
- Storage: chrome.storage.local
- DOM: Content Scripts + MutationObserver

---

## Architecture

```
Popup (UI)
  ↓ message
Background Service Worker (điều phối, lưu workflows)
  ↓ inject
Content Script (chạy trong freepik.com)
  - Record: lắng nghe click/input/navigation
  - Replay: simulate actions
```

---

## Workflow Data Format

```typescript
interface WorkflowAction {
  type: 'click' | 'input' | 'navigate' | 'wait' | 'scroll';
  selector?: string;
  value?: string;
  url?: string;
  delay?: number;
  waitFor?: string;
}

interface Workflow {
  id: string;
  name: string;
  createdAt: number;
  actions: WorkflowAction[];
}
```

---

## Key Challenges

1. generateSelector() — tạo stable CSS selectors (ưu tiên data-testid, id, aria-label)
2. SPA navigation tracking (dùng MutationObserver + URL change listener)
3. Anti-bot detection (random delays, human-like timing)
4. Freepik DOM changes (multiple fallback selectors)

---

## Lộ trình

- Tuần 1: Setup WXT project, manifest, hello world
- Tuần 2: Content script record clicks/inputs
- Tuần 3: Replay engine + selector stability
- Tuần 4: Multi-workflow UI, export/import, scheduling

---

## Advanced: chrome.debugger API (Playwright-like power)

```typescript
chrome.debugger.attach({ tabId }, '1.3');
chrome.debugger.sendCommand({ tabId }, 'DOM.querySelector', {...});
```

Cho phép dùng CDP commands từ extension — powerful nhưng cần permission `debugger` và hiện warning bar cho user.

---

## Kết luận

Record & replay workflow trên Freepik hoàn toàn khả thi với Chrome Extension thuần TypeScript.
Không cần Playwright — Chrome APIs đã đủ mạnh.
WXT là framework tốt nhất để bắt đầu năm 2025-2026.
