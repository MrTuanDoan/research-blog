# Chain of Thought Analysis

## Task
Lên hướng dẫn từng bước sử dụng ComfyUI-Qwen-TTS cho người KHÔNG có máy tính với VRAM cao

## Context
- **ComfyUI-Qwen-TTS**: Custom nodes cho speech synthesis, voice cloning, voice design
- **Dựa trên**: Qwen3-TTS của Alibaba Qwen team
- **Yêu cầu**: Chạy LOCAL trên GPU (khác với Claude Code - cloud-based)
- **Models có sẵn**: 0.6B (nhẹ) và 1.7B (nặng hơn)

## Question
Làm sao để người có máy yếu/VRAM thấp vẫn dùng được Qwen3-TTS?

---

## Step-by-Step Reasoning

### Step 1: Phân Tích Yêu Cầu VRAM

| Model | VRAM Ước Tính (bf16) | Use Case |
|-------|---------------------|----------|
| **0.6B** | ~3-4GB | Fast, acceptable quality |
| **1.7B** | ~6-8GB | High quality, slower |
| **1.7B-VoiceDesign** | ~8-10GB | Voice design feature |

**Kết luận**: Model 0.6B có thể chạy được trên GPU 4GB+ (GTX 1650, etc.)

### Step 2: Các Tính Năng Giảm VRAM Có Sẵn

Từ README, project đã có sẵn các tính năng hỗ trợ máy yếu:

1. **`unload_model_after_generate`**: Xóa model khỏi GPU sau mỗi lần generate
2. **Attention mechanism `eager`**: Chậm hơn nhưng ít VRAM hơn
3. **Model 0.6B**: Nhỏ hơn 1.7B ~3x
4. **bf16 precision**: Tiết kiệm memory đáng kể

### Step 3: Các Giải Pháp Cho Máy VRAM Thấp

#### Solution A: Tối Ưu Settings (VRAM 4-6GB)
```
✅ Dùng model 0.6B
✅ Bật unload_model_after_generate
✅ Attention: eager (ít VRAM nhất)
✅ batch_size: 1 (cho Dialogue node)
```

#### Solution B: CPU Inference (VRAM 0GB - Có GPU yếu/không có)
```
✅ Chỉnh code để force CPU
✅ Sẽ CHẬM (~10-30x so với GPU)
✅ Nhưng chạy được trên máy không có GPU
```

#### Solution C: Cloud GPU Services (Không có GPU mạnh)
```
✅ RunningHub.ai (có workflow sẵn trong README)
✅ Google Colab (miễn phí T4 GPU)
✅ Vast.ai / RunPod (thuê GPU theo giờ ~$0.2-0.5/hr)
```

#### Solution D: Hybrid - ComfyUI Remote
```
✅ Chạy ComfyUI trên cloud
✅ Truy cập từ browser local
✅ Không cần GPU mạnh trên máy
```

### Step 4: Hướng Dẫn Chi Tiết Từng Solution

---

## SOLUTION A: Tối Ưu Settings (VRAM 4-6GB)

### Bước 1: Cài Đặt ComfyUI
```bash
# Clone ComfyUI
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI

# Tạo virtual environment
python -m venv venv
venv\Scripts\activate  # Windows

# Cài dependencies
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
pip install -r requirements.txt
```

### Bước 2: Cài ComfyUI-Qwen-TTS
```bash
cd custom_nodes
git clone https://github.com/flybirdxx/ComfyUI-Qwen-TTS.git
cd ComfyUI-Qwen-TTS
pip install -r requirements.txt
```

### Bước 3: Tải Model Nhẹ Nhất (0.6B)
```bash
# Tạo folder
mkdir -p ComfyUI/models/qwen-tts/Qwen

# Tải model 0.6B (nhẹ nhất)
# Dùng huggingface-cli hoặc manual download
huggingface-cli download Qwen/Qwen3-TTS-12Hz-0.6B-Base --local-dir ComfyUI/models/qwen-tts/Qwen/Qwen3-TTS-12Hz-0.6B-Base

# Tải tokenizer
huggingface-cli download Qwen/Qwen3-TTS-Tokenizer-12Hz --local-dir ComfyUI/models/qwen-tts/Qwen/Qwen3-TTS-Tokenizer-12Hz
```

### Bước 4: Cấu Hình Cho VRAM Thấp
Trong ComfyUI workflow:
```
model_choice: 0.6B (QUAN TRỌNG!)
attention: eager (ít VRAM nhất)
unload_model_after_generate: ✅ Enabled
batch_size: 1 (nếu dùng DialogueNode)
```

### Bước 5: Chạy ComfyUI với Low VRAM Mode
```bash
# Chạy với lowvram flag
python main.py --lowvram

# Hoặc nếu vẫn OOM:
python main.py --novram
```

---

## SOLUTION B: CPU Inference (Không Có GPU)

### Bước 1: Cài đặt như Solution A

### Bước 2: Force CPU trong launch
```bash
# Chạy ComfyUI với CPU only
python main.py --cpu
```

### Bước 3: Kiên nhẫn chờ
- CPU inference CHẬM hơn GPU ~10-30x
- 1 câu TTS có thể mất 30s-2 phút thay vì 2-5s
- Nhưng vẫn hoạt động được!

---

## SOLUTION C: Cloud GPU (Khuyến Nghị Cho Máy Yếu)

### Option 1: RunningHub.ai (Dễ Nhất)
README đã cung cấp workflow sẵn:
- [Workflow Multi-Role Dialogue](https://www.runninghub.ai/post/2014703508829769729/?inviteCode=rh-v1041)
- [Workflow 3-in-1](https://www.runninghub.ai/post/2014962110224142337/?inviteCode=rh-v1041)

**Ưu điểm**: Click và chạy, không cần setup
**Nhược điểm**: Tốn credits

### Option 2: Google Colab (Miễn Phí)
```python
# Colab notebook
!git clone https://github.com/comfyanonymous/ComfyUI.git
%cd ComfyUI
!pip install -r requirements.txt

# Install Qwen-TTS
%cd custom_nodes
!git clone https://github.com/flybirdxx/ComfyUI-Qwen-TTS.git
%cd ComfyUI-Qwen-TTS
!pip install torch torchaudio transformers librosa accelerate

# Download models
!huggingface-cli download Qwen/Qwen3-TTS-12Hz-0.6B-Base --local-dir /content/ComfyUI/models/qwen-tts/Qwen/Qwen3-TTS-12Hz-0.6B-Base

# Run with ngrok tunnel
!pip install pyngrok
from pyngrok import ngrok
ngrok.set_auth_token("YOUR_TOKEN")
public_url = ngrok.connect(8188)
print(f"ComfyUI URL: {public_url}")

%cd /content/ComfyUI
!python main.py --listen
```

### Option 3: Vast.ai / RunPod (Rẻ)
- Thuê RTX 3090 24GB: ~$0.3-0.5/hr
- Chạy thoải mái model 1.7B
- Setup: SSH vào → clone ComfyUI → run

---

## SOLUTION D: Sử Dụng API Thay Thế (Không Cần Local)

Nếu không muốn chạy local, có thể dùng các TTS API khác:
- **ElevenLabs**: Voice cloning tốt, có free tier
- **OpenAI TTS**: Chất lượng cao, $15/1M chars
- **Azure TTS**: Enterprise-grade
- **Coqui TTS**: Open source, có cloud option

---

## Assumptions & Uncertainties

| Assumption | Validity | Impact |
|------------|----------|--------|
| Model 0.6B cần ~3-4GB VRAM | Medium-High | Có thể ít/nhiều hơn tùy settings |
| CPU inference chạy được | High | Confirmed trong PyTorch |
| eager attention ít VRAM nhất | High | Theo README |
| Google Colab có đủ VRAM cho 0.6B | High | T4 có 15GB |

---

## Recommendations By VRAM Level

| VRAM | Recommended Solution |
|------|---------------------|
| **0GB (No GPU)** | Solution C (Cloud) hoặc B (CPU - chậm) |
| **2-3GB** | Solution C (Cloud) - local không đủ |
| **4GB** | Solution A với 0.6B + eager + unload |
| **6GB** | Solution A với 0.6B, có thể thử 1.7B |
| **8GB+** | Full features, có thể dùng 1.7B |
| **12GB+** | Tất cả features + batch processing |

---

## Quick Start for Low VRAM Users

```bash
# 1. Clone & Setup
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
pip install -r requirements.txt

# 2. Install Qwen-TTS
cd custom_nodes
git clone https://github.com/flybirdxx/ComfyUI-Qwen-TTS.git
pip install torch torchaudio transformers librosa accelerate

# 3. Download ONLY 0.6B model (smaller)
huggingface-cli download Qwen/Qwen3-TTS-12Hz-0.6B-Base --local-dir ../models/qwen-tts/Qwen/Qwen3-TTS-12Hz-0.6B-Base
huggingface-cli download Qwen/Qwen3-TTS-Tokenizer-12Hz --local-dir ../models/qwen-tts/Qwen/Qwen3-TTS-Tokenizer-12Hz

# 4. Run with low VRAM mode
cd ..
python main.py --lowvram
```

**Trong workflow, LUÔN set:**
- `model_choice`: **0.6B**
- `attention`: **eager**
- `unload_model_after_generate`: **✅ ON**

---

## Confidence Level
- Solution A (Optimize settings): **90%** ✅
- Solution B (CPU): **80%** (chậm nhưng works)
- Solution C (Cloud): **95%** ✅
- VRAM estimates: **75%** (cần test thực tế)
