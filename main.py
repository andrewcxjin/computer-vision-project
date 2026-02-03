"""
UAV Human Detection - Interactive Demo Application

A proof-of-concept application for detecting humans in thermal UAV imagery,
designed for Search and Rescue (SAR) operations.

Features:
- Compare baseline vs. augmented models
- Stress test with environmental conditions (snow, fog/smoke)
- Side-by-side model comparison
- Adjustable confidence threshold
"""

import gradio as gr
import numpy as np
import cv2
import torch
from PIL import Image
from pathlib import Path
import time
import sys

# Add scripts directory to path for imports
sys.path.insert(0, str(Path(__file__).parent / "scripts"))

from model import load_model
from inference import HumanDetector
from augmentations import apply_snow, apply_smoke


# Configuration
MODEL_A_PATH = "models/model_A_baseline_best.pth"
MODEL_B_PATH = "models/model_B_augmented_best.pth"
DEFAULT_CONF_THRESHOLD = 0.5
IMG_SIZE = 512

# Global model cache
models = {}


def get_device():
    """Get the best available device."""
    if torch.cuda.is_available():
        return torch.device("cuda")
    elif hasattr(torch.backends, "mps") and torch.backends.mps.is_available():
        return torch.device("mps")
    return torch.device("cpu")


def load_models():
    """Load both models into cache."""
    global models
    device = get_device()

    if "model_a" not in models:
        print("Loading Model A (Baseline)...")
        models["model_a"] = HumanDetector(MODEL_A_PATH, device=device)
        print("Model A loaded.")

    if "model_b" not in models:
        print("Loading Model B (Augmented)...")
        models["model_b"] = HumanDetector(MODEL_B_PATH, device=device)
        print("Model B loaded.")

    return models


def draw_detections_on_image(
    image: np.ndarray,
    detections: dict,
    color: tuple = (0, 255, 0),
    model_name: str = ""
) -> np.ndarray:
    """Draw detection boxes with model info overlay."""
    result = image.copy()

    # Draw each detection
    for box, score in zip(detections['boxes'], detections['scores']):
        x1, y1, x2, y2 = map(int, box)

        # Draw box
        cv2.rectangle(result, (x1, y1), (x2, y2), color, 2)

        # Label
        label = f"Person {score:.2f}"
        (tw, th), _ = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 2)

        # Background for label
        cv2.rectangle(result, (x1, y1 - th - 10), (x1 + tw + 8, y1), color, -1)
        cv2.putText(result, label, (x1 + 4, y1 - 6),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

    # Add model name overlay
    if model_name:
        overlay_text = f"{model_name} | {detections['num_detections']} detection(s)"
        cv2.rectangle(result, (5, 5), (len(overlay_text) * 10 + 10, 30), (0, 0, 0), -1)
        cv2.putText(result, overlay_text, (10, 22),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)

    return result


def single_model_detection(
    image: np.ndarray,
    model_choice: str,
    conf_threshold: float,
    apply_perturbation: str
) -> tuple:
    """Run detection with a single model."""
    if image is None:
        return None, "Please upload an image."

    models = load_models()
    model_key = "model_a" if model_choice == "Model A (Baseline)" else "model_b"
    detector = models[model_key]
    detector.conf_threshold = conf_threshold

    # Convert to numpy if PIL
    if isinstance(image, Image.Image):
        image = np.array(image)

    # Apply perturbation if selected
    original_image = image.copy()
    perturbation_applied = "None"

    if apply_perturbation == "Snow":
        image = apply_snow(cv2.cvtColor(image, cv2.COLOR_RGB2BGR), intensity=0.6)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        perturbation_applied = "Snow"
    elif apply_perturbation == "Fog/Smoke":
        image = apply_smoke(cv2.cvtColor(image, cv2.COLOR_RGB2BGR), intensity=0.6)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        perturbation_applied = "Fog/Smoke"

    # Run detection
    start_time = time.time()
    detections = detector.detect(image)
    inference_time = (time.time() - start_time) * 1000

    # Draw results
    color = (0, 200, 0) if model_key == "model_a" else (0, 100, 255)
    result_image = draw_detections_on_image(image, detections, color, model_choice)

    # Create summary
    summary = f"""
### Detection Results

| Metric | Value |
|--------|-------|
| **Model** | {model_choice} |
| **Persons Detected** | {detections['num_detections']} |
| **Confidence Threshold** | {conf_threshold:.2f} |
| **Perturbation** | {perturbation_applied} |
| **Inference Time** | {inference_time:.1f} ms |
| **Device** | {get_device()} |

"""
    if detections['num_detections'] > 0:
        summary += "#### Detection Details:\n"
        for i, (box, score) in enumerate(zip(detections['boxes'], detections['scores'])):
            summary += f"- Person {i+1}: Confidence {score:.2%}, Box [{int(box[0])}, {int(box[1])}, {int(box[2])}, {int(box[3])}]\n"

    return result_image, summary


def compare_models(
    image: np.ndarray,
    conf_threshold: float,
    apply_perturbation: str
) -> tuple:
    """Run side-by-side comparison of both models."""
    if image is None:
        return None, None, "Please upload an image."

    models = load_models()

    # Convert to numpy if PIL
    if isinstance(image, Image.Image):
        image = np.array(image)

    # Apply perturbation if selected
    perturbation_applied = "None"
    if apply_perturbation == "Snow":
        image = apply_snow(cv2.cvtColor(image, cv2.COLOR_RGB2BGR), intensity=0.6)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        perturbation_applied = "Snow"
    elif apply_perturbation == "Fog/Smoke":
        image = apply_smoke(cv2.cvtColor(image, cv2.COLOR_RGB2BGR), intensity=0.6)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        perturbation_applied = "Fog/Smoke"

    # Run both models
    models["model_a"].conf_threshold = conf_threshold
    models["model_b"].conf_threshold = conf_threshold

    start_a = time.time()
    detections_a = models["model_a"].detect(image)
    time_a = (time.time() - start_a) * 1000

    start_b = time.time()
    detections_b = models["model_b"].detect(image)
    time_b = (time.time() - start_b) * 1000

    # Draw results
    result_a = draw_detections_on_image(image.copy(), detections_a, (0, 200, 0), "Model A (Baseline)")
    result_b = draw_detections_on_image(image.copy(), detections_b, (0, 100, 255), "Model B (Augmented)")

    # Create comparison summary
    summary = f"""
### Model Comparison Results

| Metric | Model A (Baseline) | Model B (Augmented) |
|--------|-------------------|---------------------|
| **Persons Detected** | {detections_a['num_detections']} | {detections_b['num_detections']} |
| **Inference Time** | {time_a:.1f} ms | {time_b:.1f} ms |
| **Perturbation** | {perturbation_applied} | {perturbation_applied} |

---

#### Key Insight:
- **Model A** was trained on clean thermal images only
- **Model B** was trained with SAR augmentations (snow, fog) for robustness

When perturbations are applied, Model B typically maintains better detection accuracy,
demonstrating improved robustness to adverse environmental conditions.
"""

    return result_a, result_b, summary


def robustness_test(image: np.ndarray, conf_threshold: float) -> tuple:
    """Test model robustness across all conditions."""
    if image is None:
        return None, None, None, None, None, None, "Please upload an image."

    models = load_models()

    if isinstance(image, Image.Image):
        image = np.array(image)

    models["model_a"].conf_threshold = conf_threshold
    models["model_b"].conf_threshold = conf_threshold

    results = {}

    # Test conditions
    conditions = [
        ("Clean", image),
        ("Snow", apply_snow(cv2.cvtColor(image, cv2.COLOR_RGB2BGR), 0.6)),
        ("Fog/Smoke", apply_smoke(cv2.cvtColor(image, cv2.COLOR_RGB2BGR), 0.6)),
    ]

    output_images = []

    for condition_name, test_image in conditions:
        if condition_name != "Clean":
            test_image = cv2.cvtColor(test_image, cv2.COLOR_BGR2RGB)

        det_a = models["model_a"].detect(test_image)
        det_b = models["model_b"].detect(test_image)

        results[condition_name] = {
            "model_a": det_a['num_detections'],
            "model_b": det_b['num_detections']
        }

        # Create side-by-side for this condition
        img_a = draw_detections_on_image(test_image.copy(), det_a, (0, 200, 0), f"A: {condition_name}")
        img_b = draw_detections_on_image(test_image.copy(), det_b, (0, 100, 255), f"B: {condition_name}")

        output_images.extend([img_a, img_b])

    # Summary
    summary = f"""
### Robustness Test Results

| Condition | Model A (Baseline) | Model B (Augmented) | Difference |
|-----------|-------------------|---------------------|------------|
| **Clean** | {results['Clean']['model_a']} | {results['Clean']['model_b']} | {results['Clean']['model_b'] - results['Clean']['model_a']:+d} |
| **Snow** | {results['Snow']['model_a']} | {results['Snow']['model_b']} | {results['Snow']['model_b'] - results['Snow']['model_a']:+d} |
| **Fog/Smoke** | {results['Fog/Smoke']['model_a']} | {results['Fog/Smoke']['model_b']} | {results['Fog/Smoke']['model_b'] - results['Fog/Smoke']['model_a']:+d} |

---

#### Analysis:
This test demonstrates how each model performs under different environmental conditions.
Model B (trained with augmentations) is expected to maintain more consistent detection
counts across adverse conditions, making it more suitable for real-world SAR operations.
"""

    return tuple(output_images) + (summary,)


# Build the Gradio interface
def create_app():
    """Create the Gradio application."""

    # Custom CSS for better styling
    custom_css = """
    .gradio-container {
        max-width: 1400px !important;
    }
    .title {
        text-align: center;
        margin-bottom: 10px;
    }
    .subtitle {
        text-align: center;
        color: #666;
        margin-bottom: 20px;
    }
    """

    with gr.Blocks(css=custom_css, title="UAV Human Detection", theme=gr.themes.Soft()) as app:
        # Header
        gr.Markdown(
            """
            # 🚁 UAV Human Detection for Search & Rescue

            **Detect humans in thermal UAV imagery using deep learning**

            This demo compares two Faster R-CNN models trained on the HIT-UAV thermal dataset:
            - **Model A (Baseline)**: Trained on clean thermal images
            - **Model B (Augmented)**: Trained with SAR augmentations for robustness

            Upload a thermal image or use an example to test the detection system.
            """
        )

        with gr.Tabs():
            # Tab 1: Single Model Detection
            with gr.TabItem("🔍 Single Detection"):
                gr.Markdown("### Run detection with a single model")

                with gr.Row():
                    with gr.Column(scale=1):
                        input_image_single = gr.Image(
                            label="Upload Thermal Image",
                            type="numpy",
                            height=400
                        )
                        gr.Examples(
                            examples=[
                                "data/examples/thermal_sample_1.jpg",
                                "data/examples/thermal_sample_2.jpg",
                                "data/examples/thermal_sample_3.jpg",
                            ],
                            inputs=input_image_single,
                            label="Example Thermal Images"
                        )
                        model_choice = gr.Radio(
                            choices=["Model A (Baseline)", "Model B (Augmented)"],
                            value="Model A (Baseline)",
                            label="Select Model"
                        )
                        conf_single = gr.Slider(
                            minimum=0.1, maximum=0.95, value=0.5, step=0.05,
                            label="Confidence Threshold"
                        )
                        perturbation_single = gr.Radio(
                            choices=["None", "Snow", "Fog/Smoke"],
                            value="None",
                            label="Apply Environmental Perturbation"
                        )
                        detect_btn_single = gr.Button("🔍 Detect", variant="primary", size="lg")

                    with gr.Column(scale=1):
                        output_image_single = gr.Image(label="Detection Result", height=400)
                        output_summary_single = gr.Markdown(label="Results")

                detect_btn_single.click(
                    single_model_detection,
                    inputs=[input_image_single, model_choice, conf_single, perturbation_single],
                    outputs=[output_image_single, output_summary_single]
                )

            # Tab 2: Model Comparison
            with gr.TabItem("⚖️ Compare Models"):
                gr.Markdown("### Side-by-side comparison of both models on the same image")

                with gr.Row():
                    with gr.Column(scale=1):
                        input_image_compare = gr.Image(
                            label="Upload Thermal Image",
                            type="numpy",
                            height=350
                        )
                        conf_compare = gr.Slider(
                            minimum=0.1, maximum=0.95, value=0.5, step=0.05,
                            label="Confidence Threshold"
                        )
                        perturbation_compare = gr.Radio(
                            choices=["None", "Snow", "Fog/Smoke"],
                            value="None",
                            label="Apply Environmental Perturbation"
                        )
                        compare_btn = gr.Button("⚖️ Compare Models", variant="primary", size="lg")

                with gr.Row():
                    output_a = gr.Image(label="Model A (Baseline)", height=350)
                    output_b = gr.Image(label="Model B (Augmented)", height=350)

                output_comparison = gr.Markdown(label="Comparison Results")

                compare_btn.click(
                    compare_models,
                    inputs=[input_image_compare, conf_compare, perturbation_compare],
                    outputs=[output_a, output_b, output_comparison]
                )

            # Tab 3: Robustness Test
            with gr.TabItem("🧪 Robustness Test"):
                gr.Markdown(
                    """
                    ### Test model robustness across environmental conditions

                    This test runs both models on your image under three conditions:
                    1. **Clean** - Original image
                    2. **Snow** - Simulated snow/winter conditions
                    3. **Fog/Smoke** - Simulated fog or smoke from fires
                    """
                )

                with gr.Row():
                    with gr.Column(scale=1):
                        input_image_robust = gr.Image(
                            label="Upload Thermal Image",
                            type="numpy",
                            height=300
                        )
                        conf_robust = gr.Slider(
                            minimum=0.1, maximum=0.95, value=0.5, step=0.05,
                            label="Confidence Threshold"
                        )
                        robust_btn = gr.Button("🧪 Run Robustness Test", variant="primary", size="lg")

                gr.Markdown("#### Clean Condition")
                with gr.Row():
                    robust_clean_a = gr.Image(label="Model A - Clean", height=280)
                    robust_clean_b = gr.Image(label="Model B - Clean", height=280)

                gr.Markdown("#### Snow Condition")
                with gr.Row():
                    robust_snow_a = gr.Image(label="Model A - Snow", height=280)
                    robust_snow_b = gr.Image(label="Model B - Snow", height=280)

                gr.Markdown("#### Fog/Smoke Condition")
                with gr.Row():
                    robust_fog_a = gr.Image(label="Model A - Fog", height=280)
                    robust_fog_b = gr.Image(label="Model B - Fog", height=280)

                robust_summary = gr.Markdown(label="Robustness Analysis")

                robust_btn.click(
                    robustness_test,
                    inputs=[input_image_robust, conf_robust],
                    outputs=[
                        robust_clean_a, robust_clean_b,
                        robust_snow_a, robust_snow_b,
                        robust_fog_a, robust_fog_b,
                        robust_summary
                    ]
                )

            # Tab 4: About
            with gr.TabItem("ℹ️ About"):
                gr.Markdown(
                    """
                    ## About This Project

                    ### Problem Statement
                    Human detection in UAV (drone) thermal imagery is critical for Search and Rescue (SAR)
                    operations. However, environmental conditions like snow, fog, and smoke can significantly
                    degrade detection performance.

                    ### Our Approach
                    We trained two Faster R-CNN models with ResNet50-FPN backbones:

                    1. **Model A (Baseline)**: Standard training on clean thermal images
                    2. **Model B (Augmented)**: Training with synthetic SAR augmentations (snow, fog/smoke)

                    ### Dataset
                    - **HIT-UAV**: High-altitude Infrared Thermal Dataset
                    - 2,006 thermal images from UAV platforms
                    - Focus on person detection for SAR scenarios

                    ### Key Results
                    | Metric | Model A | Model B |
                    |--------|---------|---------|
                    | F1 (Clean) | 0.7808 | 0.7606 |
                    | F1 (Perturbed) | 0.6249 | 0.7029 |
                    | **F1 Drop** | **-0.1559** | **-0.0577** |

                    Model B shows **3x smaller performance drop** under adverse conditions!

                    ### Architecture
                    - **Backbone**: ResNet-50 with FPN (Feature Pyramid Network)
                    - **Detection Head**: Faster R-CNN
                    - **Input Size**: 512×512 pixels
                    - **Classes**: Person (binary detection)

                    ### Technology Stack
                    - PyTorch & TorchVision
                    - Gradio for the web interface
                    - OpenCV for image processing

                    ---

                    *Built for [Course Name] - Computer Vision Module Project*
                    """
                )

        # Footer
        gr.Markdown(
            """
            ---
            <center>

            **UAV Human Detection** | Powered by Faster R-CNN | [GitHub Repository](#)

            </center>
            """
        )

    return app


# Main entry point
if __name__ == "__main__":
    print("Starting UAV Human Detection App...")
    print(f"Device: {get_device()}")

    app = create_app()
    app.launch(
        share=False,
        server_name="0.0.0.0",
        server_port=7860,
    )
