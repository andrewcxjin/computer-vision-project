# 🚁 Robust Human Detection in UAV Imagery

A Colab-ready prototype for detecting humans in UAV thermal imagery using the HIT-UAV Infrared Thermal Dataset, with realistic SAR (Search and Rescue) condition augmentations.

## Features

- **HIT-UAV Dataset Integration**: Automatic download and COCO format conversion (person class only)
- **Comprehensive Debugging**: Visual confirmation at every processing step
- **SAR Augmentations**: Realistic snow, smoke/fire, and thermal artifact effects tested on real dataset images
- **Dual-Model Comparison**: Baseline vs SAR-augmented training with robustness evaluation
- **Transfer Learning**: Faster R-CNN ResNet50-FPN with frozen backbone
- **Detailed Metrics**: Precision, Recall, F1 with proper IoU-based evaluation
- **Google Drive Caching**: Persistent storage for datasets and checkpoints

## Experiment Design

The notebook implements a controlled experiment to measure augmentation effectiveness:

### Model A (Baseline)
- Trained on clean/normal data only
- No SAR augmentations applied
- Provides baseline performance metrics

### Model B (Augmented)
- Trained with SAR augmentations (50% probability)
- Random selection of: snow, smoke/fire, thermal artifacts, or none
- Tests robustness to adverse conditions

### Evaluation Strategy
Both models are evaluated on:
1. **Clean test set**: Original thermal images
2. **Perturbed test set**: Same images with SAR augmentations

**Key Metric**: F1 score drop on perturbed data measures robustness
- Lower drop = more robust model
- Goal: Model B should have smaller performance degradation

## Quick Start (Google Colab)

1. Open `uav_human_detection.ipynb` in Google Colab
2. Enable GPU runtime: `Runtime > Change runtime type > GPU`
3. Run cells sequentially (Ctrl+Enter)
4. Watch for debug visualizations after Cells 3, 4, 5, and 6
5. Total runtime: ~25-30 minutes on T4 GPU (trains two models for comparison)

**Note**: The notebook includes extensive visualization at each step. Check the output images to verify your data is being processed correctly!

## Notebook Structure

| Cell | Description |
|------|-------------|
| 1 | Environment setup & Drive mount |
| 2 | Imports and configuration |
| 3 | Download HIT-UAV dataset with debug visualization |
| 4 | Convert to COCO format (person class only) with sample images |
| 5 | SAR augmentations tested on real dataset images |
| 6 | Dataset class with train/val/test splits and loading verification |
| 7 | Evaluation function (corrected IoU-based metrics) |
| 8 | Model creation (Faster R-CNN) |
| 9 | Training function |
| 10 | Train Model A (baseline without augmentation) |
| 11 | Train Model B (with SAR augmentation) |
| 12 | Create perturbed test set |
| 13 | Final comparison (both models on clean & perturbed test) |
| 14 | Training curves visualization |
| 15 | Sample predictions visualization |
| 16 | Save experiment summary |

## Debugging & Visualization

The notebook includes comprehensive debugging at every step:

### Cell 3: Dataset Download
- Shows directory structure and file counts
- Analyzes label files and class distribution
- **Displays 4 random raw images with bounding boxes**
- Identifies if person annotations are present

### Cell 4: COCO Conversion
- Conditional execution (skips if already converted)
- Shows statistics on filtering (images with/without persons)
- **Displays 4 converted images with person annotations**
- Clear warnings if no person images are found

### Cell 5: SAR Augmentations
- **Tests all augmentations on 4 random dataset images**
- Side-by-side comparison: Original | Snow | Smoke/Fire | Thermal
- Additional 6 random augmentation samples
- All visualizations saved to outputs directory

### Cell 6: Dataset Loading
- Prints dataset statistics (image count, augmentation settings)
- **Side-by-side comparison of 8 samples** (original vs augmented)
- Verifies augmentations work correctly on real data
- Shows bounding boxes to confirm proper handling

### Output Images
All debug visualizations are saved as PNG files:
- `debug_dataset_samples.png` - Raw dataset with labels
- `converted_coco_samples.png` - COCO format verification
- `augmentations_dataset_samples.png` - 4×4 augmentation grid
- `augmentations_random_samples.png` - Random augmentation tests
- `dataset_loading_test.png` - Dataset class verification

## Configuration

Edit the `Config` class in Cell 2:

```python
IMG_SIZE = 512       # Image size for training
BATCH_SIZE = 4       # Adjust based on GPU memory
NUM_EPOCHS = 6       # Training epochs per model
LR = 0.005           # Learning rate
LR_STEP_SIZE = 3     # LR decay step
LR_GAMMA = 0.1       # LR decay multiplier
IOU_THRESHOLD = 0.5  # For metric computation
CONF_THRESHOLD = 0.5 # Detection confidence threshold
```

In Cell 4 (COCO conversion):
```python
force_reconvert = False  # Set to True to force reconversion
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

## Using Different Datasets

### Swapping to RGB Datasets
To use VisDrone, Okutama, or other RGB datasets:

1. Replace Cell 3 download function with your dataset loader
2. Update Cell 4 to match your annotation format
3. Modify `PERSON_CLASS` ID if different from 0
4. Consider disabling thermal augmentations or adding RGB-specific ones

### Using Different Classes
The notebook filters for person class only (class_id=0 in HIT-UAV):

1. In Cell 4, modify `PERSON_CLASS` constant
2. Update the class filtering logic in `convert_hituav_to_coco()`
3. Change `NUM_CLASSES` in Config if using multiple classes

## Using YOLOv8 Instead

Replace Cells 8-11 with:

```python
from ultralytics import YOLO
model = YOLO('yolov8n.pt')
model.train(data='your_data.yaml', epochs=6, imgsz=512, batch=4)
```

## Troubleshooting

### Dataset shows 0 samples
- Check Cell 3 output for label file analysis
- Verify person class ID is 0 in your dataset
- Look at `debug_dataset_samples.png` to confirm person annotations exist
- In Cell 4, check the filtering statistics (images with/without persons)

### COCO conversion is slow
- Set `force_reconvert=False` (default) to skip if already converted
- The notebook caches converted data to avoid reprocessing

### Augmentations not visible
- Check `augmentations_dataset_samples.png` for 4×4 grid
- Verify dataset images exist in `IMAGES_DIR`
- Look at `dataset_loading_test.png` for augmentation during training

### Low detection performance
- Check if enough person images in dataset (Cell 4 statistics)
- Verify bounding boxes are correct in debug images
- Consider increasing `NUM_EPOCHS` or adjusting learning rate
- Check precision/recall curves in `training_comparison.png`

## Outputs

All outputs are saved to Google Drive under `uav_detection/`:

### Checkpoints
- `checkpoints/model_A_baseline_best.pth` - Baseline model (no augmentation)
- `checkpoints/model_B_augmented_best.pth` - SAR-augmented model

### Data
- `data/curated/images/` - Resized and filtered person images
- `data/curated/annotations.json` - COCO format annotations
- `data/curated/train.json`, `val.json`, `test.json` - Dataset splits

### Debug Visualizations
- `outputs/debug_dataset_samples.png` - Raw dataset verification
- `outputs/converted_coco_samples.png` - COCO conversion check
- `outputs/augmentations_dataset_samples.png` - SAR augmentation grid
- `outputs/augmentations_random_samples.png` - Random augmentation tests
- `outputs/dataset_loading_test.png` - Dataset class verification

### Results
- `outputs/training_comparison.png` - Loss, precision, recall, F1 curves
- `outputs/metrics_comparison.png` - Bar chart comparison
- `outputs/model_B_clean_predictions.png` - Predictions on clean test set
- `outputs/model_B_perturbed_predictions.png` - Predictions on perturbed test set
- `outputs/experiment_summary.json` - Complete metrics and configuration

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
