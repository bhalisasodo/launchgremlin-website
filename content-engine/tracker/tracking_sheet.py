"""
Tracking sheet manager for auto-logging content assets and attributing performance data.
"""

import os
import csv
from datetime import datetime
from typing import Dict, List, Optional, Any

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TRACKING_CSV = os.path.join(BASE_DIR, "data", "tracking_sheet.csv")

FIELDNAMES = [
    "post_id",
    "timestamp",
    "pillar",
    "account",
    "format",
    "hook_used",
    "status",
    "views",
    "saves",
    "comments",
    "shares",
    "paid_spend",
    "paid_candidate",
    "notes"
]

class TrackingSheet:
    def __init__(self, csv_path: str = TRACKING_CSV):
        self.csv_path = csv_path
        os.makedirs(os.path.dirname(self.csv_path), exist_ok=True)
        self._ensure_header()

    def _ensure_header(self):
        if not os.path.exists(self.csv_path) or os.path.getsize(self.csv_path) == 0:
            with open(self.csv_path, "w", newline="", encoding="utf-8") as f:
                writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
                writer.writeheader()

    def log_asset(
        self,
        post_id: str,
        pillar: str,
        account: str,
        format_type: str,
        hook_used: str,
        status: str = "DRAFT",
        notes: str = ""
    ) -> Dict[str, Any]:
        row = {
            "post_id": post_id,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M"),
            "pillar": pillar,
            "account": account,
            "format": format_type,
            "hook_used": hook_used.replace("\n", " ").strip(),
            "status": status,
            "views": "0",
            "saves": "0",
            "comments": "0",
            "shares": "0",
            "paid_spend": "R0",
            "paid_candidate": "NO",
            "notes": notes
        }

        # Append to CSV
        with open(self.csv_path, "a", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
            writer.writerow(row)

        return row

    def log_multiplied_package(self, package: Dict[str, Any], status: str = "DRAFT") -> List[Dict[str, Any]]:
        intake_id = package.get("intake_id")
        pillar = package.get("pillar")
        account = package.get("account")
        chosen_hook = package.get("chosen_hook", "")
        formats = package.get("formats", {})

        logged_rows = []
        for fmt_key in formats.keys():
            post_sub_id = f"{intake_id}-{fmt_key.upper()[:4]}"
            logged = self.log_asset(
                post_id=post_sub_id,
                pillar=pillar,
                account=account,
                format_type=fmt_key,
                hook_used=chosen_hook,
                status=status,
                notes=f"Auto-generated from {intake_id}"
            )
            logged_rows.append(logged)

        return logged_rows

    def get_all_rows(self) -> List[Dict[str, str]]:
        if not os.path.exists(self.csv_path):
            return []
        with open(self.csv_path, "r", newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            return list(reader)

    def update_metrics(
        self,
        post_id: str,
        views: int,
        saves: int,
        comments: int,
        shares: int,
        paid_spend: str = "R0"
    ) -> bool:
        rows = self.get_all_rows()
        updated = False
        for row in rows:
            if row["post_id"].lower() == post_id.lower():
                row["views"] = str(views)
                row["saves"] = str(saves)
                row["comments"] = str(comments)
                row["shares"] = str(shares)
                row["paid_spend"] = paid_spend
                
                # Evaluation rule from 30/60/90 calendar:
                # Engagement rate (saves + shares) / max(views, 1) > 3% or saves > 20
                engagement_score = (saves * 2 + shares * 3 + comments) / max(views, 1)
                if saves >= 20 or engagement_score >= 0.05:
                    row["paid_candidate"] = "YES"
                else:
                    row["paid_candidate"] = "NO"
                updated = True
                break

        if updated:
            with open(self.csv_path, "w", newline="", encoding="utf-8") as f:
                writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
                writer.writeheader()
                writer.writerows(rows)

        return updated
