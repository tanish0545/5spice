import os
from PIL import Image

ing_dir = r"C:\Restaurant\public\images\ingredients"
files = [
    "red-chilli.png",
    "green-chilli.png",
    "garlic-clove.png",
    "ginger-slice.png",
    "scallion-1.png",
    "scallion-2.png",
    "scallion-3.png",
    "garlic-cluster.png",
]

for f in files:
    path = os.path.join(ing_dir, f)
    if not os.path.exists(path):
        continue
    img = Image.open(path).convert("RGBA")
    
    # Calculate aspect ratio resize with max dimension 280px (crisp retina)
    max_dim = 280
    w, h = img.size
    scale = max_dim / max(w, h)
    new_w = int(round(w * scale))
    new_h = int(round(h * scale))
    
    resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Save optimized PNG
    resized.save(path, "PNG", optimize=True)
    
    # Also save WebP version
    webp_path = os.path.splitext(path)[0] + ".webp"
    resized.save(webp_path, "WEBP", quality=90, method=6)
    
    print(f"Optimized {f}: original ({w}x{h}) -> ({new_w}x{new_h}), PNG size: {os.path.getsize(path)/1024:.1f} KB, WebP size: {os.path.getsize(webp_path)/1024:.1f} KB")

