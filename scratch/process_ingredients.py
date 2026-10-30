import os
import sys
import numpy as np
from PIL import Image, ImageFilter

def extract_cutout(input_path, output_path, bg_threshold=245, feather=3):
    """
    Extracts foreground from studio white background with smooth antialiased alpha,
    fringe decontamination (removing white halo), and crops to bounding box.
    """
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img, dtype=np.float32)
    
    r, g, b, _ = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    
    # Measure distance from pure white (255, 255, 255)
    # Background pixels have very high R, G, B
    min_rgb = np.minimum(np.minimum(r, g), b)
    
    # White background detection
    # Any pixel where min(R, G, B) >= 250 is definitely background
    # Between 220 and 250 is a smooth anti-aliased transition
    high_th = 252.0
    low_th = 215.0
    
    alpha = np.clip((high_th - min_rgb) / (high_th - low_th), 0.0, 1.0) * 255.0
    
    # For pixels that are fully opaque (min_rgb < low_th), alpha is 255
    alpha[min_rgb < low_th] = 255.0
    # For pixels that are pure background, alpha is 0
    alpha[min_rgb >= high_th] = 0.0
    
    # Defringe / Decontaminate:
    # Unblend white background from edge pixels so there is zero white halo
    norm_alpha = alpha / 255.0
    safe_alpha = np.maximum(norm_alpha, 0.02)
    
    # C_foreground = (C_observed - (1 - A) * 255) / A
    unmixed_r = np.clip((r - (1.0 - safe_alpha) * 255.0) / safe_alpha, 0.0, 255.0)
    unmixed_g = np.clip((g - (1.0 - safe_alpha) * 255.0) / safe_alpha, 0.0, 255.0)
    unmixed_b = np.clip((b - (1.0 - safe_alpha) * 255.0) / safe_alpha, 0.0, 255.0)
    
    # Construct RGBA output
    out_data = np.zeros_like(data, dtype=np.uint8)
    out_data[:, :, 0] = np.where(norm_alpha > 0.01, unmixed_r, r).astype(np.uint8)
    out_data[:, :, 1] = np.where(norm_alpha > 0.01, unmixed_g, g).astype(np.uint8)
    out_data[:, :, 2] = np.where(norm_alpha > 0.01, unmixed_b, b).astype(np.uint8)
    out_data[:, :, 3] = alpha.astype(np.uint8)
    
    result = Image.fromarray(out_data, mode="RGBA")
    
    # Bounding box crop
    bbox = result.getbbox()
    if bbox:
        # Add a tiny 6px margin
        w, h = result.size
        pad = 8
        crop_box = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(w, bbox[2] + pad),
            min(h, bbox[3] + pad)
        )
        result = result.crop(crop_box)
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    result.save(output_path, "PNG", optimize=True)
    print(f"Processed: {input_path} -> {output_path} ({result.size})")

if __name__ == "__main__":
    if len(sys.argv) >= 3:
        extract_cutout(sys.argv[1], sys.argv[2])

