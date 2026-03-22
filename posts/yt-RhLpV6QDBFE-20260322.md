# OpenClaw Mission Control — Tóm Tắt Từng Bước

**Nguồn:** https://youtu.be/RhLpV6QDBFE  
**Kênh:** Alex Finn  
**Ngày đăng:** 2026-03-03  
**Tóm tắt:** 2026-03-22

---

## 🎯 TL;DR

Mission Control là một **custom dashboard dạng web app** được build bằng Next.js, chạy trên localhost — do chính OpenClaw tự tạo ra từ một câu prompt. Không cần code. Nó biến OpenClaw từ một chatbot thành một **hệ thống quản lý agent** có thể nhìn thấy, kiểm soát và mở rộng.

**Mục tiêu cốt lõi:** Tăng khả năng visibility (nhìn thấy agent đang làm gì), accountability (xác nhận agent có thực sự làm việc không), và organization (quản lý nhiều agent, dự án, tài liệu, lịch cron).

---

## 🛠️ 7 Công Cụ Cần Build Trong Mission Control

---

### 1. 📋 Task Board (Kanban)

**Tại sao cần:** Không biết agent đang làm gì / đã xong chưa là vấn đề phổ biến nhất.

**Cách hoạt động:**
- Kanban board gồm các cột: Backlog → In Progress → In Review → Done
- Mỗi task được assign cho người dùng (A) hoặc agent (H)
- Live activity feed ở sidebar hiển thị mọi hành động agent đang thực hiện
- Agent **tự di chuyển task** qua các cột khi hoàn thành
- Task "In Review" cần người dùng approve

**Tích hợp heartbeat:**
```
Trong mỗi heartbeat, kiểm tra task board, xem có task nào 
assign cho agent trong Backlog không, và tự động làm các task đó.
```

**Prompt để build:**
> *"Build me a kanban task board in my mission control where I can track tasks assigned to me and you. Add a live activity feed sidebar showing everything you're doing."*

---

### 2. 📅 Calendar Screen (Cron Visualizer)

**Tại sao cần:** Không xác nhận được agent có thực sự schedule cron job hay không — hay chỉ nói mà không làm.

**Cách hoạt động:**
- Hiển thị tất cả cron jobs và scheduled tasks dưới dạng calendar
- Sau khi nói "hãy làm X mỗi sáng" → vào calendar confirm task đã xuất hiện
- Nếu không thấy → yêu cầu agent thực sự schedule

**Prompt để build:**
> *"Build a calendar screen in my mission control that shows all cron jobs and scheduled tasks you have set up."*

---

### 3. 🗂️ Project Screen

**Tại sao cần:** Dễ bị phân tâm với OpenClaw, mất focus vào những việc thực sự quan trọng.

**Cách hoạt động:**
- Danh sách tất cả major projects đang làm
- Thanh tiến độ cho từng project
- Hook vào Tasks, Memories, Documents
- Xem project nào bị bỏ quên lâu nhất

**Reverse prompt mạnh:**
> *"Dựa trên mọi thứ bạn biết về tôi, nếu phân loại 5 project chính tôi đang làm là gì?"*
> *"Task nào chúng ta có thể làm ngay bây giờ để tiến gần hơn đến một project đang trì hoãn?"*

**Prompt để build:**
> *"Build a project screen in my mission control showing all major projects I'm working on with progress tracking."*

---

### 4. 🧠 Memory Screen

**Tại sao cần:** Memories thường nằm rải rác trong file markdown khó đọc. Khó tìm lại context từ cuộc trò chuyện cũ.

**Cách hoạt động:**
- Xem tất cả daily memories sắp xếp theo ngày (như journal)
- Long-term memory document riêng biệt
- Có thể search, filter theo ngày

**Prompt để build:**
> *"Build a memory screen in my mission control where I can view every memory organized by day, plus a long-term memory view."*

---

### 5. 📄 Docs Screen

**Tại sao cần:** Agent viết docs, newsletters, plans liên tục — nhưng mọi thứ chôn vùi trong chat history.

**Cách hoạt động:**
- Mọi document agent tạo ra → tự động xuất hiện ở đây
- Searchable (tìm theo keyword)
- Auto-categorize theo loại: planning doc, newsletter, architecture, content...
- Format đẹp để đọc và copy paste

**Prompt để build:**
> *"Build a docs tool in my mission control where I can view all previous documents you've created for me, searchable and categorized."*

---

### 6. 👥 Team Screen (Agent Org Chart)

**Tại sao cần:** Khi có nhiều sub-agents, cần biết ai làm gì, trên thiết bị nào, powered by model nào.

**Cách hoạt động:**
- Org chart: Main agent ở trên → sub-agents bên dưới
- Mỗi agent có: tên, role, thiết bị, model (GPT/Claude/Qwen...)
- **Mission Statement** ở đầu trang → mọi agent đều hướng đến cùng mục tiêu
- Khi agent không biết giao việc cho ai → đến Team Screen, xem org chart

**Mission Statement là công cụ mạnh:**
```
"Xây dựng một tổ chức AI agent tự động hoạt động 24/7,
tạo ra giá trị thực cho dự án của tôi."
```

**Reverse prompt:**
> *"Dựa trên mọi thứ bạn biết về tôi, mission statement của chúng ta nên là gì?"*

**Prompt để build:**
> *"Build a team screen showing all agents and sub-agents with their roles and devices, plus a mission statement at the top."*

---

### 7. 🏢 Office Screen (2D Pixel Art Visualizer)

**Tại sao cần:** Fun matters. Khi bạn thích thú với tool → bạn dùng nhiều hơn → bạn làm được nhiều hơn.

**Cách hoạt động:**
- 2D pixel art office
- Mỗi agent có desk riêng
- Khi agent đang làm việc → nhân vật di chuyển đến bàn làm việc
- Khi idle → đứng quanh, có thể "nói chuyện ở water cooler"
- Xem được agent đang làm gì cụ thể theo thời gian thực

**Prompt để build:**
> *"Build a 2D pixel art office screen that visualizes all agents. When they're working, show them at their desks. Show what they're currently doing."*

---

## 🚀 Cách Bắt Đầu (2 Bước)

**Bước 1 — Build template:**
```
"I want my own mission control where we can build custom tools. 
Please build it in Next.js and host it on localhost. 
Make it a clean interface that looks like Linear."
```

**Bước 2 — Build từng tool:**
Paste prompt cho từng công cụ ở trên. Hoặc đơn giản hơn:
```
Paste link video này vào OpenClaw và nói:
"Check out this video and build everything mentioned that we haven't done yet."
```

---

## 💡 Nguyên Tắc Quan Trọng Nhất: Reverse Prompting

Đừng copy y chang dashboard của người khác. **Mỗi workflow là unique.**

Sau khi build xong template → hỏi OpenClaw:
> *"Dựa trên những gì bạn biết về tôi, tôi cần những custom tools nào trong mission control để workflow hiệu quả nhất?"*

Agent sẽ tự đề xuất tools phù hợp với **bạn cụ thể**, không phải template chung.

---

## 📊 Tóm Tắt Giá Trị Mỗi Công Cụ

| Tool | Giải quyết vấn đề gì |
|------|----------------------|
| Task Board | Không biết agent làm gì / xong chưa |
| Calendar | Agent nói sẽ làm nhưng không làm |
| Projects | Mất focus, không tiến độ trên việc quan trọng |
| Memory | Không tìm được context từ quá khứ |
| Docs | Mất documents trong chat history |
| Team | Không quản lý được multi-agent workflow |
| Office | Thiếu fun → dùng ít đi → hiệu quả giảm |

---

*Video bởi Alex Finn | Tóm tắt: Antigravity — 2026-03-22*
