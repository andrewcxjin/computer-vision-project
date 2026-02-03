#!/usr/bin/env python3
"""
Setup script for UAV Human Detection project.
Downloads data, builds features, and optionally trains models.
"""

import subprocess
import sys
import os
from pathlib import Path


def install_requirements():
    """Install required packages."""
    print("Installing requirements...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
    print("Requirements installed successfully.")


def download_dataset():
    """Download HIT-UAV dataset from Kaggle."""
    data_dir = Path("data/raw")
    data_dir.mkdir(parents=True, exist_ok=True)

    print("Downloading HIT-UAV dataset...")
    print("Note: Requires Kaggle API credentials (~/.kaggle/kaggle.json)")

    try:
        subprocess.run([
            "kaggle", "datasets", "download", "-d",
            "pandrii000/hituav-a-highaltitude-infrared-thermal-dataset",
            "-p", str(data_dir)
        ], check=True)

        # Extract
        import zipfile
        zip_path = data_dir / "hituav-a-highaltitude-infrared-thermal-dataset.zip"
        if zip_path.exists():
            with zipfile.ZipFile(zip_path, 'r') as zf:
                zf.extractall(data_dir)
            zip_path.unlink()
            print("Dataset downloaded and extracted successfully.")
    except Exception as e:
        print(f"Error downloading dataset: {e}")
        print("Please download manually from: https://www.kaggle.com/datasets/pandrii000/hituav-a-highaltitude-infrared-thermal-dataset")


def create_directories():
    """Create project directory structure."""
    directories = [
        "data/raw",
        "data/processed",
        "data/outputs",
        "data/examples",
        "models",
        "scripts",
        "notebooks"
    ]

    for dir_path in directories:
        Path(dir_path).mkdir(parents=True, exist_ok=True)
        print(f"Created: {dir_path}/")


def setup_examples():
    """Copy example images to data/examples if available."""
    raw_images = Path("data/raw/images")
    examples_dir = Path("data/examples")

    if raw_images.exists():
        import shutil
        images = list(raw_images.glob("*.jpg"))[:3]
        for i, img in enumerate(images):
            dest = examples_dir / f"thermal_sample_{i+1}.jpg"
            shutil.copy(img, dest)
            print(f"Copied example: {dest}")


def main():
    """Main setup function."""
    import argparse

    parser = argparse.ArgumentParser(description="Setup UAV Human Detection project")
    parser.add_argument("--install", action="store_true", help="Install requirements")
    parser.add_argument("--download", action="store_true", help="Download dataset")
    parser.add_argument("--all", action="store_true", help="Run full setup")

    args = parser.parse_args()

    print("=" * 60)
    print("UAV Human Detection - Project Setup")
    print("=" * 60)

    # Always create directories
    create_directories()

    if args.all or args.install:
        install_requirements()

    if args.all or args.download:
        download_dataset()
        setup_examples()

    print("\n" + "=" * 60)
    print("Setup complete!")
    print("=" * 60)
    print("\nNext steps:")
    print("1. Run training notebook: notebooks/uav_human_detection.ipynb")
    print("2. Or run the app: python main.py")
    print("3. Models should be in: models/")


if __name__ == "__main__":
    main()
