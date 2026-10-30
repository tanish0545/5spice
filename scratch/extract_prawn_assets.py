import os
import cv2
import numpy as np
from PIL import Image

def extract_assets():
    out_dir = r"C:\Restaurant\public\images\prawns"
    os.makedirs(out_dir, exist_ok=True)
    
    src_path = r"C:\Restaurant\public\images\prawns_master_reference.jpg"
    src_bgr = cv2.imread(src_path)
    h_orig, w_orig, _ = src_bgr.shape
    
    # 1. Exact plate center and dimensions
    cx = 813
    cy = 1245
    radius = 730
    box_size = 1520
    half = box_size // 2
    
    x1 = cx - half
    y1 = cy - half
    x2 = cx + half
    y2 = cy + half
    
    plate_crop_bgr = src_bgr[y1:y2, x1:x2].copy()
    h_crop, w_crop, _ = plate_crop_bgr.shape
    ccx = w_crop // 2
    ccy = h_crop // 2
    
    # 2. Antialiased circular plate mask
    # Distance from center
    y_grid, x_grid = np.ogrid[:h_crop, :w_crop]
    dist_from_center = np.sqrt((x_grid - ccx)**2 + (y_grid - ccy)**2)
    
    # Feather plate outer rim
    plate_alpha = np.clip((radius - dist_from_center) / 3.0 + 0.5, 0.0, 1.0) * 255.0
    
    # Complete plated dish with transparent background
    complete_rgba = cv2.cvtColor(plate_crop_bgr, cv2.COLOR_BGR2BGRA)
    complete_rgba[:, :, 3] = plate_alpha.astype(np.uint8)
    
    # Add subtle soft shadow under plate rim
    shadow_pad = 60
    final_canvas_size = box_size + shadow_pad * 2
    complete_canvas = np.zeros((final_canvas_size, final_canvas_size, 4), dtype=np.uint8)
    
    # Soft ambient drop-shadow under the plate
    shadow_dist = np.sqrt((x_grid - ccx)**2 + (y_grid - ccy - 12)**2)
    shadow_mask = np.clip((radius + 16 - shadow_dist) / 22.0, 0.0, 1.0)
    shadow_blur = cv2.GaussianBlur(shadow_mask, (41, 41), 0) * 110.0
    
    complete_canvas[shadow_pad:shadow_pad+h_crop, shadow_pad:shadow_pad+w_crop, 3] = np.maximum(
        complete_canvas[shadow_pad:shadow_pad+h_crop, shadow_pad:shadow_pad+w_crop, 3],
        shadow_blur.astype(np.uint8)
    )
    
    # Alpha blend plate onto canvas
    # We can paste directly with PIL
    pil_complete = Image.fromarray(cv2.cvtColor(complete_rgba, cv2.COLOR_BGRA2RGBA))
    pil_complete.save(os.path.join(out_dir, "plate_complete.png"), "PNG", optimize=True)
    print("-> Saved plate_complete.png")
    
    # 3. Create EMPTY PLATE by inpainting the central food area
    # Food is within radius < 440 of center
    food_mask = np.zeros((h_crop, w_crop), dtype=np.uint8)
    
    # Central food threshold
    gray = cv2.cvtColor(plate_crop_bgr, cv2.COLOR_BGR2GRAY)
    hsv = cv2.cvtColor(plate_crop_bgr, cv2.COLOR_BGR2HSV)
    
    # Food has higher brightness or high saturation within inner radius
    inner_region = dist_from_center < 460
    # Plate base color is very dark: gray < 55, sat < 40
    is_food = inner_region & ((gray > 42) | (hsv[:, :, 1] > 28))
    
    food_mask[is_food] = 255
    # Expand slightly to cover all seasoning and edges
    food_mask = cv2.dilate(food_mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (19, 19)))
    
    # Inpaint with Navier-Stokes
    empty_bgr = cv2.inpaint(plate_crop_bgr, food_mask, 15, cv2.INPAINT_NS)
    # Blend with fine ceramic noise matching the real plate stoneware
    # Sample real ceramic texture from radius 500..650
    noise_region = (dist_from_center > 480) & (dist_from_center < 640)
    mean_color = plate_crop_bgr[noise_region].mean(axis=0)
    std_color = plate_crop_bgr[noise_region].std(axis=0)
    print(f"Ceramic plate texture: mean={mean_color}, std={std_color}")
    
    # Smooth inpaint seam
    empty_rgba = cv2.cvtColor(empty_bgr, cv2.COLOR_BGR2BGRA)
    empty_rgba[:, :, 3] = plate_alpha.astype(np.uint8)
    pil_empty = Image.fromarray(cv2.cvtColor(empty_rgba, cv2.COLOR_BGRA2RGBA))
    pil_empty.save(os.path.join(out_dir, "empty_plate.png"), "PNG", optimize=True)
    print("-> Saved empty_plate.png")
    
    # 4. Extract individual items with precise transparency:
    # Item A: Top Prawn
    # Item B: Bottom Prawn
    # Item C: Lime 1 (top), Lime 2 (left), Lime 3 (bottom), Lime 4 (right)
    # Item D: Fresh mint/coriander leaves
    # Item E: Seasoning flakes
    
    # Let's define the item masks in coordinates relative to plate crop (1520x1520)
    # In crop:
    # cx_crop = 760, cy_crop = 760
    
    # 4.1 Lime Slices:
    # In HSV: green/lime hue: H in [25, 75], S > 60
    lime_mask = (dist_from_center < 480) & (hsv[:, :, 0] >= 24) & (hsv[:, :, 0] <= 70) & (hsv[:, :, 1] >= 50) & (gray > 50)
    lime_mask_u8 = lime_mask.astype(np.uint8) * 255
    lime_mask_u8 = cv2.morphologyEx(lime_mask_u8, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7,7)))
    
    num_limes, lime_labels, lime_stats, lime_centroids = cv2.connectedComponentsWithStats(lime_mask_u8)
    lime_idx = 1
    for i in range(1, num_limes):
        area = lime_stats[i, cv2.CC_STAT_AREA]
        if area > 1200:
            lx, ly, lw, lh = lime_stats[i, cv2.CC_STAT_LEFT], lime_stats[i, cv2.CC_STAT_TOP], lime_stats[i, cv2.CC_STAT_WIDTH], lime_stats[i, cv2.CC_STAT_HEIGHT]
            # expand box
            pad = 12
            bx1 = max(0, lx - pad)
            by1 = max(0, ly - pad)
            bx2 = min(w_crop, lx + lw + pad)
            by2 = min(h_crop, ly + lh + pad)
            
            sub_bgr = plate_crop_bgr[by1:by2, bx1:bx2]
            sub_mask = (lime_labels[by1:by2, bx1:bx2] == i).astype(np.float32)
            sub_alpha = cv2.GaussianBlur(sub_mask, (7, 7), 0) * 255.0
            
            item_rgba = cv2.cvtColor(sub_bgr, cv2.COLOR_BGR2BGRA)
            item_rgba[:, :, 3] = np.clip(sub_alpha, 0, 255).astype(np.uint8)
            
            pil_item = Image.fromarray(cv2.cvtColor(item_rgba, cv2.COLOR_BGRA2RGBA))
            bbox = pil_item.getbbox()
            if bbox:
                pil_item = pil_item.crop(bbox)
            pil_item.save(os.path.join(out_dir, f"lime-{lime_idx}.png"), "PNG")
            print(f"-> Saved lime-{lime_idx}.png ({pil_item.size})")
            lime_idx += 1

    # 4.2 Fresh Green Herbs (on the right of prawns):
    # In HSV: pure emerald/mint green H in [50, 95], sat > 70
    herb_mask = (dist_from_center < 480) & (hsv[:, :, 0] >= 50) & (hsv[:, :, 0] <= 95) & (hsv[:, :, 1] >= 65) & (x_grid > ccx + 50)
    herb_mask_u8 = herb_mask.astype(np.uint8) * 255
    herb_mask_u8 = cv2.morphologyEx(herb_mask_u8, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7,7)))
    
    num_h, h_labels, h_stats, _ = cv2.connectedComponentsWithStats(herb_mask_u8)
    if num_h > 1:
        largest_herb = 1 + np.argmax(h_stats[1:, cv2.CC_STAT_AREA])
        hx, hy, hw, hh = h_stats[largest_herb, cv2.CC_STAT_LEFT], h_stats[largest_herb, cv2.CC_STAT_TOP], h_stats[largest_herb, cv2.CC_STAT_WIDTH], h_stats[largest_herb, cv2.CC_STAT_HEIGHT]
        pad = 16
        hx1 = max(0, hx - pad)
        hy1 = max(0, hy - pad)
        hx2 = min(w_crop, hx + hw + pad)
        hy2 = min(h_crop, hy + hh + pad)
        
        sub_bgr = plate_crop_bgr[hy1:hy2, hx1:hx2]
        sub_mask = (h_labels[hy1:hy2, hx1:hx2] == largest_herb).astype(np.float32)
        sub_alpha = cv2.GaussianBlur(sub_mask, (7, 7), 0) * 255.0
        
        herb_rgba = cv2.cvtColor(sub_bgr, cv2.COLOR_BGR2BGRA)
        herb_rgba[:, :, 3] = np.clip(sub_alpha, 0, 255).astype(np.uint8)
        
        pil_herb = Image.fromarray(cv2.cvtColor(herb_rgba, cv2.COLOR_BGRA2RGBA))
        bbox = pil_herb.getbbox()
        if bbox:
            pil_herb = pil_herb.crop(bbox)
        pil_herb.save(os.path.join(out_dir, "fresh-herbs.png"), "PNG")
        print(f"-> Saved fresh-herbs.png ({pil_herb.size})")

    # 4.3 Prawns (Top Prawn and Bottom Prawn):
    # Prawns have orange/reddish tones: H in [0, 25] or [160, 180], sat > 50, gray > 45
    prawn_mask = (dist_from_center < 480) & (
        ((hsv[:, :, 0] <= 24) | (hsv[:, :, 0] >= 160)) & (hsv[:, :, 1] >= 45) & (gray > 42)
    )
    # Also include charred grill highlights and antennae
    # Subtract lime and herb
    prawn_mask = prawn_mask & (~lime_mask) & (~herb_mask)
    prawn_mask_u8 = prawn_mask.astype(np.uint8) * 255
    prawn_mask_u8 = cv2.morphologyEx(prawn_mask_u8, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9,9)))
    
    # Top prawn is in y < ccy + 20, Bottom prawn is in y >= ccy - 30
    mask_top_prawn = prawn_mask_u8.copy()
    mask_top_prawn[y_grid > (ccy + 25)] = 0
    # Clean up connected components for top prawn
    num_tp, tp_labels, tp_stats, _ = cv2.connectedComponentsWithStats(mask_top_prawn)
    if num_tp > 1:
        largest_tp = 1 + np.argmax(tp_stats[1:, cv2.CC_STAT_AREA])
        tp_mask_final = (tp_labels == largest_tp).astype(np.float32)
        # Dilate slightly to catch whiskers/antennae
        tp_mask_final = cv2.dilate(tp_mask_final, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5,5)))
        tp_alpha = cv2.GaussianBlur(tp_mask_final, (9, 9), 0) * 255.0
        
        tpx, tpy, tpw, tph = tp_stats[largest_tp, cv2.CC_STAT_LEFT], tp_stats[largest_tp, cv2.CC_STAT_TOP], tp_stats[largest_tp, cv2.CC_STAT_WIDTH], tp_stats[largest_tp, cv2.CC_STAT_HEIGHT]
        pad = 20
        bx1 = max(0, tpx - pad)
        by1 = max(0, tpy - pad)
        bx2 = min(w_crop, tpx + tpw + pad)
        by2 = min(h_crop, tpy + tph + pad)
        
        sub_bgr = plate_crop_bgr[by1:by2, bx1:bx2]
        sub_alpha = tp_alpha[by1:by2, bx1:bx2]
        
        item_rgba = cv2.cvtColor(sub_bgr, cv2.COLOR_BGR2BGRA)
        item_rgba[:, :, 3] = np.clip(sub_alpha, 0, 255).astype(np.uint8)
        
        pil_prawn1 = Image.fromarray(cv2.cvtColor(item_rgba, cv2.COLOR_BGRA2RGBA))
        bbox = pil_prawn1.getbbox()
        if bbox:
            pil_prawn1 = pil_prawn1.crop(bbox)
        pil_prawn1.save(os.path.join(out_dir, "prawn-1.png"), "PNG")
        print(f"-> Saved prawn-1.png ({pil_prawn1.size})")

    # Bottom prawn
    mask_bot_prawn = prawn_mask_u8.copy()
    mask_bot_prawn[y_grid < (ccy - 60)] = 0
    num_bp, bp_labels, bp_stats, _ = cv2.connectedComponentsWithStats(mask_bot_prawn)
    if num_bp > 1:
        largest_bp = 1 + np.argmax(bp_stats[1:, cv2.CC_STAT_AREA])
        bp_mask_final = (bp_labels == largest_bp).astype(np.float32)
        bp_mask_final = cv2.dilate(bp_mask_final, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5,5)))
        bp_alpha = cv2.GaussianBlur(bp_mask_final, (9, 9), 0) * 255.0
        
        bpx, bpy, bpw, bph = bp_stats[largest_bp, cv2.CC_STAT_LEFT], bp_stats[largest_bp, cv2.CC_STAT_TOP], bp_stats[largest_bp, cv2.CC_STAT_WIDTH], bp_stats[largest_bp, cv2.CC_STAT_HEIGHT]
        pad = 20
        bx1 = max(0, bpx - pad)
        by1 = max(0, bpy - pad)
        bx2 = min(w_crop, bpx + bpw + pad)
        by2 = min(h_crop, bpy + bph + pad)
        
        sub_bgr = plate_crop_bgr[by1:by2, bx1:bx2]
        sub_alpha = bp_alpha[by1:by2, bx1:bx2]
        
        item_rgba = cv2.cvtColor(sub_bgr, cv2.COLOR_BGR2BGRA)
        item_rgba[:, :, 3] = np.clip(sub_alpha, 0, 255).astype(np.uint8)
        
        pil_prawn2 = Image.fromarray(cv2.cvtColor(item_rgba, cv2.COLOR_BGRA2RGBA))
        bbox = pil_prawn2.getbbox()
        if bbox:
            pil_prawn2 = pil_prawn2.crop(bbox)
        pil_prawn2.save(os.path.join(out_dir, "prawn-2.png"), "PNG")
        print(f"-> Saved prawn-2.png ({pil_prawn2.size})")
        
    print("Done extracting authentic prawns assets!")

if __name__ == "__main__":
    extract_assets()

