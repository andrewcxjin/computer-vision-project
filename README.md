# 🚁 Robust Human Detection in UAV Imagery

A computer vision project for detecting humans in UAV thermal imagery using the HIT-UAV Infrared Thermal Dataset, with realistic SAR (Search and Rescue) condition augmentations.

## Project Overview

This project implements and compares three modeling approaches for human detection in thermal UAV imagery:

1. **Naive Baseline**: Random detector and always-negative detector
2. **Classical ML**: HOG + SVM sliding window detector
3. **Deep Learning**: Faster R-CNN with ResNet50-FPN backbone (two variants)

### Key Experiment

We train two deep learning models to study robustness to adverse environmental conditions:
- **Model A (Baseline)**: Trained on clean thermal images only
- **Model B (Augmented)**: Trained with SAR augmentations (snow, fog/smoke)

**Key Finding**: Model B shows **3x smaller F1 drop** under adverse conditions, proving augmentation improves robustness.

## Project Structure

```
├── README.md                   <- This file
├── requirements.txt            <- Dependencies for full project
├── requirements_deploy.txt     <- Minimal dependencies for deployment
├── setup.py                    <- Script to set up project
├── main.py                     <- Main application (Gradio interface)
├── scripts/                    <- Pipeline and utility scripts
│   ├── model.py               <- Model architecture and loading
│   ├── inference.py           <- Detection pipeline
│   └── augmentations.py       <- SAR augmentation effects
├── models/                     <- Trained model weights
│   ├── model_A_baseline_best.pth
│   ├── model_B_augmented_best.pth
│   └── hog_svm_model.joblib
├── data/                       <- Project data
│   ├── raw/                   <- Raw dataset (HIT-UAV)
│   ├── processed/             <- Processed data
│   ├── outputs/               <- Output visualizations
│   └── examples/              <- Example images for demo
├── notebooks/                  <- Jupyter notebooks
│   └── uav_human_detection.ipynb
└── .gitignore
```

## Quick Start

### Option 1: Run the Web Application

```bash
# Install dependencies
pip install -r requirements_deploy.txt

# Run the Gradio app
python main.py
```

The app will be available at `http://localhost:7860`

### Option 2: Run Training Notebook

1. Open `notebooks/uav_human_detection.ipynb` in Google Colab
2. Enable GPU runtime: `Runtime > Change runtime type > GPU`
3. Run cells sequentially
4. Training takes ~25-30 minutes on T4 GPU

### Option 3: Full Setup

```bash
# Create directories and install requirements
python setup.py --all

# Or step by step:
python setup.py --install   # Install requirements
python setup.py --download  # Download dataset
```

## Interactive Application

The main application (`main.py`) provides:

| Feature | Description |
|---------|-------------|
| **Single Detection** | Upload image, select model, adjust confidence |
| **Model Comparison** | Side-by-side Model A vs Model B |
| **Robustness Test** | Test under clean/snow/fog conditions |
| **Example Images** | Pre-loaded thermal samples |

### Deployment

For deployment to Hugging Face Spaces or other platforms, see `README_DEPLOY.md`.

## Results

### Clean Test Set Performance
| Model | F1 | Precision | Recall | mAP |
|-------|-----|-----------|--------|-----|
| Model A (Baseline) | 0.7808 | 0.7226 | 0.8491 | 0.4285 |
| Model B (Augmented) | 0.7606 | 0.6904 | 0.8467 | 0.4297 |

### Perturbed Test Set Performance
| Model | F1 | F1 Drop | mAP |
|-------|-----|---------|-----|
| Model A (Baseline) | 0.6249 | **-0.1559** | 0.3087 |
| Model B (Augmented) | 0.7029 | **-0.0577** | 0.3928 |

**Key Finding**: Model B (trained with augmentations) shows 3x smaller performance drop under adverse conditions.

## Three Model Comparison

| Model | Type | mAP@0.5 | Notes |
|-------|------|---------|-------|
| Random Baseline | Naive | 0.0000 | Lower bound |
| HOG + SVM | Classical ML | 0.0297 | Traditional approach |
| Faster R-CNN (A) | Deep Learning | 0.7799 | Baseline |
| Faster R-CNN (B) | Deep Learning | 0.7733 | **More robust** |

## SAR Augmentations

### Snow Effect
- Multi-scale Perlin-like noise for ground coverage
- Sparse falling snowflakes
- Atmospheric blur

### Fog/Smoke Effect
- Dense white-gray fog overlay
- Gaussian noise variation
- Atmospheric blur

## Configuration

Edit configuration in the notebook or `scripts/model.py`:

```python
IMG_SIZE = 512       # Image size
BATCH_SIZE = 4       # Batch size
NUM_EPOCHS = 6       # Training epochs
LR = 0.005           # Learning rate
CONF_THRESHOLD = 0.5 # Detection threshold
```

## Requirements

### Full Project
```
torch>=2.0.0
torchvision>=0.15.0
albumentations>=1.3.0
pycocotools>=2.0.6
opencv-python-headless>=4.8.0
matplotlib>=3.5.0
scikit-learn>=1.0.0
scikit-image>=0.19.0
joblib>=1.1.0
tqdm>=4.64.0
```

### Deployment Only
```
torch>=2.0.0
torchvision>=0.15.0
gradio>=4.0.0
opencv-python-headless>=4.8.0
Pillow>=9.0.0
numpy>=1.21.0
```

## Dataset

**HIT-UAV Infrared Thermal Dataset**
- 2,006 thermal images from UAV platforms
- High-altitude capture for SAR scenarios
- Focus on person detection

Download: [Kaggle](https://www.kaggle.com/datasets/pandrii000/hituav-a-highaltitude-infrared-thermal-dataset)

## License

MIT License - For research and educational purposes.

## Acknowledgments

- [HIT-UAV Dataset](https://github.com/suojiashun/HIT-UAV-Infrared-Thermal-Dataset)
- PyTorch/TorchVision detection models
- Gradio for the web interface
- Claude Code (citation listed at bottom of relevant files)

// -----------------------------------------------------------------------------
// Citation: This file was built with the assistance of Claude (Anthropic).
// Claude Chat: https://claude.ai/share/b7904428-8d66-45d2-a41d-da9b019da71a
// -----------------------------------------------------------------------------
