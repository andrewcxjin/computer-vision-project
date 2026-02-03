"""
SAR (Search and Rescue) Augmentations for thermal/infrared UAV imagery.
Simulates adverse environmental conditions: snow, fog/smoke.
"""

import numpy as np
import cv2
from typing import Tuple


class SnowEffect:
    """
    Realistic snow effect - ground snow coverage with minimal falling snow.
    Simulates winter conditions that make human detection challenging.
    """

    def __init__(self, snow_coef: float = 0.6):
        """
        Args:
            snow_coef: Intensity of snow effect (0.0-1.0)
        """
        self.snow_coef = snow_coef

    def __call__(self, img: np.ndarray) -> np.ndarray:
        """Apply snow effect to image."""
        h, w = img.shape[:2]

        # Convert grayscale to BGR if needed
        if len(img.shape) == 2:
            img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)

        result = img.astype(np.float32)

        # Create snow ground texture using multi-scale noise
        # Large patches (main snow coverage)
        large_noise = cv2.resize(
            np.random.randn(h // 20, w // 20).astype(np.float32),
            (w, h),
            interpolation=cv2.INTER_CUBIC
        )
        large_noise = cv2.GaussianBlur(large_noise, (21, 21), 0)

        # Medium details (snow drifts)
        medium_noise = cv2.resize(
            np.random.randn(h // 8, w // 8).astype(np.float32),
            (w, h),
            interpolation=cv2.INTER_CUBIC
        )
        medium_noise = cv2.GaussianBlur(medium_noise, (11, 11), 0)

        # Fine details (snow texture)
        fine_noise = cv2.resize(
            np.random.randn(h // 4, w // 4).astype(np.float32),
            (w, h),
            interpolation=cv2.INTER_CUBIC
        )
        fine_noise = cv2.GaussianBlur(fine_noise, (5, 5), 0)

        # Combine scales
        snow_texture = 0.5 * large_noise + 0.3 * medium_noise + 0.2 * fine_noise

        # Normalize to 0-1
        snow_texture = (snow_texture - snow_texture.min()) / (snow_texture.max() - snow_texture.min() + 1e-8)

        # Threshold to create snow patches (not uniform coverage)
        snow_mask = np.clip((snow_texture - 0.3) * 2, 0, 1)
        snow_mask = snow_mask ** 0.7

        # Apply white snow to ground
        snow_color = 240
        for c in range(3):
            snow_layer = result[:, :, c] * (1 - snow_mask * self.snow_coef) + snow_color * snow_mask * self.snow_coef
            result[:, :, c] = snow_layer

        # Add minimal falling snow (sparse)
        num_flakes = int(self.snow_coef * 800)
        for _ in range(num_flakes):
            x = np.random.randint(0, w)
            y = np.random.randint(0, h)
            radius = np.random.randint(1, 3)
            brightness = np.random.randint(200, 255)
            cv2.circle(result, (x, y), radius, (brightness, brightness, brightness), -1)

        # Slight blur for atmospheric effect
        result = cv2.GaussianBlur(result.astype(np.uint8), (3, 3), 0)

        return result


class SmokeFireEffect:
    """
    Dense white/gray smoke clouds - foggy appearance.
    Simulates fire/smoke conditions in search and rescue scenarios.
    """

    def __init__(self, smoke_intensity: float = 0.7):
        """
        Args:
            smoke_intensity: Intensity of smoke/fog effect (0.0-1.0)
        """
        self.smoke_intensity = smoke_intensity

    def __call__(self, img: np.ndarray) -> np.ndarray:
        """Apply smoke/fog effect to image."""
        h, w = img.shape[:2]

        # Convert grayscale to BGR if needed
        if len(img.shape) == 2:
            img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)

        result = img.astype(np.float32)

        # Create dense white-gray fog
        fog = np.ones((h, w, 3), dtype=np.float32) * 200

        # Add variation with noise
        noise = np.random.randn(h, w).astype(np.float32)
        noise = cv2.GaussianBlur(noise, (51, 51), 0)
        noise = (noise - noise.min()) / (noise.max() - noise.min() + 1e-8)

        # Apply noise to create patchy fog
        for c in range(3):
            fog[:, :, c] = 180 + noise * 60

        # Heavy fog overlay
        alpha = self.smoke_intensity * 0.6
        result = cv2.addWeighted(result, 1 - alpha, fog, alpha, 0)

        # Additional blur for foggy look
        result = cv2.GaussianBlur(result.astype(np.uint8), (7, 7), 0)

        return result


def apply_snow(img: np.ndarray, intensity: float = 0.7) -> np.ndarray:
    """
    Apply realistic ground snow effect.

    Args:
        img: Input image (BGR format)
        intensity: Snow intensity (0.0-1.0)

    Returns:
        Augmented image with snow effect
    """
    effect = SnowEffect(snow_coef=intensity)
    return effect(img)


def apply_smoke(img: np.ndarray, intensity: float = 0.75) -> np.ndarray:
    """
    Apply dense fog/smoke effect.

    Args:
        img: Input image (BGR format)
        intensity: Smoke/fog intensity (0.0-1.0)

    Returns:
        Augmented image with smoke/fog effect
    """
    effect = SmokeFireEffect(smoke_intensity=intensity)
    return effect(img)


def apply_random_perturbation(img: np.ndarray) -> Tuple[np.ndarray, str]:
    """
    Apply random environmental perturbation.

    Args:
        img: Input image (BGR format)

    Returns:
        Tuple of (augmented_image, augmentation_type)
    """
    aug_type = np.random.choice(['snow', 'smoke'])

    if aug_type == 'snow':
        intensity = np.random.uniform(0.4, 0.7)
        return apply_snow(img, intensity), 'snow'
    else:
        intensity = np.random.uniform(0.5, 0.75)
        return apply_smoke(img, intensity), 'fog/smoke'
