import os
import cv2
import numpy as np
from PIL import Image

out_dir = r"C:\Restaurant\public\images\ingredients"

# 1. Split garlic-clove.png into single clove and pair/alternate
garlic_img = Image.open(os.path.join(out_dir, "garlic-clove.png"))
garlic_arr = np.array(garlic_img)
alpha = garlic_arr[:, :, 3]
num, labels, stats, centroids = cv2.connectedComponentsWithStats((alpha > 50).astype(np.uint8))

large_components = []
for i in range(1, num):
    if stats[i, cv2.CC_STAT_AREA] > 20000:
        large_components.append((i, stats[i, cv2.CC_STAT_AREA]))

large_components.sort(key=lambda x: x[1], reverse=True)
print(f"Garlic components found: {len(large_components)}")

for idx, (comp_id, area) in enumerate(large_components):
    mask = (labels == comp_id)
    comp_arr = np.zeros_like(garlic_arr)
    comp_arr[mask] = garlic_arr[mask]
    
    comp_img = Image.fromarray(comp_arr, mode="RGBA")
    bbox = comp_img.getbbox()
    if bbox:
        pad = 6
        crop_box = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(comp_img.width, bbox[2] + pad),
            min(comp_img.height, bbox[3] + pad)
        )
        cropped = comp_img.crop(crop_box)
        name = "garlic-clove-1.png" if idx == 0 else "garlic-clove-2.png"
        cropped.save(os.path.join(out_dir, name), "PNG", optimize=True)
        print(f"Saved {name}: {cropped.size}")

# 2. Split ginger-slice.png
ginger_img = Image.open(os.path.join(out_dir, "ginger-slice.png"))
ginger_arr = np.array(ginger_img)
alpha = ginger_arr[:, :, 3]
num, labels, stats, centroids = cv2.connectedComponentsWithStats((alpha > 50).astype(np.uint8))

large_components = []
for i in range(1, num):
    if stats[i, cv2.CC_STAT_AREA] > 30000:
        large_components.append((i, stats[i, cv2.CC_STAT_AREA]))

large_components.sort(key=lambda x: x[1], reverse=True)
print(f"Ginger components found: {len(large_components)}")

for idx, (comp_id, area) in enumerate(large_components):
    mask = (labels == comp_id)
    comp_arr = np.zeros_like(ginger_arr)
    comp_arr[mask] = ginger_arr[mask]
    
    comp_img = Image.fromarray(comp_arr, mode="RGBA")
    bbox = comp_img.getbbox()
    if bbox:
        pad = 6
        crop_box = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(comp_img.width, bbox[2] + pad),
            min(comp_img.height, bbox[3] + pad)
        )
        cropped = comp_img.crop(crop_box)
        name = "ginger-piece-1.png" if idx == 0 else "ginger-piece-2.png"
        cropped.save(os.path.join(out_dir, name), "PNG", optimize=True)
        print(f"Saved {name}: {cropped.size}")

# 3. Split spring-onion.png to extract individual scallion curls/rings
onion_img = Image.open(os.path.join(out_dir, "spring-onion.png"))
onion_arr = np.array(onion_img)
alpha = onion_arr[:, :, 3]
num, labels, stats, centroids = cv2.connectedComponentsWithStats((alpha > 50).astype(np.uint8))

large_components = []
for i in range(1, num):
    if stats[i, cv2.CC_STAT_AREA] > 10000:
        large_components.append((i, stats[i, cv2.CC_STAT_AREA]))

large_components.sort(key=lambda x: x[1], reverse=True)
print(f"Spring onion components found: {len(large_components)}")

for idx, (comp_id, area) in enumerate(large_components[:3]):
    mask = (labels == comp_id)
    comp_arr = np.zeros_like(onion_arr)
    comp_arr[mask] = onion_arr[mask]
    
    comp_img = Image.fromarray(comp_arr, mode="RGBA")
    bbox = comp_img.getbbox()
    if bbox:
        pad = 6
        crop_box = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(comp_img.width, bbox[2] + pad),
            min(comp_img.height, bbox[3] + pad)
        )
        cropped = comp_img.crop(crop_box)
        name = f"scallion-{idx+1}.png"
        cropped.save(os.path.join(out_dir, name), "PNG", optimize=True)
        print(f"Saved {name}: {cropped.size}")

