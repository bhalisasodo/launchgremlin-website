import os
from PIL import Image, ImageFilter, ImageDraw
import numpy as np

def create_og_image():
    # 1. Canvas Dimensions and Background
    width, height = 1200, 630
    bg_color = (0, 0, 0)  # Pure solid black #000000
    
    # Solid black canvas (RGBA)
    base = Image.new("RGBA", (width, height), bg_color + (255,))
    
    # Load mascot logo
    logo_path = os.path.join("public", "assets", "logo-icon-transparent.png")
    if not os.path.exists(logo_path):
        logo_path = os.path.join("public", "assets", "logo-transparent.png")
    
    logo_raw = Image.open(logo_path).convert("RGBA")
    
    # Get exact bounding box of the logo mascot to eliminate blank transparent padding in source file
    bbox = logo_raw.getbbox()
    if bbox:
        logo_cropped = logo_raw.crop(bbox)
    else:
        logo_cropped = logo_raw
        
    orig_w, orig_h = logo_cropped.size
    aspect_ratio = orig_w / orig_h
    
    # 2. Target Mascot Sizing with ~17.5% vertical padding (15-20% range)
    # Height of canvas is 630px. 17.5% padding on top & bottom = ~110px -> Mascot height = 410px.
    target_h = 410
    target_w = int(target_h * aspect_ratio)
    
    logo_resized = logo_cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Center position
    pos_x = (width - target_w) // 2
    pos_y = (height - target_h) // 2
    
    # 3. Create Ambient Glow Layers
    cx, cy = width // 2, height // 2
    
    ambient_glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(ambient_glow)
    
    # LaunchGremlin vivid neon green glow (#34D399 / #10B981)
    glow_color = (52, 211, 153)
    
    # Vibrant radial background glow centered behind logo
    max_rx = 450
    max_ry = 320
    steps = 150
    for i in range(steps, 0, -1):
        ratio = i / steps
        rx = max_rx * ratio
        ry = max_ry * ratio
        # Alpha curve for smooth neon glow on pure black
        alpha = int(95 * (1 - (ratio ** 1.6)))
        glow_draw.ellipse(
            [cx - rx, cy - ry, cx + rx, cy + ry],
            fill=(glow_color[0], glow_color[1], glow_color[2], alpha)
        )
    
    # Apply Gaussian blur for soft aura
    ambient_glow = ambient_glow.filter(ImageFilter.GaussianBlur(radius=55))
    
    # Contour glow directly surrounding mascot silhouette
    logo_alpha = logo_resized.split()[3]
    green_mask = Image.new("RGBA", (target_w, target_h), glow_color + (255,))
    green_mask.putalpha(logo_alpha)
    
    logo_glow_canvas = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    logo_glow_canvas.paste(green_mask, (pos_x, pos_y), green_mask)
    logo_glow_canvas = logo_glow_canvas.filter(ImageFilter.GaussianBlur(radius=35))
    
    # Adjust contour glow opacity
    glow_arr = np.array(logo_glow_canvas)
    glow_arr[:, :, 3] = (glow_arr[:, :, 3].astype(float) * 0.65).astype(np.uint8)
    logo_glow_canvas = Image.fromarray(glow_arr)
    
    # Composite background + ambient glow + contour glow
    base = Image.alpha_composite(base, ambient_glow)
    base = Image.alpha_composite(base, logo_glow_canvas)
    
    # 4. Composite Crisp Logo on top
    base.paste(logo_resized, (pos_x, pos_y), logo_resized)
    
    # 5. Convert to solid RGB PNG (true solid black background #000000)
    final_rgb = Image.new("RGB", (width, height), bg_color)
    final_rgb.paste(base, (0, 0))
    
    # Save to public/og-image.png and public/assets/og-image.png
    os.makedirs("public", exist_ok=True)
    os.makedirs(os.path.join("public", "assets"), exist_ok=True)
    
    output_path = os.path.join("public", "og-image.png")
    output_assets_path = os.path.join("public", "assets", "og-image.png")
    
    final_rgb.save(output_path, "PNG", optimize=True)
    final_rgb.save(output_assets_path, "PNG", optimize=True)
    print(f"Successfully generated {output_path} ({width}x{height}) with solid black #000000 background and neon-green glow.")
    
    if os.path.exists("dist"):
        dist_path = os.path.join("dist", "og-image.png")
        dist_assets_path = os.path.join("dist", "assets", "og-image.png")
        os.makedirs(os.path.join("dist", "assets"), exist_ok=True)
        final_rgb.save(dist_path, "PNG", optimize=True)
        final_rgb.save(dist_assets_path, "PNG", optimize=True)
        print("Updated dist og-image.png copies.")

if __name__ == "__main__":
    create_og_image()
