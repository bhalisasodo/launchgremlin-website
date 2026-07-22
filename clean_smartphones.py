from PIL import Image
import numpy as np

img = Image.open("public/assets/smartphones.png").convert("RGBA")
arr = np.array(img, dtype=np.uint8)

r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

# Print sample corner colors
print("Top-Left corner color:", r[0, 0], g[0, 0], b[0, 0], a[0, 0])
print("Bottom-Right corner color:", r[-1, -1], g[-1, -1], b[-1, -1], a[-1, -1])

# Isolate background (dark background or white background or gray background)
# If corner is black (r,g,b < 35) or near white (r,g,b > 220) or checkerboard
height, width = arr.shape[:2]
bg_mask = np.zeros((height, width), dtype=bool)

# Flood fill from 4 corners
from collections import deque
queue = deque([(0, 0), (0, width-1), (height-1, 0), (height-1, width-1)])
for y, x in queue:
    bg_mask[y, x] = True

corner_r, corner_g, corner_b = r[0, 0], g[0, 0], b[0, 0]

while queue:
    cy, cx = queue.popleft()
    for dy, dx in [(-1,0),(1,0),(0,-1),(0,1)]:
        ny, nx = cy + dy, cx + dx
        if 0 <= ny < height and 0 <= nx < width and not bg_mask[ny, nx]:
            # Compare color similarity to corner or check if background color
            diff = abs(int(r[ny, nx]) - int(corner_r)) + abs(int(g[ny, nx]) - int(corner_g)) + abs(int(b[ny, nx]) - int(corner_b))
            if diff < 45 or (r[ny, nx] < 25 and g[ny, nx] < 25 and b[ny, nx] < 25) or (r[ny, nx] > 230 and g[ny, nx] > 230 and b[ny, nx] > 230):
                bg_mask[ny, nx] = True
                queue.append((ny, nx))

arr[bg_mask, 3] = 0

cleaned = Image.fromarray(arr, "RGBA")
cleaned.save("public/assets/smartphones.png", "PNG")
print("Successfully cleaned smartphones.png background!")
