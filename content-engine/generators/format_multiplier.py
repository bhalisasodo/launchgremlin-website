"""
Format multiplier generating 4 distinct cross-platform assets from a single intake source.
"""

import os
import sys
from typing import Dict, Any, List

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from generators.hook_generator import HookGenerator
from generators.script_generator import ScriptGenerator

class FormatMultiplier:
    def __init__(self):
        self.hook_gen = HookGenerator()
        self.script_gen = ScriptGenerator()

    def multiply_formats(self, intake_item: Dict[str, Any], hook_index: int = 0) -> Dict[str, Any]:
        """
        Takes an intake item and produces 4 synchronized content formats in a single pass.
        """
        # Step 1: Generate Candidate Hooks
        candidate_hooks = self.hook_gen.generate_hooks(intake_item)
        if not candidate_hooks:
            chosen_hook = f"Why {intake_item.get('title')} matters for your business."
            chosen_rationale = "Default fallback hook"
        else:
            idx = min(hook_index, len(candidate_hooks) - 1)
            chosen_hook = candidate_hooks[idx]["hook"]
            chosen_rationale = candidate_hooks[idx]["rationale"]

        # Step 2: Generate Short-Form Video Talking Script & Captions
        video_package = self.script_gen.generate_script_and_captions(
            intake_item, chosen_hook, chosen_rationale
        )

        title = intake_item.get("title", "")
        content = intake_item.get("content", "")
        cta = video_package.get("cta", "")
        account = intake_item.get("account", "launchgremlin")

        # Step 3: Format 1 — Talking Clip Script
        format_talking_clip = {
            "format": "talking_clip",
            "title": f"Reel/TikTok: {title}",
            "hook": chosen_hook,
            "hook_rationale": chosen_rationale,
            "scenes": video_package["script_scenes"],
            "duration": video_package["video_duration_est"],
            "captions": video_package["captions"]
        }

        # Step 4: Format 2 — 5-Slide Carousel
        format_carousel = self._build_carousel_format(title, content, chosen_hook, cta, account)

        # Step 5: Format 3 — Before & After / Case Proof Visual Brief
        format_before_after = self._build_before_after_format(title, content, chosen_hook, cta, account)

        # Step 6: Format 4 — Caption-Only / Micro-Blog Text Post
        format_caption_only = self._build_caption_only_format(title, content, chosen_hook, cta, video_package["hashtags"])

        return {
            "intake_id": intake_item.get("id"),
            "pillar": intake_item.get("pillar"),
            "account": account,
            "title": title,
            "candidate_hooks": candidate_hooks,
            "chosen_hook": chosen_hook,
            "formats": {
                "talking_clip": format_talking_clip,
                "carousel": format_carousel,
                "before_after": format_before_after,
                "caption_only": format_caption_only
            },
            "cta": cta
        }

    def _build_carousel_format(self, title: str, content: str, hook: str, cta: str, account: str) -> Dict[str, Any]:
        return {
            "format": "carousel",
            "title": f"5-Slide Carousel: {title}",
            "slide_count": 5,
            "slides": [
                {
                    "slide_number": 1,
                    "type": "Hook / Cover",
                    "headline": hook,
                    "visual_cue": "Bold typography on dark high-contrast background with brand accent."
                },
                {
                    "slide_number": 2,
                    "type": "The Problem / Myth",
                    "headline": "What Most Small Businesses Get Wrong",
                    "body": "Spending thousands on bloated setups before testing if customers can easily reach them on mobile or WhatsApp.",
                    "visual_cue": "Side-by-side pain point checklist."
                },
                {
                    "slide_number": 3,
                    "type": "The Core Shift",
                    "headline": "The 3 Essentials That Actually Convert",
                    "body": f"1. Instant mobile loading.\n2. 1-click booking/inquiry.\n3. Transparent pricing & trust proof.\n\n{content[:120]}...",
                    "visual_cue": "Numbered icon layout with clean spacing."
                },
                {
                    "slide_number": 4,
                    "type": "Actionable Framework",
                    "headline": "How To Apply This Today",
                    "body": "Audit your current digital link in bio or site. Remove 3 unnecessary clicks between product discovery and contact.",
                    "visual_cue": "Flowchart diagram demonstrating simplified funnel."
                },
                {
                    "slide_number": 5,
                    "type": "CTA / Save for Later",
                    "headline": "Save This Guide 📌",
                    "body": f"Found this valuable? Save for later and share with a founder friend.\n\n👉 {cta}",
                    "visual_cue": "LaunchGremlin badge + save/share icon animation cue."
                }
            ]
        }

    def _build_before_after_format(self, title: str, content: str, hook: str, cta: str, account: str) -> Dict[str, Any]:
        return {
            "format": "before_after",
            "title": f"Visual Comparison & Proof: {title}",
            "before_state": {
                "label": "Traditional Approach (Slow & Expensive)",
                "description": "6-week agency turnaround, R15,000+ setup cost, cluttered desktop-centric pages with slow mobile response.",
                "badge": "❌ High Friction"
            },
            "after_state": {
                "label": "The LaunchGremlin Modern Standard",
                "description": "Rapid turnaround, ultra-clean mobile UX, direct WhatsApp/call-to-action integration, 99+ mobile score.",
                "badge": "⚡ High Conversion"
            },
            "visual_direction": "Split screen mockup showing a slow cluttered site vs a lightning-fast LaunchGremlin storefront on an iPhone.",
            "post_caption": f"Notice the difference? High conversion comes from clarity, not clutter.\n\n{hook}\n\n👉 {cta}"
        }

    def _build_caption_only_format(self, title: str, content: str, hook: str, cta: str, hashtags: List[str]) -> Dict[str, Any]:
        body_text = (
            f"{hook}\n\n"
            f"Here are 3 truths every South African business owner needs to remember:\n\n"
            f"1. Your customers are 80%+ on mobile phones — if your site takes 4 seconds to load, they bounce.\n"
            f"2. Trust is built by clear pricing, real local reviews, and effortless contact.\n"
            f"3. Simplicity always outperforms unnecessary animations and bloated code.\n\n"
            f"Key Takeaway: {content[:200]}...\n\n"
            f"💡 {cta}\n\n"
            f"{' '.join(hashtags)}"
        )
        return {
            "format": "caption_only",
            "title": f"High-Engagement Post: {title}",
            "text": body_text,
            "recommended_platforms": ["LinkedIn", "Instagram", "Facebook"]
        }
