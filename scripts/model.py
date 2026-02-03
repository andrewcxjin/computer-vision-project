"""
Model loading utilities for UAV Human Detection.
Faster R-CNN with ResNet50-FPN backbone.
"""

import torch
from torchvision.models.detection import fasterrcnn_resnet50_fpn, FasterRCNN_ResNet50_FPN_Weights
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor
from pathlib import Path


def create_detection_model(num_classes: int = 2, pretrained: bool = False) -> torch.nn.Module:
    """
    Create Faster R-CNN model for person detection.

    Args:
        num_classes: 2 (background + person)
        pretrained: Use COCO pretrained weights for initialization

    Returns:
        Faster R-CNN model
    """
    if pretrained:
        weights = FasterRCNN_ResNet50_FPN_Weights.DEFAULT
        model = fasterrcnn_resnet50_fpn(weights=weights)
    else:
        model = fasterrcnn_resnet50_fpn(weights=None)

    # Replace the classifier head for our task
    in_features = model.roi_heads.box_predictor.cls_score.in_features
    model.roi_heads.box_predictor = FastRCNNPredictor(in_features, num_classes)

    return model


def load_model(checkpoint_path: str, device: torch.device = None) -> torch.nn.Module:
    """
    Load a trained model from checkpoint.

    Args:
        checkpoint_path: Path to the .pth checkpoint file
        device: Device to load model onto (auto-detects if None)

    Returns:
        Loaded model in eval mode
    """
    if device is None:
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    # Create model architecture
    model = create_detection_model(num_classes=2, pretrained=False)

    # Load checkpoint
    checkpoint = torch.load(checkpoint_path, map_location=device, weights_only=False)

    # Handle different checkpoint formats
    if isinstance(checkpoint, dict) and 'model_state_dict' in checkpoint:
        model.load_state_dict(checkpoint['model_state_dict'])
    else:
        model.load_state_dict(checkpoint)

    model.to(device)
    model.eval()

    return model


def get_model_info(checkpoint_path: str) -> dict:
    """
    Get metadata about a checkpoint.

    Args:
        checkpoint_path: Path to checkpoint

    Returns:
        Dict with checkpoint metadata
    """
    checkpoint = torch.load(checkpoint_path, map_location="cpu", weights_only=False)

    info = {
        "path": str(checkpoint_path),
        "type": type(checkpoint).__name__,
    }

    if isinstance(checkpoint, dict):
        info["keys"] = list(checkpoint.keys())
        if "epoch" in checkpoint:
            info["epoch"] = checkpoint["epoch"]
        if "best_f1" in checkpoint:
            info["best_f1"] = checkpoint["best_f1"]
        if "metrics" in checkpoint:
            info["metrics"] = checkpoint["metrics"]

    return info
