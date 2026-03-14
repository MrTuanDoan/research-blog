# Hướng Dẫn Từng Bước: Tự Động Cải Thiện Claude Code Skills Với Auto Research
**Date:** 2026-03-14
**Source:** https://youtu.be/qKU-e0x2EmE
**Ngôn ngữ:** Tiếng Việt

---

## Tóm Tắt Video

Video hướng dẫn cách kết hợp **Claude Code Skills** với framework **Auto Research** của Andrej Karpathy để tạo ra một hệ thống **tự cải thiện skill qua đêm** — không cần can thiệp thủ công.

**Kết quả thực tế:**
- Website load time: 1100ms → 67ms (giảm 81.3%)
- Diagram generator skill: 32/40 → 39/40 accuracy
- Cold email reply rate: đang tối ưu tự động

---

## Ý Tưởng Cốt Lõi

Karpathy dùng Auto Research để AI tự train model qua đêm. Người trong video áp dụng **cùng pattern** cho Claude Code Skills:

```
SKILL.md      =  train.py    (thứ cần cải thiện)
program.md    =  agent prompt (hướng dẫn cải thiện)
eval suite    =  measurement  (tiêu chí đánh giá)
```

Mỗi 2-5 phút, agent:
1. Chạy skill → generate output
2. Đánh giá output theo eval suite
3. Ghi nhận điểm số
4. Chỉnh sửa prompt trong SKILL.md
5. Lặp lại → giữ version tốt nhất

---

## Hướng Dẫn Từng Bước

---

### Bước 1: Chuẩn Bị — 3 Nguyên Liệu Bắt Buộc

Trước khi bắt đầu, cần có đủ 3 thứ:

**1. Objective Metric — Con số đo được**

Không được mơ hồ. Phải là số cụ thể.

| ❌ Mơ hồ | ✅ Cụ thể |
|----------|----------|
| "Nhìn đẹp hơn" | Số lần pass eval / tổng lần chạy |
| "Chất lượng tốt" | Score X/40 |
| "Chạy nhanh hơn" | Milliseconds load time |
| "Email tốt hơn" | % reply rate |

**2. Measurement Tool — Công cụ đo tự động**

Cần automated, không có human in the loop.
- Website: Google Lighthouse API
- Email: instantly.ai analytics API
- Skills (Claude Code): **agent tự đánh giá** bằng eval test suite (sẽ build ở bước 3)

**3. Thứ Cần Thay Đổi**

Trong trường hợp skills: đó là nội dung file `SKILL.md` — cụ thể là **prompt instructions** bên trong.

---

### Bước 2: Chọn Skill Cần Cải Thiện

Chọn 1 skill mà bạn đang dùng thường xuyên nhưng output chưa đạt 100% như mong muốn.

**Ví dụ tốt để bắt đầu:**
- Diagram generator (như trong video)
- Proposal writer
- COT analysis template
- Summarizer
- Code reviewer

**Tiêu chí chọn skill:**
- Output có thể đánh giá được bằng yes/no
- Bạn biết rõ "output tốt" trông như thế nào
- Đang dùng thực tế (không phải thử nghiệm)

---

### Bước 3: Xây Dựng Eval Test Suite

**Đây là bước quan trọng nhất.**

Eval suite = bộ câu hỏi yes/no để chấm điểm output của skill.

**Quy tắc vàng khi viết eval:**

✅ **Dùng binary — chỉ yes hoặc no:**
```
"Diagram có phải màu pastel không?" → Yes/No
"Text có đọc được không?" → Yes/No
"Output có đúng format JSON không?" → Yes/No
```

❌ **Tránh scale/scoring phức tạp:**
```
"Đánh giá chất lượng từ 1-7" → quá nhiều biến số
"Chấm điểm overall từ 0-100" → model optimize sai cách
```

❌ **Tránh quá cụ thể đến mức model hack được:**
```
"Phải dưới 200 từ" → model sẽ cắt nội dung bừa để pass
"Không được dùng từ 'rất'" → model tránh từ đó nhưng vẫn viết tệ
```

**Ví dụ Eval Suite cho Diagram Generator (từ video):**
```
Eval 1: Text trong diagram có đọc được và đúng ngữ pháp không?
Eval 2: Diagram có dùng màu pastel/soft không (không phải neon)?
Eval 3: Diagram có đi theo chiều trái-phải hoặc trên-xuống không?
Eval 4: Diagram có FREE khỏi số thứ tự (1,2,3) và ordinals không?
```
→ Max score: 4 evals × 10 lần chạy = 40 điểm

**Template Eval Suite cho COT Analysis Skill:**
```
Eval 1: Output có ít nhất 3 actionable steps không?
Eval 2: Output có section "Key Insights" rõ ràng không?
Eval 3: Reasoning có đi từng bước có cấu trúc không?
Eval 4: Output có tránh vague statements ("có thể", "nên xem xét") không?
Eval 5: Kết luận có directly address câu hỏi gốc không?
```

---

### Bước 4: Đọc Auto Research Repo

Mở Claude Code và cho agent đọc repo gốc của Karpathy:

```
Đọc repo này và hiểu cách hoạt động:
https://github.com/karpathy/auto-research
```

Chỉ cần agent đọc 2 files:
- `train.py` — hiểu pattern tối ưu hóa
- `program.md` — hiểu cách viết agent instructions

Không cần đọc `prepare.py` (machine learning specific, không liên quan).

---

### Bước 5: Viết Prompt Cho Agent

Sau khi agent đọc repo, viết prompt theo template này:

```
Sử dụng Auto Research convention từ repo vừa đọc để build 
hệ thống self-improving cho skill [tên skill] của mình.

Eval suite mình muốn dùng:
1. [Eval 1 của bạn]
2. [Eval 2 của bạn]
3. [Eval 3 của bạn]
4. [Eval 4 của bạn]

Cách hoạt động mình muốn:
- Mỗi [X] phút, generate [N] outputs từ skill
- Đánh giá mỗi output theo 4 tiêu chí trên
- Tính tổng điểm (max = N × số evals)
- Chỉnh sửa SKILL.md để cải thiện điểm số
- Giữ version có điểm cao nhất
- Lặp lại cho đến khi đạt [N × số evals] điểm tối đa

Bắt đầu build test suite và chạy thử lần đầu ngay bây giờ.
```

**Ví dụ cụ thể:**
```
Sử dụng Auto Research convention từ repo vừa đọc để build 
hệ thống self-improving cho diagram-generator skill của mình.

Eval suite:
1. Text có legible và grammatically correct không?
2. Diagram có dùng pastel colors không?
3. Diagram có linear (left-to-right / top-to-bottom) không?
4. Diagram có free khỏi số thứ tự không?

Cách hoạt động:
- Mỗi 2 phút, generate 10 diagrams
- Đánh giá theo 4 tiêu chí (max 40 điểm)
- Chỉnh sửa prompt trong SKILL.md nếu chưa đạt 40/40
- Lặp lại đến khi hit 40/40 consistently
```

---

### Bước 6: Theo Dõi và Điều Chỉnh

Khi hệ thống đang chạy, agent sẽ tự tạo một **real-time dashboard** cho bạn xem tiến độ.

**Những gì bạn sẽ thấy:**
```
Run 1: Score 32/40 — Issues: text not legible in 2 diagrams
Run 2: Score 37/40 — Improvement: better font sizing
Run 3: Score 38/40 — Improvement: cleaner left-to-right flow
Run 4: Score 39/40 — Near perfect
...
```

**Khi nên dừng:**
- Đạt 95%+ consistency qua 5+ runs liên tiếp
- Hoặc để chạy qua đêm và review kết quả sáng hôm sau

**Lưu ý về chi phí:**
- 10 generations × $0.002/generation = $0.02/run
- 50 runs để optimize = ~$1
- Đây là ROI cực tốt nếu skill đó tiết kiệm hàng giờ làm việc

---

### Bước 7: Lưu Lại Learnings

Sau mỗi session Auto Research, agent sẽ generate một **danh sách tất cả thay đổi đã thử**.

**Cực kỳ quan trọng:** Lưu danh sách này lại.

Tại sao?
```
Khi có model mới hơn (Opus 5, Claude 4, GPT-6),
bạn chỉ cần feed danh sách này vào model đó.
Model mới sẽ tiếp tục từ nơi model cũ dừng lại.

Đây là "research data" — 
có thể sẽ là một trong những tài sản giá trị nhất 
trong AI era.
```

---

## Áp Dụng Cho Tất Cả Use Cases

Auto Research không chỉ dùng cho Skills. Áp dụng được cho **bất kỳ thứ gì có objective metric:**

| Use Case | Metric | What Changes |
|----------|--------|-------------|
| Claude Code Skills | Eval pass rate (X/N) | SKILL.md prompt |
| Cold Email | Reply rate % | Email copy |
| Website | Load time (ms) | Code/CSS |
| Blog post titles | CTR % | Title format |
| X.com threads | Engagement rate | Hook + structure |
| YouTube thumbnails | CTR % | Visual elements |
| Ad copy | ROAS / CTR | Copy variants |

---

## Checklist Nhanh

```
□ Bước 1: Xác định skill cần cải thiện
□ Bước 2: Viết 4-6 eval questions (binary yes/no)
□ Bước 3: Feed Karpathy repo cho agent đọc
□ Bước 4: Viết prompt theo template ở Bước 5
□ Bước 5: Chạy và theo dõi dashboard
□ Bước 6: Lưu lại "changes tried list" từ agent
□ Bước 7: Áp dụng winning SKILL.md vào workflow
```

---

## Lưu Ý Quan Trọng

**1. Binary evals là tốt nhất:**
Yes/No ít biến số nhất → kết quả đáng tin cậy nhất.

**2. Đừng có quá nhiều evals:**
4-6 là ideal. Quá nhiều → model "hack" bằng cách technically pass nhưng chất lượng thực tế vẫn tệ.

**3. Chạy nhiều lần mới có ý nghĩa:**
AI outputs là distributions, không phải fixed values. 10+ outputs mỗi run để có statistical meaning.

**4. Để chạy qua đêm:**
Đây là điểm mạnh nhất của Auto Research — bạn ngủ, AI cải thiện skill.

**5. Document everything:**
Danh sách "thay đổi đã thử" quan trọng hơn bạn nghĩ. Đây là nghiên cứu bạn sẽ dùng cho các model tương lai.

---

*Output saved: cot-outputs/cot-20260314-143800-auto-research-skills-guide-vi.md*
