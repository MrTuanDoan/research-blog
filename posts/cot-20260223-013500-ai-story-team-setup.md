# CoT Analysis: Xây Dựng Đội Ngũ Viết Truyện Ngắn với Claude Skills

**Ngày:** 2026-02-23
**Input:** Từ mô hình AI Marketing Team, build đội viết truyện ngắn với writer + 3 reviewers (reader, nhà phê bình, YouTube listener)

---

## 📋 Filled Template

**Task:** Thiết kế hệ thống Claude Skills để tạo đội ngũ viết truyện ngắn truyền tải thông điệp ý nghĩa, với quy trình viết và kiểm duyệt đa góc nhìn.

**Context:** 
- Tham khảo mô hình từ video "Build Your First AI Marketing Team" của Grace Leung
- Cần 1 writer + 3 reviewer roles khác nhau
- Output: truyện ngắn có ý nghĩa, phù hợp cả đọc text và nghe audio
- Cần hướng dẫn cài đặt và test

**My question:** Làm sao áp dụng Claude Skills để build đội viết truyện với nhiều vai trò review?

---

## 🧠 Step-by-Step Reasoning

### Step 1: Mapping Marketing Team → Story Team

| Marketing Team | Story Team |
|----------------|------------|
| Research & Strategy | **Story Research** - Tìm theme, message, target audience |
| Content Creation | **Story Writer** - Viết truyện ngắn |
| Creative Designer | **Audio Formatter** - Format cho audio/YouTube |
| Data Analysis | **3 Reviewers** - Đánh giá từ 3 góc nhìn |
| Campaign Presenter | **Final Publisher** - Compile final version |

### Step 2: Định nghĩa 4 Skills cốt lõi

**Skill 1: Story Writer**
- Input: Theme, message, target emotion
- Process: Viết truyện theo storytelling framework
- Output: Bản nháp truyện ngắn

**Skill 2: Reader Reviewer**
- Persona: Độc giả bình thường, đọc lướt
- Đánh giá: Hook, flow, emotional impact, readability
- Output: Feedback + score

**Skill 3: Critic Reviewer** 
- Persona: Nhà phê bình văn học
- Đánh giá: Cấu trúc, ngôn ngữ, chiều sâu message, kỹ thuật viết
- Output: Phân tích chi tiết + gợi ý cải thiện

**Skill 4: Audio Listener Reviewer**
- Persona: Người nghe truyện trên YouTube
- Đánh giá: Nhịp điệu khi đọc, độ dài phù hợp, clarity khi chỉ nghe
- Output: Feedback về audio experience

### Step 3: Workflow Design

```
┌─────────────────────────────────────────────────────────┐
│                    STORY CREATION WORKFLOW               │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  [Input] Theme + Message + Target Emotion                │
│      │                                                   │
│      ▼                                                   │
│  ┌──────────────┐                                       │
│  │ Story Writer │ ──► Draft v1                          │
│  └──────────────┘                                       │
│      │                                                   │
│      ▼ (Parallel Sub-agents)                            │
│  ┌────────────┬────────────┬─────────────────┐         │
│  │   Reader   │   Critic   │  Audio Listener │         │
│  │  Reviewer  │  Reviewer  │    Reviewer     │         │
│  └─────┬──────┴─────┬──────┴────────┬────────┘         │
│        │            │               │                   │
│        └────────────┼───────────────┘                   │
│                     ▼                                   │
│              Combined Feedback                          │
│                     │                                   │
│                     ▼                                   │
│  ┌──────────────┐                                       │
│  │ Story Writer │ ──► Final Version                     │
│  └──────────────┘                                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Step 4: Cấu trúc Folder Project

```
story-team/
├── CLAUDE.md                    # Custom instructions
├── context/
│   ├── brand.md                 # Phong cách viết, giọng văn
│   ├── audience.md              # Target audience profile
│   └── storytelling-framework.md # Framework viết truyện
├── skills/
│   ├── story-writer/
│   │   └── SKILL.md
│   ├── reader-reviewer/
│   │   └── SKILL.md
│   ├── critic-reviewer/
│   │   └── SKILL.md
│   └── audio-reviewer/
│       └── SKILL.md
├── examples/
│   ├── good-stories/            # Best examples
│   └── reviews/                 # Review examples
├── sop/
│   └── story-creation-process.md
└── outputs/
    └── stories/
```

### Step 5: Chi tiết từng Skill

**⚠️ Assumption:** Dùng Claude Code Desktop với Skill Creator đã cài sẵn.

---

## ✅ Final Answer

# 🎭 AI Story Team - Hướng Dẫn Cài Đặt

## Phần 1: Chuẩn Bị

### 1.1 Yêu cầu
- Claude Code Desktop hoặc Claude Max subscription
- Git installed
- Node.js (optional, for MCP servers)

### 1.2 Cài Skill Creator

```bash
# Clone Anthropic Skills repo
git clone https://github.com/anthropics/skills.git

# Hoặc download trực tiếp Skill Creator
# Từ: https://github.com/anthropics/skills/tree/main/skill-creator
```

### 1.3 Tạo Project Folder

```bash
mkdir story-team
cd story-team
mkdir -p context skills examples/good-stories examples/reviews sop outputs/stories
```

---

## Phần 2: Tạo Context Files

### 2.1 CLAUDE.md (Custom Instructions)

```markdown
# Story Team - Claude Instructions

## Project Overview
Đây là dự án viết truyện ngắn truyền tải thông điệp ý nghĩa.

## Folder Navigation
- `/context` - Brand voice, audience, frameworks
- `/skills` - Các skills đã định nghĩa
- `/examples` - Truyện mẫu và review mẫu
- `/outputs/stories` - Output cuối cùng

## Workflow
1. Nhận brief (theme, message, emotion)
2. Story Writer tạo draft
3. 3 Reviewers đánh giá parallel
4. Story Writer revise dựa trên feedback
5. Save final version

## Quality Standards
- Truyện 800-1500 từ
- Có twist hoặc ending bất ngờ
- Message rõ ràng nhưng không giáo điều
- Phù hợp đọc text và nghe audio
```

### 2.2 context/brand.md

```markdown
# Brand Voice - Story Style

## Giọng văn
- Gần gũi, chân thực
- Không sáo rỗng, không giáo điều
- Có chiều sâu cảm xúc
- Phù hợp mọi lứa tuổi

## Đặc trưng
- Mở đầu hook mạnh (3 câu đầu quyết định)
- Nhân vật có depth, relatable
- Conflict rõ ràng
- Resolution có ý nghĩa
- Ending memorable

## Không làm
- Kết thúc quá happy ending giả tạo
- Moral quá lộ liễu
- Ngôn ngữ quá hoa mỹ
- Câu quá dài (khó nghe audio)
```

### 2.3 context/audience.md

```markdown
# Target Audience

## Primary
- 25-45 tuổi
- Thích content có chiều sâu
- Nghe podcast/audio khi đi làm
- Đọc trước khi ngủ

## Emotional needs
- Được thấu hiểu
- Tìm meaning trong cuộc sống
- Moment of reflection
- Feel-good nhưng không cheesy

## Consumption habits
- Đọc: 5-10 phút
- Nghe: Trong lúc lái xe, nấu ăn
- Prefer: Stories dễ share
```

### 2.4 context/storytelling-framework.md

```markdown
# Storytelling Framework

## Structure: 5-Part Arc

### 1. Hook (10%)
- Bắt đầu in-media-res
- Tạo curiosity gap
- Introduce protagonist

### 2. Setup (20%)
- Establish world
- Show character's normal life
- Plant seeds of conflict

### 3. Conflict (30%)
- Main challenge appears
- Stakes are clear
- Character must choose

### 4. Climax (25%)
- Peak tension
- Character acts
- Unexpected element

### 5. Resolution (15%)
- Aftermath
- Character changed
- Message crystallizes
- Memorable last line

## Emotional Arc
Setup hope → Build tension → Break it → Restore with insight
```

---

## Phần 3: Tạo Skills

### 3.1 Skill: Story Writer

Trong Claude Code, chạy:

```
Hãy tạo một skill mới tên "story-writer" với các đặc điểm:

1. Đọc context files: brand.md, audience.md, storytelling-framework.md
2. Nhận input: theme, message, target_emotion
3. Viết truyện ngắn 800-1500 từ theo framework
4. Output: file markdown với metadata (title, theme, word_count)
5. Tham khảo examples trong /examples/good-stories nếu có

Lưu skill vào /skills/story-writer/SKILL.md
```

### 3.2 Skill: Reader Reviewer

```
Tạo skill "reader-reviewer" với persona:

**Persona:** Độc giả bình thường, bận rộn, đọc lướt
**Tên:** Minh - Nhân viên văn phòng 32 tuổi

**Đánh giá theo tiêu chí:**
1. Hook (1-10): Có muốn đọc tiếp không?
2. Flow (1-10): Đọc có trôi chảy không?
3. Emotion (1-10): Có chạm đến cảm xúc không?
4. Clarity (1-10): Có hiểu không?
5. Shareability (1-10): Có muốn share không?

**Output format:**
- Overall score (average)
- 3 điều thích
- 3 điều chưa thích
- 1 câu summary

Lưu vào /skills/reader-reviewer/SKILL.md
```

### 3.3 Skill: Critic Reviewer

```
Tạo skill "critic-reviewer" với persona:

**Persona:** Nhà phê bình văn học, khó tính, đọc nhiều
**Tên:** Giáo sư Hùng - Giảng viên văn học 55 tuổi

**Đánh giá theo tiêu chí:**
1. Structure: Cấu trúc có vững không?
2. Language: Ngôn ngữ có tinh tế không?
3. Depth: Message có nhiều layer không?
4. Originality: Có gì mới không?
5. Technique: Kỹ thuật viết thế nào?

**Output format:**
- Phân tích chi tiết từng tiêu chí
- So sánh với các tác phẩm tương tự
- 3 gợi ý cải thiện cụ thể
- Verdict: Publish / Revise / Reject

Lưu vào /skills/critic-reviewer/SKILL.md
```

### 3.4 Skill: Audio Listener Reviewer

```
Tạo skill "audio-reviewer" với persona:

**Persona:** Người nghe truyện audio trên YouTube
**Tên:** Lan - Content creator 28 tuổi, nghe khi lái xe

**Đánh giá theo tiêu chí:**
1. Pacing: Nhịp điệu có phù hợp nghe không?
2. Length: Độ dài có ổn không? (5-10 phút lý tưởng)
3. Clarity: Chỉ nghe có hiểu không?
4. Engagement: Có giữ được attention không?
5. Memorability: Kết thúc có đọng lại không?

**Lưu ý đặc biệt:**
- Câu quá dài khó theo dõi khi nghe
- Dialogue nhiều tốt cho audio
- Descriptions quá chi tiết boring khi nghe
- Twist phải clear khi không nhìn text

**Output format:**
- Score từng tiêu chí
- Timestamps cần chỉnh (nếu có)
- Gợi ý edit cho audio experience
- Audio-ready? Yes/No

Lưu vào /skills/audio-reviewer/SKILL.md
```

---

## Phần 4: Test Run

### 4.1 Test Tạo Truyện Đầu Tiên

Trong Claude Code, chạy:

```
Hãy tạo một truyện ngắn mới với:
- Theme: Sự tha thứ
- Message: Tha thứ không phải cho người khác, mà cho chính mình
- Target emotion: Catharsis, giải thoát

Sau đó, gửi qua 3 reviewers đánh giá parallel.
```

### 4.2 Expected Flow

```
1. Claude đọc context files
2. Trigger story-writer skill → Draft v1
3. Spawn 3 sub-agents parallel:
   - reader-reviewer đánh giá
   - critic-reviewer đánh giá  
   - audio-reviewer đánh giá
4. Tổng hợp feedback
5. Story writer revise → Final version
6. Save to /outputs/stories/
```

### 4.3 Sample Output Structure

```
outputs/stories/
└── 2026-02-23-su-tha-thu.md
    ├── Metadata (title, theme, word_count, scores)
    ├── Final Story
    ├── Review Summary
    └── Revision Notes
```

---

## Phần 5: Advanced - Package thành Plugin

Sau khi test ổn định:

```
Hãy package tất cả skills trong project này thành một plugin 
tên "AI Story Team" với các slash commands:
- /new-story: Tạo truyện mới
- /review-story: Review một truyện
- /full-pipeline: Chạy full workflow

Export để có thể dùng cho các dự án khác.
```

---

## 📝 Quick Reference

| Command | Mô tả |
|---------|-------|
| `/new-story [theme] [message]` | Tạo truyện mới |
| `/review-story [file]` | Review parallel bởi 3 personas |
| `/full-pipeline [brief]` | Chạy full workflow |

---

## 🎯 One-Sentence Summary

**Áp dụng mô hình Claude Skills với 4 skills (Story Writer + 3 Reviewer personas) chạy parallel sub-agents, kết hợp workflow viết-review-revise để tạo truyện ngắn chất lượng cao phù hợp cả đọc và nghe audio.**

---

*Generated: 2026-02-23*
*Command: /cot*
