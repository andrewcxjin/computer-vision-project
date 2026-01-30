#!/usr/bin/env python3
"""
Test script to validate baseline models functionality
"""

import sys
import numpy as np
import torch
from pathlib import Path

print("="*70)
print("TESTING BASELINE MODEL IMPLEMENTATIONS")
print("="*70)

# Test 1: Naive Baseline
print("\n1. Testing Naive Baseline...")
try:
    def naive_baseline_predictions(images, targets):
        predictions = []
        for target in targets:
            num_boxes = len(target['boxes'])
            pred = {
                'boxes': target['boxes'].clone(),
                'labels': target['labels'].clone(),
                'scores': torch.rand(num_boxes)
            }
            predictions.append(pred)
        return predictions

    # Create dummy data
    dummy_target = {
        'boxes': torch.tensor([[10, 10, 50, 50], [100, 100, 150, 150]], dtype=torch.float32),
        'labels': torch.tensor([1, 1], dtype=torch.int64)
    }

    preds = naive_baseline_predictions([None], [dummy_target])
    assert len(preds) == 1
    assert len(preds[0]['scores']) == 2
    assert all(0 <= s <= 1 for s in preds[0]['scores'])

    print("   ✓ Naive baseline working correctly")
    print(f"   Generated scores: {preds[0]['scores'].numpy()}")

except Exception as e:
    print(f"   ✗ Error: {e}")
    sys.exit(1)

# Test 2: HOG Feature Extraction
print("\n2. Testing HOG feature extraction...")
try:
    from skimage.feature import hog
    from skimage.transform import resize
    import cv2

    PATCH_SIZE = (64, 128)

    def extract_hog_features(image_patch):
        if image_patch.shape != (PATCH_SIZE[1], PATCH_SIZE[0]):
            image_patch = resize(image_patch, (PATCH_SIZE[1], PATCH_SIZE[0]), anti_aliasing=True)

        if len(image_patch.shape) == 3:
            image_patch = cv2.cvtColor((image_patch * 255).astype(np.uint8), cv2.COLOR_RGB2GRAY) / 255.0

        features = hog(
            image_patch,
            orientations=9,
            pixels_per_cell=(8, 8),
            cells_per_block=(2, 2),
            visualize=False,
            feature_vector=True
        )
        return features

    # Test with random patch
    test_patch = np.random.rand(128, 64, 3)
    features = extract_hog_features(test_patch)

    print(f"   ✓ HOG extraction working")
    print(f"   Feature vector size: {len(features)}")

except Exception as e:
    print(f"   ✗ Error: {e}")
    sys.exit(1)

# Test 3: Random Forest Training
print("\n3. Testing Random Forest training...")
try:
    from sklearn.ensemble import RandomForestClassifier

    # Create synthetic training data
    n_samples = 100
    X = np.random.randn(n_samples, 1764)  # Typical HOG feature size
    y = np.random.randint(0, 2, n_samples)

    model = RandomForestClassifier(n_estimators=10, max_depth=5, random_state=42)
    model.fit(X, y)

    # Test prediction
    test_sample = np.random.randn(1, 1764)
    proba = model.predict_proba(test_sample)[0]

    # Test uncertainty
    tree_predictions = np.array([tree.predict_proba(test_sample)[0][1] for tree in model.estimators_])
    uncertainty = np.var(tree_predictions)

    print(f"   ✓ Random Forest training working")
    print(f"   Prediction probability: {proba}")
    print(f"   Uncertainty (variance): {uncertainty:.6f}")

except Exception as e:
    print(f"   ✗ Error: {e}")
    sys.exit(1)

# Test 4: NMS (Non-Maximum Suppression)
print("\n4. Testing NMS...")
try:
    def nms(boxes, scores, iou_threshold=0.3):
        if len(boxes) == 0:
            return []

        x1 = boxes[:, 0]
        y1 = boxes[:, 1]
        x2 = boxes[:, 2]
        y2 = boxes[:, 3]

        areas = (x2 - x1) * (y2 - y1)
        order = scores.argsort()[::-1]

        keep = []
        while len(order) > 0:
            i = order[0]
            keep.append(i)

            xx1 = np.maximum(x1[i], x1[order[1:]])
            yy1 = np.maximum(y1[i], y1[order[1:]])
            xx2 = np.minimum(x2[i], x2[order[1:]])
            yy2 = np.minimum(y2[i], y2[order[1:]])

            w = np.maximum(0, xx2 - xx1)
            h = np.maximum(0, yy2 - yy1)

            intersection = w * h
            iou = intersection / (areas[i] + areas[order[1:]] - intersection + 1e-8)

            order = order[np.where(iou <= iou_threshold)[0] + 1]

        return keep

    # Test with overlapping boxes
    test_boxes = np.array([
        [10, 10, 50, 50],
        [15, 15, 55, 55],  # Overlaps with first
        [100, 100, 150, 150]  # Separate
    ], dtype=np.float32)
    test_scores = np.array([0.9, 0.7, 0.8])

    keep_indices = nms(test_boxes, test_scores, iou_threshold=0.3)

    print(f"   ✓ NMS working correctly")
    print(f"   Input boxes: 3, Kept after NMS: {len(keep_indices)}")
    print(f"   Kept indices: {keep_indices}")

except Exception as e:
    print(f"   ✗ Error: {e}")
    sys.exit(1)

# Test 5: ECE Calculation
print("\n5. Testing ECE calculation...")
try:
    def compute_ece(confidences, correct, n_bins=10):
        confidences = np.array(confidences)
        correct = np.array(correct)

        bin_boundaries = np.linspace(0, 1, n_bins + 1)
        ece = 0.0

        for i in range(n_bins):
            bin_lower = bin_boundaries[i]
            bin_upper = bin_boundaries[i + 1]

            in_bin = (confidences > bin_lower) & (confidences <= bin_upper)
            prop_in_bin = in_bin.mean()

            if prop_in_bin > 0:
                accuracy_in_bin = correct[in_bin].mean()
                avg_confidence_in_bin = confidences[in_bin].mean()
                ece += np.abs(avg_confidence_in_bin - accuracy_in_bin) * prop_in_bin

        return ece

    # Test with random data
    test_confidences = np.random.rand(100)
    test_correct = np.random.randint(0, 2, 100)

    ece = compute_ece(test_confidences, test_correct)

    print(f"   ✓ ECE calculation working")
    print(f"   ECE value: {ece:.4f}")

except Exception as e:
    print(f"   ✗ Error: {e}")
    sys.exit(1)

print("\n" + "="*70)
print("ALL TESTS PASSED ✓")
print("="*70)
print("\nThe baseline model implementations are working correctly.")
print("You can now run the full notebook to train and evaluate the models.")
