"""
Inference pipeline for UAV Human Detection.
Handles image preprocessing, model inference, and post-processing.
"""

import torch
import numpy as np
import cv2
from PIL import Image
from typing import List, Tuple, Dict, Optional, Union
from pathlib import Path

from model import load_model


class HumanDetector:
    """
    Human detection pipeline for thermal UAV imagery.
    """

    def __init__(
        self,
        model_path: str,
        device: Optional[torch.device] = None,
        conf_threshold: float = 0.5,
        img_size: int = 512
    ):
        """
        Initialize detector.

        Args:
            model_path: Path to model checkpoint (.pth)
            device: Torch device (auto-detect if None)
            conf_threshold: Confidence threshold for detections
            img_size: Image size for inference
        """
        self.device = device or torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.conf_threshold = conf_threshold
        self.img_size = img_size

        # Load model
        self.model = load_model(model_path, self.device)
        self.model.eval()

    def preprocess(self, image: Union[np.ndarray, Image.Image, str]) -> torch.Tensor:
        """
        Preprocess image for inference.

        Args:
            image: Input image (numpy array, PIL Image, or file path)

        Returns:
            Preprocessed tensor
        """
        # Load image if path
        if isinstance(image, str) or isinstance(image, Path):
            image = cv2.imread(str(image))
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        elif isinstance(image, Image.Image):
            image = np.array(image)
        elif isinstance(image, np.ndarray):
            # Handle BGR to RGB if needed
            if len(image.shape) == 3 and image.shape[2] == 3:
                # Assume BGR from cv2, convert to RGB
                image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # Store original size for scaling boxes back
        self.original_size = image.shape[:2]  # (H, W)

        # Resize
        image_resized = cv2.resize(image, (self.img_size, self.img_size))

        # Normalize to [0, 1] and convert to tensor
        image_tensor = torch.from_numpy(image_resized).float() / 255.0

        # Reorder dimensions: HWC -> CHW
        image_tensor = image_tensor.permute(2, 0, 1)

        return image_tensor

    @torch.no_grad()
    def detect(
        self,
        image: Union[np.ndarray, Image.Image, str],
        conf_threshold: Optional[float] = None
    ) -> Dict:
        """
        Run detection on an image.

        Args:
            image: Input image
            conf_threshold: Override default confidence threshold

        Returns:
            Dict with 'boxes', 'scores', 'labels', and 'num_detections'
        """
        conf_thresh = conf_threshold or self.conf_threshold

        # Preprocess
        image_tensor = self.preprocess(image)
        image_tensor = image_tensor.to(self.device)

        # Run inference
        outputs = self.model([image_tensor])[0]

        # Filter by confidence
        keep = outputs['scores'] >= conf_thresh

        boxes = outputs['boxes'][keep].cpu().numpy()
        scores = outputs['scores'][keep].cpu().numpy()
        labels = outputs['labels'][keep].cpu().numpy()

        # Scale boxes back to original image size
        h_orig, w_orig = self.original_size
        scale_x = w_orig / self.img_size
        scale_y = h_orig / self.img_size

        boxes[:, [0, 2]] *= scale_x  # x coordinates
        boxes[:, [1, 3]] *= scale_y  # y coordinates

        return {
            'boxes': boxes,
            'scores': scores,
            'labels': labels,
            'num_detections': len(boxes)
        }

    def draw_detections(
        self,
        image: np.ndarray,
        detections: Dict,
        color: Tuple[int, int, int] = (0, 255, 0),
        thickness: int = 2,
        font_scale: float = 0.6
    ) -> np.ndarray:
        """
        Draw detection boxes on image.

        Args:
            image: Input image (RGB or BGR)
            detections: Output from detect()
            color: Box color (BGR)
            thickness: Line thickness
            font_scale: Font scale for labels

        Returns:
            Image with drawn detections
        """
        result = image.copy()

        for box, score, label in zip(
            detections['boxes'],
            detections['scores'],
            detections['labels']
        ):
            x1, y1, x2, y2 = map(int, box)

            # Draw bounding box
            cv2.rectangle(result, (x1, y1), (x2, y2), color, thickness)

            # Create label text
            label_text = f"Person {score:.2f}"

            # Calculate text size
            (text_w, text_h), baseline = cv2.getTextSize(
                label_text, cv2.FONT_HERSHEY_SIMPLEX, font_scale, thickness
            )

            # Draw background for text
            label_y = max(y1 - 5, text_h + 10)
            cv2.rectangle(
                result,
                (x1, label_y - text_h - 8),
                (x1 + text_w + 8, label_y + 5),
                color, -1
            )

            # Draw text
            cv2.putText(
                result, label_text,
                (x1 + 4, label_y - 4),
                cv2.FONT_HERSHEY_SIMPLEX,
                font_scale,
                (255, 255, 255),
                thickness=2,
                lineType=cv2.LINE_AA
            )

        return result


def run_inference(
    image_path: str,
    model_path: str,
    conf_threshold: float = 0.5,
    output_path: Optional[str] = None
) -> Dict:
    """
    Convenience function to run inference on a single image.

    Args:
        image_path: Path to input image
        model_path: Path to model checkpoint
        conf_threshold: Confidence threshold
        output_path: Optional path to save result image

    Returns:
        Detection results
    """
    detector = HumanDetector(model_path, conf_threshold=conf_threshold)

    # Load image
    image = cv2.imread(image_path)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Run detection
    results = detector.detect(image_rgb)

    # Optionally save result
    if output_path:
        result_image = detector.draw_detections(image, results)
        cv2.imwrite(output_path, result_image)

    return results


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Run human detection on thermal images")
    parser.add_argument("image", help="Path to input image")
    parser.add_argument("--model", default="model_A_baseline_best.pth", help="Model checkpoint")
    parser.add_argument("--conf", type=float, default=0.5, help="Confidence threshold")
    parser.add_argument("--output", help="Output image path")

    args = parser.parse_args()

    results = run_inference(args.image, args.model, args.conf, args.output)

    print(f"Detected {results['num_detections']} person(s)")
    for i, (box, score) in enumerate(zip(results['boxes'], results['scores'])):
        print(f"  [{i+1}] Box: {box.astype(int).tolist()}, Score: {score:.3f}")
