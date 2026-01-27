# 🚁 Robust Human Detection in UAV Imagery

A Colab-ready prototype for detecting humans in UAV thermal imagery using the HIT-UAV Infrared Thermal Dataset, with realistic SAR (Search and Rescue) condition augmentations.

## Features

- **HIT-UAV Dataset Integration**: Automatic download and COCO format conversion
- **Scene Filtering**: Remove urban scenes to focus on SAR-relevant imagery
- **SAR Augmentations**: Realistic snow, smoke/fire, and thermal artifact effects
- **Transfer Learning**: Faster R-CNN ResNet50-FPN with frozen backbone
- **Robustness Evaluation**: Compare clean vs perturbed performance
- **Google Drive Caching**: Persistent storage for datasets and checkpoints

## Quick Start (Google Colab)

1. Open `uav_human_detection.ipynb` in Google Colab
2. Enable GPU runtime: `Runtime > Change runtime type > GPU`
3. Run cells sequentially (Ctrl+Enter)
4. Total runtime: ~15-20 minutes on T4 GPU

## Notebook Structure

| Cell | Description |
|------|-------------|
| 1 | Environment setup & Drive mount |
| 2 | Imports and configuration |
| 3 | Data ingestion (HIT-UAV or synthetic fallback) |
| 4 | Scene filtering & curation |
| 5 | SAR augmentations (snow, fire, thermal) |
| 6 | PyTorch Dataset & DataLoader |
| 7 | Model setup (Faster R-CNN) |
| 8 | Training loop |
| 9 | Robustness evaluation |
| 10 | Visualizations |
| 11 | Save outputs |
| 12 | Quick inference demo |

## Configuration

Edit the `Config` class in Cell 2:

```python
IMG_SIZE = 512       # Image size for training
BATCH_SIZE = 4       # Adjust based on GPU memory
NUM_EPOCHS = 5       # Quick training for demo
LR = 0.001           # Learning rate
IOU_THRESHOLD = 0.5  # For metric computation
CONF_THRESHOLD = 0.5 # Detection confidence threshold
```

## SAR Augmentations

### Snow Effect
- Perlin-like noise blending
- Contrast reduction (atmospheric haze)
- Configurable intensity

### Smoke/Fire Effect
- Fractal noise smoke patterns
- Orange fire glow hotspots
- Rising smoke gradient

### Thermal Artifacts
- Intensity scaling
- Sensor noise (including horizontal banding)
- Local saturation spots

## Swapping to RGB Datasets

To use VisDrone, Okutama, or other RGB datasets:

1. Update `DatasetDownloader` URLs
2. Set `apply_sar_augmentation=False` in dataset
3. Consider adding color jitter augmentations

## Using YOLOv8 Instead

Replace Cell 7 with:

```python
from ultralytics import YOLO
model = YOLO('yolov8n.pt')
model.train(data='your_data.yaml', epochs=5, imgsz=512)
```

## Outputs

All outputs are saved to Google Drive under `uav_detection/`:

- `checkpoints/best_model.pth` - Best model checkpoint
- `outputs/instances_filtered.json` - Curated annotations
- `outputs/predictions_*.png` - Visualization examples
- `outputs/experiment_summary.json` - Metrics summary

## Requirements

```
torch>=2.0.0
torchvision>=0.15.0
albumentations>=1.3.0
pycocotools>=2.0.6
opencv-python-headless>=4.8.0
matplotlib>=3.5.0
gdown>=4.7.0
```

## License

MIT License - For research and educational purposes.

## Acknowledgments

- [HIT-UAV Dataset](https://github.com/suojiashun/HIT-UAV-Infrared-Thermal-Dataset)
- PyTorch/torchvision detection models
