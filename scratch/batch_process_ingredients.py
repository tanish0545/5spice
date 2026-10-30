import os
import glob
import numpy as np
from PIL import Image

def process_image(src_path, dest_png, dest_webp=None, dist_threshold=22.0, feather_width=12.0):
    img = Image.open(src_path).convert("RGBA")
    arr = np.array(img, dtype=np.float32)
    h, w, _ = arr.shape
    
    # 1. Sample corners to determine the exact studio background color
    corners = np.concatenate([
        arr[0:15, 0:15].reshape(-1, 4),
        arr[0:15, -15:].reshape(-1, 4),
        arr[-15:, 0:15].reshape(-1, 4),
        arr[-15:, -15:].reshape(-1, 4)
    ], axis=0)[:, :3]
    
    bg_color = np.median(corners, axis=0)
    print(f"[{os.path.basename(src_path)}] Estimated BG Color: {bg_color.round(1)}")
    
    # 2. Compute color distance from background
    rgb = arr[:, :, :3]
    diff = np.linalg.norm(rgb - bg_color, axis=2)
    
    # 3. Compute antialiased alpha channel
    # Under dist_threshold -> alpha is 0
    # Over dist_threshold + feather_width -> alpha is 255
    low = dist_threshold
    high = dist_threshold + feather_width
    
    alpha = np.clip((diff - low) / (high - low), 0.0, 1.0) * 255.0
    
    # 4. Color defringing / de-contamination
    # Edge pixels have a mix of foreground + background. Unblend them so edge is true foreground
    norm_alpha = alpha / 255.0
    safe_alpha = np.maximum(norm_alpha, 0.03)[:, :, np.newaxis]
    
    unblended_rgb = np.clip((rgb - (1.0 - safe_alpha) * bg_color) / safe_alpha, 0.0, 255.0)
    
    # Reassemble RGBA
    out = np.zeros_like(arr, dtype=np.uint8)
    out[:, :, :3] = np.where(norm_alpha[:, :, np.newaxis] > 0.02, unblended_rgb, rgb).astype(np.uint8)
    out[:, :, 3] = alpha.astype(np.uint8)
    
    result = Image.fromarray(out, mode="RGBA")
    
    # 5. Crop to bounding box
    bbox = result.getbbox()
    if bbox:
        pad = 8
        crop_box = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(w, bbox[2] + pad),
            min(h, bbox[3] + pad)
        )
        result = result.crop(crop_box)
    
    os.makedirs(os.path.dirname(dest_png), exist_ok=True)
    result.save(dest_png, "PNG", optimize=True)
    print(f"-> Saved PNG: {dest_png} ({result.size})")
    
    if dest_webp:
        result.save(dest_webp, "WEBP", quality=92, lossless=True)
        print(f"-> Saved WebP: {dest_webp}")

if __name__ == "__main__":
    brain_dir = r"C:\Users\tanis\.gemini\antigravity\brain\c91a1781-a86c-4ede-ac38-7070533495f0"
    out_dir = r"C:\Restaurant\public\images\ingredients"
    
    files = {
        "red-chilli": glob.glob(os.path.join(brain_dir, "red_sichuan_chilli_*.jpg")),
        "green-chilli": glob.glob(os.path.join(brain_dir, "green_chilli_*.jpg")),
        "garlic-clove": glob.glob(os.path.join(brain_dir, "garlic_cloves_peeled_*.jpg")),
        "ginger-slice": glob.glob(os.path.join(brain_dir, "sliced_ginger_*.jpg")),
        "spring-onion": glob.glob(os.path.join(brain_dir, "spring_onion_slices_*.jpg")),
    }
    
    for name, matches in files.items():
        if matches:
            src = sorted(matches)[-1] # pick latest
            png_dest = os.path.join(out_dir, f"{name}.png")
            webp_dest = os.path.join(out_dir, f"{name}.webp")
            process_image(src, png_dest, webp_dest)
        else:
            print(f"Warning: No match found for {name}")

