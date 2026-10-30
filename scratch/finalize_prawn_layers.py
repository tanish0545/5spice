import cv2
import numpy as np
from PIL import Image
import os

def create_layers():
    out_dir = r"C:\Restaurant\public\images\prawns"
    os.makedirs(out_dir, exist_ok=True)
    
    orig = cv2.imread(os.path.join(out_dir, "plate_complete.png"))
    empty = cv2.imread(os.path.join(out_dir, "empty_plate.png"))
    h, w, _ = orig.shape
    
    # Precise difference mask
    diff = np.linalg.norm(orig.astype(np.float32) - empty.astype(np.float32), axis=2)
    alpha = np.clip((diff - 11.0) / 10.0, 0.0, 1.0)
    
    hsv = cv2.cvtColor(orig, cv2.COLOR_BGR2HSV)
    gray = cv2.cvtColor(orig, cv2.COLOR_BGR2GRAY)
    
    y_grid, x_grid = np.ogrid[:h, :w]
    
    # 1. HERBS (Mint / Coriander leaves on right)
    herb_mask = (x_grid > 1010) & (y_grid > 520) & (y_grid < 820) & (hsv[:, :, 0] >= 40) & (hsv[:, :, 0] <= 95) & (alpha > 0.1)
    herb_mask = cv2.dilate(herb_mask.astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7,7)))
    herb_alpha = alpha * herb_mask
    save_item(orig, herb_alpha, os.path.join(out_dir, "garnish_herbs.png"))
    
    # 2. LIMES
    # Lime color: H in [25, 75], sat > 40
    is_lime_color = (hsv[:, :, 0] >= 24) & (hsv[:, :, 0] <= 75) & (hsv[:, :, 1] >= 35) & (alpha > 0.1)
    
    # Top Lime
    top_lime_mask = is_lime_color & (y_grid < 650) & (x_grid > 450) & (x_grid < 850)
    top_lime_mask = cv2.dilate(top_lime_mask.astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5,5)))
    save_item(orig, alpha * top_lime_mask, os.path.join(out_dir, "lime_slice_top.png"))
    
    # Left Lime
    left_lime_mask = is_lime_color & (y_grid > 660) & (y_grid < 960) & (x_grid < 700)
    left_lime_mask = cv2.dilate(left_lime_mask.astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5,5)))
    save_item(orig, alpha * left_lime_mask, os.path.join(out_dir, "lime_slice_left.png"))
    
    # Bottom Lime
    bot_lime_mask = is_lime_color & (y_grid > 900) & (x_grid > 450) & (x_grid < 840)
    bot_lime_mask = cv2.dilate(bot_lime_mask.astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5,5)))
    save_item(orig, alpha * bot_lime_mask, os.path.join(out_dir, "lime_slice_bottom.png"))
    
    # Right Lime
    right_lime_mask = is_lime_color & (y_grid > 680) & (y_grid < 990) & (x_grid > 900) & (x_grid < 1180)
    right_lime_mask = cv2.dilate(right_lime_mask.astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5,5)))
    save_item(orig, alpha * right_lime_mask, os.path.join(out_dir, "lime_slice_right.png"))
    
    all_limes = top_lime_mask | left_lime_mask | bot_lime_mask | right_lime_mask
    
    # 3. PRAWNS
    # Non-lime, non-herb foreground pixels
    prawn_foreground = (alpha > 0.12) & (~all_limes.astype(bool)) & (~herb_mask.astype(bool))
    
    # Top Prawn: y < 815, head on right
    top_prawn_mask = prawn_foreground & (y_grid < 815) & (x_grid > 400) & (x_grid < 1200)
    top_prawn_mask = cv2.morphologyEx(top_prawn_mask.astype(np.uint8), cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9,9)))
    save_item(orig, alpha * top_prawn_mask, os.path.join(out_dir, "prawn_top.png"))
    
    # Bottom Prawn: y >= 680, body curled down and center
    bot_prawn_mask = prawn_foreground & (y_grid >= 680) & (x_grid > 500) & (x_grid < 1100)
    bot_prawn_mask = cv2.morphologyEx(bot_prawn_mask.astype(np.uint8), cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9,9)))
    save_item(orig, alpha * bot_prawn_mask, os.path.join(out_dir, "prawn_bottom.png"))
    
    # 4. Whole assembled dish on transparent background
    full_food_alpha = np.clip((diff - 8.0) / 10.0, 0.0, 1.0)
    save_item(orig, full_food_alpha, os.path.join(out_dir, "prawns_assembled_plated.png"))
    
    print("All layers extracted successfully!")

def save_item(bgr, alpha_mask, dest_path):
    rgba = cv2.cvtColor(bgr, cv2.COLOR_BGR2BGRA)
    rgba[:, :, 3] = np.clip(alpha_mask * 255.0, 0, 255).astype(np.uint8)
    
    pil_img = Image.fromarray(cv2.cvtColor(rgba, cv2.COLOR_BGRA2RGBA))
    bbox = pil_img.getbbox()
    if bbox:
        cropped = pil_img.crop(bbox)
        cropped.save(dest_path, "PNG", optimize=True)
        # Also save webp
        webp_path = dest_path.replace(".png", ".webp")
        cropped.save(webp_path, "WEBP", quality=92)
        print(f"-> {os.path.basename(dest_path)}: size={cropped.size}, bbox={bbox}")

if __name__ == "__main__":
    create_layers()

