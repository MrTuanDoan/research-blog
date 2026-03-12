# Karpathy's Auto Research + Self-Improving AI: 3 Real-World Usecases for R&D and Marketing
**Date:** 2026-03-13
**Source:** https://youtu.be/4Cb_l2LJAW8
**Title:** "This Open Source Project + Claude Code = Self-Improving AI"

---

Andrej Karpathy — cựu AI Director của Tesla, đồng sáng lập OpenAI — vừa drop một repo tên **Auto Research**.

Ý tưởng gốc: thay vì tự chạy thử nghiệm để train model, ông để AI tự thử nghiệm qua đêm. Sáng dậy có một bản log các experiments và một model tốt hơn.

Nhưng điều thú vị không phải là machine learning training. Điều thú vị là **pattern này có thể áp dụng cho bất kỳ thứ gì có metric đo được.**

Mình đọc xong repo đó và thấy ngay 3 applications cụ thể cho R&D và marketing. Đây là cách mình sẽ implement.

---

## Trước tiên: Cơ chế hoạt động

Auto Research chạy theo một vòng lặp cực kỳ đơn giản:

```
1. Baseline (cái đang dùng)
2. Hypothesis (muốn thử điều gì?)
3. Challenger (biến thể mới)
4. Measure (metric khách quan)
5. Pick winner → Challenger mới thành baseline
6. Lặp lại — tự động, 24/7
```

Karpathy chạy loop 5 phút một lần để train model. Người trong video chạy 4 giờ một lần để optimize cold email copy.

**3 thứ bắt buộc phải có:**
- **Metric khách quan** (reply rate, conversion rate, CTR...)
- **API để thay đổi input** (email platform, website builder, ad platform...)
- **Feedback loop nhanh** (càng nhanh càng nhiều experiments)

Nếu có đủ 3 thứ này → bạn có thể build một self-improving pipeline.

---

## Use Case 1: R&D — Self-Improving COT Prompts

**Bài toán:** Mình viết `/cot` và `/scaffold` hàng ngày. Nhưng quality của output phụ thuộc nhiều vào cách mình frame câu hỏi. Tại sao không để AI tự tìm ra cách frame tốt nhất?

**Cách implement:**

```
Baseline: Template COT hiện tại trong AGENTS.md

Metric: Độ sâu của output (số insights unique,
        số actionable steps, self-reported quality score 1-10)

Challenger: AI tự modify template — thêm/bớt sections,
            đổi thứ tự reasoning steps, thay đổi framing

Loop: Mỗi 10 COT outputs → evaluate → pick winner
      → winner trở thành template mới
```

**Trong practice:**
```python
# orchestrator tự chạy:
1. Lấy 10 COT outputs gần nhất
2. Score mỗi output theo rubric (depth, actionability, clarity)
3. Identify pattern nào trong template dẫn đến score cao
4. Generate challenger template với adjustments
5. Test challenger trên 10 COT tiếp theo
6. So sánh average score → pick winner
7. Update AGENTS.md với winning template
```

**Metric cụ thể có thể dùng:**
- Số `##` sections (structural depth)
- Số actionable bullet points
- Ratio concrete/abstract statements
- Self-eval score từ Claude (1-10, với rubric rõ ràng)

**Timeline:** Loop này có thể chạy hàng tuần. Sau 3 tháng, bạn có COT template được optimize qua ~50 experiments mà không cần tay.

---

## Use Case 2: Marketing — Self-Improving Content Hooks

**Bài toán:** Nếu bạn đang build personal brand hoặc content marketing, cái quyết định performance của 1 bài post là **hook đầu tiên** (3 giây đầu của video, dòng đầu của bài viết, subject line của email).

Đây là thứ có thể A/B test liên tục và có metric rõ ràng.

**Cách implement với blog này (`mrtuandoan-blog.vercel.app`):**

```
Baseline: Title format hiện tại của COT posts
          Ví dụ: "COT Analysis: Gemini Embedding 2..."

Metric: Click-through từ homepage → post page
        (có thể track bằng Vercel Analytics hoặc Plausible)

Challenger: AI generate 3 alternative titles cho cùng 1 post
            - Question format: "Gemini Embedding 2 vừa xóa sổ..."
            - Number format: "5 lý do Gemini Embedding 2..."  
            - Insight format: "One model. All modalities. Here's..."

Loop: Mỗi tuần → check CTR per title → winner trở thành default format
```

**Với Twitter/X (nếu Tuan build distribution):**
```
Baseline: Thread format hiện tại
Metric: Engagement rate (likes + retweets + replies / impressions)
API: Twitter API v2 (đã setup trong ECC stack)
Challenger: Đổi opening hook, thread length, CTA cuối
Loop: Mỗi 5 tweets → evaluate → update template
```

**Cái hay là bạn không cần nhiều traffic để có signal.** 100 impressions đủ để compare 2 variants. Với blog post, 50 visits/tuần đã đủ để chạy meaningful experiments.

---

## Use Case 3: R&D + Marketing Kết Hợp — Self-Improving Research Summaries

**Bài toán:** Mình summarize YouTube videos hàng ngày (`/summarize-yt`). Nhưng **format** của summary ảnh hưởng đến mức độ useful của nó — và mức độ người đọc muốn quay lại đọc tiếp.

Đây là usecase kết hợp R&D (tìm format tốt nhất cho bản thân) và marketing (engagement trên blog).

**Cách implement:**

```
Baseline: Summary format hiện tại
          - Bullet points
          - Section headers
          - Technical depth

Metric (2 layers):
  - Internal: Mình có refer lại summary này không? (manual tag)
  - External: Time-on-page trên blog (Vercel Analytics)

Challenger: AI test các format khác nhau:
  - Narrative style vs bullet points
  - Short (500 words) vs comprehensive (2000 words)
  - "What changed" framing vs "How to use" framing
  - Vietnamese vs English vs mixed

Loop: Mỗi 20 summaries → evaluate both metrics → update default format
```

**Implementation cụ thể với stack hiện tại:**

```python
# File: auto-research/summary-optimizer/orchestrator.py

BASELINE_FORMAT = """
## 📺 Summary: {title}
Key points: [bullet list]
What's new: [changes]
How to use: [actions]
"""

METRIC_FUNCTIONS = [
    get_blog_time_on_page,   # via Vercel Analytics API
    get_internal_usage_rate, # manual JSON log khi mình refer lại
]

def run_experiment():
    challenger = claude.generate_challenger_format(
        baseline=BASELINE_FORMAT,
        learnings=load_resource_md(),
        hypothesis="shorter + more opinionated = more engaging"
    )
    
    # Test trên 5 summaries tiếp theo
    apply_format(challenger, n=5)
    
    # Sau 1 tuần: harvest
    winner = compare_metrics(BASELINE_FORMAT, challenger)
    update_agents_md(winner)
    append_learnings(winner, loser)
```

**Sau 6 tháng chạy:** Bạn có một `resource.md` với những learnings như:
- "Summaries dưới 800 words có time-on-page cao hơn 40%"
- "Mở đầu bằng 'What changed' tăng CTR từ homepage 25%"
- "Vietnamese hooks perform 2x trên Telegram audience"

---

## Tại Sao Đây Là Shift Quan Trọng

Trước Auto Research pattern: Bạn improve bằng **intuition + manual testing**. Chậm, tốn effort, phụ thuộc vào bạn có time hay không.

Sau Auto Research pattern: Bạn improve bằng **automated experimentation**. Nhanh, 24/7, không cần bạn trong loop.

Karpathy nói về machine learning. Nhưng bản chất là **scientific method được tự động hóa**. Và scientific method áp dụng cho mọi thứ có metric.

Điều thay đổi game là Claude Code có thể build toàn bộ pipeline này từ natural language trong 30 phút. Cộng với GitHub Actions để schedule. Cộng với một API endpoint bất kỳ. Là bạn có một researcher AI làm việc cho bạn qua đêm.

---

## Roadmap Thực Tế Cho Tuan

| Week | Action | Expected Output |
|------|--------|----------------|
| 1 | Clone auto-research repo, đọc orchestrator.py | Hiểu pattern |
| 2 | Build Use Case 3 (summary optimizer) — ít rủi ro nhất | Working pipeline |
| 3 | Add Vercel Analytics → có external metric | Real data |
| 4 | Expand sang Use Case 2 (content hooks) | 2 pipelines chạy song song |
| 8+ | Use Case 1 (COT prompt optimizer) | Self-improving R&D workflow |

**Start với Use Case 3** vì:
- Không cần external API (chỉ cần Vercel Analytics + internal log)
- Feedback loop tự nhiên (mình produce summaries hàng ngày)
- Low risk (worst case: format không tốt hơn baseline)
- High upside (format tốt hơn = blog tốt hơn = distribution tốt hơn)

---

## Resources

- **Karpathy's Auto Research:** https://github.com/karpathy/auto-research
- **Concept Video:** https://youtu.be/4Cb_l2LJAW8
- **3 requirements:** Objective metric + API access + Fast feedback loop

---

*Output saved: cot-outputs/cot-20260313-070600-auto-research-3-usecases.md*
