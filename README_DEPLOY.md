# UAV Human Detection - Deployment Guide

## Quick Start (Hugging Face Spaces)

### 1. Create a New Space
1. Go to [huggingface.co/spaces](https://huggingface.co/spaces)
2. Click "Create new Space"
3. Select **Gradio** as the SDK
4. Choose **CPU Basic** (free) or **GPU** for faster inference

### 2. Upload Files
Upload these files to your Space:
```
├── app.py                      # Main Gradio application
├── model.py                    # Model loading utilities
├── inference.py                # Detection pipeline
├── augmentations.py            # SAR augmentations
├── requirements.txt            # Dependencies (use requirements_deploy.txt)
├── model_A_baseline_best.pth   # Baseline model (~160MB)
├── model_B_augmented_best.pth  # Augmented model (~160MB)
└── examples/
    ├── thermal_sample_1.jpg
    ├── thermal_sample_2.jpg
    └── thermal_sample_3.jpg
```

### 3. Configure requirements.txt
Use the contents of `requirements_deploy.txt`:
```
torch>=2.0.0
torchvision>=0.15.0
gradio>=4.0.0
opencv-python-headless>=4.8.0
Pillow>=9.0.0
numpy>=1.21.0
```

### 4. For GPU Spaces
Add to the top of requirements.txt:
```
--extra-index-url https://download.pytorch.org/whl/cu118
```

---

## Alternative: Local Deployment

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or: venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements_deploy.txt

# Run the app
python app.py
```

The app will be available at `http://localhost:7860`

---

## Alternative: Docker Deployment

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements_deploy.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 7860

CMD ["python", "app.py"]
```

Build and run:
```bash
docker build -t uav-detection .
docker run -p 7860:7860 uav-detection
```

---

## Model Files

The model files are large (~160MB each). Options for handling:

1. **Git LFS**: Store in repo with Git Large File Storage
2. **Hugging Face Hub**: Upload to a model repo and download at startup
3. **Google Drive**: Download at app startup (add download code to app.py)

### Using Hugging Face Hub (Recommended)
```python
from huggingface_hub import hf_hub_download

model_path = hf_hub_download(
    repo_id="your-username/uav-human-detection",
    filename="model_A_baseline_best.pth"
)
```

---

## App Features

| Feature | Description |
|---------|-------------|
| Single Detection | Run inference with one model |
| Model Comparison | Side-by-side comparison of both models |
| Robustness Test | Test under snow/fog conditions |
| Adjustable Threshold | Tune confidence threshold |
| Example Images | Pre-loaded thermal samples |

---

## Troubleshooting

### Out of Memory
- Use CPU instead of GPU for smaller memory footprint
- Reduce `IMG_SIZE` in app.py

### Slow Inference
- Upgrade to GPU Space
- Reduce image resolution

### Model Loading Errors
- Ensure model files are uploaded correctly
- Check file permissions
