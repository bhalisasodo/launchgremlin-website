from PIL import Image
import numpy as np
import os

def clean_checkerboard(image_path, output_path):
    print(f"Processing {image_path}...")
    img = Image.open(image_path).convert("RGBA")
    arr = np.array(img, dtype=np.uint8)
    
    r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]
    
    # Detect checkerboard / white / light gray background pixels:
    # 1. Fully white / near-white: R, G, B > 230
    # 2. Typical checkerboard gray: R, G, B around 180-215 with low saturation (|R-G| < 10, |G-B| < 10)
    # 3. Checkerboard pattern detection near edges
    
    is_white = (r > 230) & (g > 230) & (b > 230)
    is_gray_checker = (r > 170) & (r < 225) & (g > 170) & (g < 225) & (b > 170) & (b < 225) & (np.abs(r.astype(int) - g.astype(int)) < 12) & (np.abs(g.astype(int) - b.astype(int)) < 12)
    
    # Flood-fill or edge distance mask to only remove background, preserving internal lights
    # Using scipy/skimage or breadth-first search from border pixels
    height, width = arr.shape[:2]
    bg_mask = np.zeros((height, width), dtype=bool)
    
    # Seeds from border
    border_pixels = []
    for x in range(width):
        border_pixels.append((0, x))
        border_pixels.append((height - 1, x))
    for y in range(height):
        border_pixels.append((y, 0))
        border_pixels.append((y, width - 1))
        
    from collections import deque
    queue = deque()
    
    for y, x in border_pixels:
        if is_white[y, x] or is_gray_checker[y, x] or a[y, x] < 10:
            bg_mask[y, x] = True
            queue.append((y, x))
            
    neighbors = [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]
    
    while queue:
        cy, cx = queue.popleft()
        for dy, dx in neighbors:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < height and 0 <= nx < width:
                if not bg_mask[ny, nx]:
                    if is_white[ny, nx] or is_gray_checker[ny, nx] or a[ny, nx] < 10:
                        bg_mask[ny, nx] = True
                        queue.append((ny, nx))
                        
    # Set background alpha to 0
    arr[bg_mask, 3] = 0
    
    cleaned = Image.fromarray(arr, "RGBA")
    cleaned.save(output_path, "PNG")
    print(f"Saved cleaned image to {output_path}")

clean_checkerboard("public/assets/laptop-transparent.png", "public/assets/laptop-transparent.png")
clean_checkerboard("public/assets/smartphones.png", "public/assets/smartphones.png")
