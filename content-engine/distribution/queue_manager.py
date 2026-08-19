"""
Queue and distribution manager for handling draft packages, review gates, and ready-to-post handoffs.
"""

import os
import json
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST_DIR = os.path.join(BASE_DIR, "distribution")
DRAFTS_DIR = os.path.join(DIST_DIR, "drafts")
APPROVED_DIR = os.path.join(DIST_DIR, "ready_to_post")

class QueueManager:
    def __init__(self):
        os.makedirs(DRAFTS_DIR, exist_ok=True)
        os.makedirs(APPROVED_DIR, exist_ok=True)

    def save_draft_package(self, package: Dict[str, Any], suggested_post_days_ahead: int = 1) -> str:
        account = package.get("account", "launchgremlin")
        intake_id = package.get("intake_id", "UNKNOWN")
        
        target_account_dir = os.path.join(DRAFTS_DIR, account)
        os.makedirs(target_account_dir, exist_ok=True)

        target_file = os.path.join(target_account_dir, f"{intake_id}.json")
        
        suggested_post_date = (datetime.now() + timedelta(days=suggested_post_days_ahead)).strftime("%Y-%m-%d 10:00 SAST")

        draft_data = {
            "intake_id": intake_id,
            "account": account,
            "pillar": package.get("pillar"),
            "title": package.get("title"),
            "status": "PENDING_REVIEW",
            "suggested_post_time": suggested_post_date,
            "created_at": datetime.now().isoformat(),
            "candidate_hooks": package.get("candidate_hooks", []),
            "chosen_hook": package.get("chosen_hook"),
            "formats": package.get("formats", {}),
            "cta": package.get("cta"),
            "review_notes": ""
        }

        with open(target_file, "w", encoding="utf-8") as f:
            json.dump(draft_data, f, indent=2, ensure_ascii=False)

        return target_file

    def list_drafts(self, status_filter: Optional[str] = None, account_filter: Optional[str] = None) -> List[Dict[str, Any]]:
        drafts = []
        for root, _, files in os.walk(DRAFTS_DIR):
            for file in files:
                if file.endswith(".json"):
                    filepath = os.path.join(root, file)
                    try:
                        with open(filepath, "r", encoding="utf-8") as f:
                            data = json.load(f)
                            if status_filter and data.get("status") != status_filter:
                                continue
                            if account_filter and data.get("account") != account_filter:
                                continue
                            data["_filepath"] = filepath
                            drafts.append(data)
                    except Exception:
                        pass
        return sorted(drafts, key=lambda x: x.get("created_at", ""), reverse=True)

    def get_draft(self, post_id: str) -> Optional[Dict[str, Any]]:
        for draft in self.list_drafts():
            if draft.get("intake_id", "").lower() == post_id.lower():
                return draft
        return None

    def approve_draft(self, post_id: str, reviewer_notes: str = "") -> Optional[str]:
        draft = self.get_draft(post_id)
        if not draft:
            return None

        draft["status"] = "APPROVED"
        draft["approved_at"] = datetime.now().isoformat()
        draft["review_notes"] = reviewer_notes

        # Save back to draft file
        with open(draft["_filepath"], "w", encoding="utf-8") as f:
            json.dump(draft, f, indent=2, ensure_ascii=False)

        # Generate Human-Friendly Ready-to-Post Markdown Brief in APPROVED_DIR
        account = draft["account"]
        out_account_dir = os.path.join(APPROVED_DIR, account)
        os.makedirs(out_account_dir, exist_ok=True)
        
        md_file = os.path.join(out_account_dir, f"{post_id}_READY_TO_POST.md")
        self._write_approved_markdown(draft, md_file)

        return md_file

    def _write_approved_markdown(self, draft: Dict[str, Any], filepath: str):
        formats = draft.get("formats", {})
        talking_clip = formats.get("talking_clip", {})
        carousel = formats.get("carousel", {})
        before_after = formats.get("before_after", {})
        caption_only = formats.get("caption_only", {})

        md = []
        md.append(f"# Ready-to-Post Content Package: {draft['intake_id']}")
        md.append(f"**Account:** {draft['account']} | **Pillar:** {draft['pillar']} | **Suggested Time:** {draft['suggested_post_time']}")
        md.append(f"**Status:** APPROVED ✅ | **Target Topic:** {draft['title']}")
        md.append("\n---\n")

        # 1. Talking Clip Script
        md.append("## 🎬 Format 1: Short-Form Video (Reels / TikTok)")
        md.append(f"**Hook (First 2s):** \"{talking_clip.get('hook')}\"")
        md.append(f"**Est. Duration:** {talking_clip.get('duration')}\n")
        md.append("### Script Breakdown:")
        for sc in talking_clip.get("scenes", []):
            md.append(f"- **Scene {sc.get('scene')}**")
            md.append(f"  - 🎥 *Visual:* {sc.get('visual')}")
            md.append(f"  - 🎙️ *Spoken:* {sc.get('audio_spoken')}")
            md.append(f"  - 📝 *On-Screen Text:* {sc.get('on_screen_text')}")
        
        md.append("\n### Video Captions:")
        caps = talking_clip.get("captions", {})
        md.append(f"**Instagram Reel Caption:**\n```\n{caps.get('instagram', '')}\n```")
        md.append(f"**TikTok Caption:**\n```\n{caps.get('tiktok', '')}\n```")
        md.append("\n---\n")

        # 2. Carousel
        md.append("## 📱 Format 2: 5-Slide Carousel Guide")
        md.append(f"**Carousel Title:** {carousel.get('title')}\n")
        for sl in carousel.get("slides", []):
            md.append(f"### Slide {sl.get('slide_number')}: {sl.get('type')}")
            md.append(f"**Headline:** {sl.get('headline')}")
            if sl.get("body"):
                md.append(f"**Body Copy:** {sl.get('body')}")
            md.append(f"🎨 *Visual Cue:* {sl.get('visual_cue')}\n")
        md.append("\n---\n")

        # 3. Before / After Visual Brief
        if before_after:
            md.append("## ⚖️ Format 3: Before & After Case Proof")
            b = before_after.get("before_state", {})
            a = before_after.get("after_state", {})
            md.append(f"- **Before ({b.get('badge', '')}):** {b.get('label')} — {b.get('description')}")
            md.append(f"- **After ({a.get('badge', '')}):** {a.get('label')} — {a.get('description')}")
            md.append(f"🎨 *Design Direction:* {before_after.get('visual_direction')}")
            md.append(f"\n**Caption:**\n```\n{before_after.get('post_caption')}\n```")
            md.append("\n---\n")

        # 4. Caption-Only Post
        if caption_only:
            md.append("## ✍️ Format 4: High-Engagement Text Post (LinkedIn / Meta Feed)")
            md.append(f"```\n{caption_only.get('text')}\n```")

        with open(filepath, "w", encoding="utf-8") as f:
            f.write("\n".join(md))
