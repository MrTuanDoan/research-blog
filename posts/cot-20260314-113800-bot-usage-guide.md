# Hướng Dẫn Sử Dụng AI Research Assistant Hiệu Quả
**Date:** 2026-03-14
**Dành cho:** Bất kỳ ai muốn tận dụng tối đa bot này — từ founder, researcher, creator, đến marketer

---

## Bot Này Là Gì?

Đây là một **AI Research & Strategy Assistant** được tích hợp qua Telegram. Không phải chatbot thông thường — nó có khả năng:

- 🎥 Tóm tắt và phân tích video YouTube
- 🧠 Tư duy chiến lược sâu theo Chain-of-Thought
- 📝 Viết nội dung chất lượng cao (blog, thread, framework)
- 💾 Lưu và publish kết quả lên blog tự động
- 🔍 Tìm kiếm web, đọc tài liệu, phân tích dữ liệu
- 🛠️ Chạy code, tự động hóa workflows

---

## Các Lệnh Chính

### `/summarize-yt [URL]`
Tóm tắt bất kỳ video YouTube nào thành key points có cấu trúc.

**Dùng khi:**
- Muốn nắm nội dung video nhanh mà không cần xem hết
- Cần extract insights từ webinar, podcast, course
- Muốn có raw material để phân tích tiếp

**Ví dụ:**
```
/summarize-yt https://youtu.be/abc123
```

---

### `/cot [câu hỏi hoặc chủ đề]`
Chain-of-Thought analysis — tư duy có cấu trúc, lý luận từng bước, ra kết luận có thể hành động.

**Dùng khi:**
- Cần phân tích sâu một vấn đề phức tạp
- Muốn lập kế hoạch chi tiết cho một project
- Cần so sánh các lựa chọn và đưa ra quyết định
- Muốn biến insights từ video thành actionable plan

**Ví dụ:**
```
/cot Should I build a SaaS or a service business first?
/cot Plan for learning machine learning in 3 months
/cot How to apply this marketing framework to my startup
```

**Output tự động được:**
- Lưu vào file markdown
- Push lên GitHub
- Publish lên blog

---

### Kết hợp `/summarize-yt` + `/cot`
Đây là combo mạnh nhất. Xem video → phân tích chiến lược → ra plan cụ thể.

**Cú pháp:**
```
/summarize-yt [URL] /cot [câu hỏi cụ thể của bạn]
```

**Ví dụ thực tế:**
```
/summarize-yt https://youtu.be/xyz /cot how to apply this to my ecom brand

/summarize-yt https://youtu.be/xyz /cot break down the key skills and make a learning plan

/summarize-yt https://youtu.be/xyz /cot what are the 3 most important takeaways for a startup founder
```

---

## Cách Viết Prompt Hiệu Quả

### 1. Khai báo Persona (Quan trọng nhất!)

Bot sẽ điều chỉnh toàn bộ analysis theo profile của bạn. Càng rõ ràng càng tốt.

**Template:**
```
/cot [chủ đề]

Persona: [Tên] — [nghề nghiệp/role]. [Mục tiêu chính]. [Bối cảnh cụ thể].
```

**Ví dụ theo từng role:**

*Founder/CEO:*
```
/cot marketing framework từ video này

Persona: Nam — SaaS founder, B2B product management tool, 
đang ở stage pre-product-market-fit, 5 người dùng beta.
Cần: framework để acquire first 100 paying customers.
```

*Content Creator:*
```
/summarize-yt https://youtu.be/xyz /cot content strategy

Persona: Linh — YouTube creator về personal finance, 
50k subscribers, muốn monetize qua digital products.
Cần: content pillars và posting strategy cho Q2 2026.
```

*Developer/Tech:*
```
/cot implementation plan

Persona: Ryan — full-stack dev, building AI startup,
tech stack: Next.js + Python + Claude API.
Cần: architecture decision cho multi-agent system.
```

*Marketer:*
```
/summarize-yt https://youtu.be/xyz /cot apply to my brand

Persona: Mai — performance marketer, supplement brand,
$50k/month revenue, muốn scale lên $200k, đang chạy Meta ads.
Cần: next steps cho scaling và retention.
```

---

### 2. Specify Output Format

Bot có thể output theo nhiều format khác nhau. Nói rõ bạn muốn gì.

| Bạn nói | Bot sẽ viết |
|---------|-------------|
| `viết blog post style, sharing tone` | Bài viết tự nhiên như personal essay |
| `viết X.com thread` | Chuỗi tweets ready-to-post |
| `tạo framework và checklist` | Structured framework + actionable checklist |
| `break down learning plan` | Week-by-week study plan với milestones |
| `mid pro, casual tone` | Không quá formal, không quá casual |
| `viết cho người mới bắt đầu` | Simple language, nhiều ví dụ, ít jargon |

---

### 3. Stack Nhiều Tasks Trong 1 Message

Bot xử lý được nhiều tasks cùng lúc. Đừng ngại gộp vào một message.

**Ví dụ:**
```
/summarize-yt https://youtu.be/xyz 
/cot key points và learning plan cho developer
Sau đó viết X.com thread để chia sẻ insights
Persona: Ryan — tech founder, muốn build personal brand
```

---

## Use Cases Theo Persona

### 🚀 Startup Founder / CEO

**Workflow hàng tuần:**
```
Thứ 2: /summarize-yt [podcast về industry của bạn] /cot competitive analysis
Thứ 4: /cot [vấn đề bạn đang giải quyết tuần này]
Thứ 6: /cot weekly review — what worked, what didn't, next week plan
```

**Prompts hay dùng:**
- `how does this apply to my [stage] startup`
- `what are the 3 decisions I need to make this week`
- `build a framework for [specific business problem]`

---

### 📚 Researcher / Student

**Workflow:**
```
1. /summarize-yt [lecture/talk/documentary]
2. /cot break down the key concepts I need to master
3. /cot create a 30-day study plan with daily tasks
4. /cot explain [concept] like I'm a beginner
```

**Prompts hay dùng:**
- `explain this concept with real examples`
- `what are the most important things to learn FIRST`
- `create flashcard-style key concepts from this`

---

### 🎨 Content Creator / Personal Brand

**Workflow:**
```
1. /summarize-yt [trending video in your niche]
2. /cot what angles can I make content about from this
3. /cot write a blog post sharing my perspective on this topic
4. /cot create X.com thread with key insights
```

**Prompts hay dùng:**
- `write in my voice — direct, no fluff, practical`
- `what would resonate with [target audience]`
- `turn this into 5 content ideas for [platform]`

---

### 📈 Marketer / Growth

**Workflow:**
```
1. /summarize-yt [marketing case study or course]
2. /cot apply this to [your product/brand]
3. /cot create a 90-day growth experiment plan
4. /cot write a campaign brief based on this framework
```

**Prompts hay dùng:**
- `how do I apply this to [specific stage/budget/channel]`
- `what metrics should I track and why`
- `create a framework I can use every week`

---

### 💻 Developer / Technical

**Workflow:**
```
1. /summarize-yt [tech talk, tutorial, conference talk]
2. /cot how does this apply to my stack: [your tech stack]
3. /cot create an implementation plan with milestones
4. /cot what are the pitfalls to avoid
```

**Prompts hay dùng:**
- `break this into atomic steps I can implement one at a time`
- `what should I build first as an MVP`
- `compare option A vs B for my use case: [context]`

---

## Tips Để Có Output Tốt Nhất

### ✅ DO

**Cung cấp context cụ thể:**
```
✅ "Mình đang build B2B SaaS, 3 tháng tuổi, $0 revenue, 
   team 2 người, đang figure out go-to-market"
   
❌ "Mình có startup"
```

**Nói rõ output bạn muốn dùng để làm gì:**
```
✅ "Cần kết quả dưới dạng checklist để share với team"
✅ "Viết theo tone X.com thread, dưới 280 chars mỗi tweet"
✅ "Làm blog post để build trust với audience là founders"
```

**Hỏi follow-up khi cần:**
```
✅ "Đi sâu hơn vào phần MRR"
✅ "Viết lại phần này đơn giản hơn"
✅ "Thêm ví dụ cụ thể cho use case của mình"
```

### ❌ AVOID

```
❌ Prompt quá ngắn không có context
   "phân tích video này" → bot không biết phân tích theo góc độ nào

❌ Hỏi quá nhiều thứ không liên quan trong 1 message
   (OK để stack tasks, nhưng phải cùng chủ đề)

❌ Không khai báo persona khi cần analysis cá nhân hóa
```

---

## Ví Dụ Prompt Thực Tế (Copy & Use)

### Prompt 1 — Learning Plan
```
/summarize-yt [URL]
/cot break out the structure and make a detailed plan for me to learn and master all the skills from this video.

Persona: [Tên bạn] — [role của bạn], [context], [mục tiêu cụ thể].
```

### Prompt 2 — Business Application
```
/summarize-yt [URL]
/cot how we use the updates from this video for [specific use case: e.g. R&D, marketing, product].
Include 3 real-life usecases.
Write in blog post style for sharing.
```

### Prompt 3 — Strategy Framework
```
/cot build a complete framework for [business problem].
Persona: [role], [context], [constraints], [goals].
Output: framework + checklist + 90-day roadmap.
```

### Prompt 4 — Content Creation
```
/summarize-yt [URL]
/cot key insights from this video.
Then write an X.com thread sharing the most valuable lessons.
Audience: [mô tả target audience của bạn].
Tone: [direct/casual/professional/storytelling].
```

### Prompt 5 — Decision Making
```
/cot I need to decide between [Option A] vs [Option B].

Context: [mô tả tình huống cụ thể]
Constraints: [budget/time/team/skills]
Goal: [outcome muốn đạt được]

Give me: pros/cons analysis + recommendation + reasoning.
```

---

## Blog Tự Động

Mọi output từ `/cot` đều được tự động:
1. Lưu vào workspace
2. Push lên GitHub
3. Publish lên blog: [research-blog-three.vercel.app](https://research-blog-three.vercel.app)

URL format: `research-blog-three.vercel.app/posts/[topic-slug]`

Bạn có thể share link blog thay vì copy-paste nội dung dài.

---

## Quick Reference Card

```
LỆNH CƠ BẢN:
/summarize-yt [URL]          → Tóm tắt video
/cot [câu hỏi]               → Phân tích sâu

COMBO MẠNH NHẤT:
/summarize-yt [URL] /cot [câu hỏi cụ thể]

3 THÀNH PHẦN PROMPT HIỆU QUẢ:
1. Persona (bạn là ai, context gì)
2. Task (muốn làm gì cụ thể)
3. Output format (dạng nào, tone nào)

OUTPUT FORMATS:
- blog post style, sharing tone
- X.com thread
- framework + checklist
- learning plan (week by week)
- decision analysis
- implementation roadmap
```

---

*Output saved: cot-outputs/cot-20260314-113800-bot-usage-guide.md*
