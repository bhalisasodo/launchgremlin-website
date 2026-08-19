"""
Intake manager for registering, validating, and tagging raw content sources.
"""

import json
import os
import sys
from datetime import datetime
from typing import Dict, List, Optional

# Ensure parent directory is in python path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from config.pillars import get_pillar_config, PILLARS
from config.voices import get_voice_profile

DATA_DIR = os.path.join(BASE_DIR, "data")
REGISTRY_FILE = os.path.join(DATA_DIR, "intake_registry.json")

class IntakeManager:
    def __init__(self, registry_file: str = REGISTRY_FILE):
        self.registry_file = registry_file
        os.makedirs(os.path.dirname(self.registry_file), exist_ok=True)
        self._load_registry()

    def _load_registry(self):
        if os.path.exists(self.registry_file):
            try:
                with open(self.registry_file, "r", encoding="utf-8") as f:
                    self.registry = json.load(f)
            except Exception:
                self.registry = {"items": [], "counters": {}}
        else:
            self.registry = {"items": [], "counters": {}}

    def _save_registry(self):
        with open(self.registry_file, "w", encoding="utf-8") as f:
            json.dump(self.registry, f, indent=2, ensure_ascii=False)

    def _generate_id(self, pillar_id: str) -> str:
        pillar_cfg = get_pillar_config(pillar_id)
        prefix = pillar_cfg["id_prefix"]
        current_count = self.registry.get("counters", {}).get(prefix, 0) + 1
        self.registry.setdefault("counters", {})[prefix] = current_count
        return f"{prefix}-{current_count:03d}"

    def register_intake(
        self,
        pillar: str,
        title: str,
        content: str,
        source_type: str = "text_note",
        raw_file_path: Optional[str] = None,
        proof_point_ref: Optional[str] = None,
        extra_metadata: Optional[Dict] = None
    ) -> Dict:
        pillar_cfg = get_pillar_config(pillar)
        account_key = pillar_cfg["account"]
        voice_cfg = get_voice_profile(account_key)

        # Validation rules
        if pillar_cfg.get("requires_proof_point") and not proof_point_ref:
            # Maserati posts must tie back to real pillar proof points
            if not any(k in content.lower() for k in ["call", "event", "video", "launch", "client", "r15", "test"]):
                raise ValueError(
                    "Maserati posts must reference a real proof point or milestone from one of the main pillars!"
                )

        item_id = self._generate_id(pillar)
        now_str = datetime.now().isoformat()

        intake_item = {
            "id": item_id,
            "pillar": pillar,
            "pillar_name": pillar_cfg["name"],
            "account": account_key,
            "account_handle": voice_cfg["account"],
            "title": title,
            "source_type": source_type,
            "raw_file_path": raw_file_path or "",
            "content": content,
            "proof_point_ref": proof_point_ref or "",
            "extra_metadata": extra_metadata or {},
            "created_at": now_str,
            "status": "REGISTERED",
            "formats_supported": pillar_cfg["primary_formats"],
            "default_cta": pillar_cfg["default_cta"]
        }

        self.registry["items"].append(intake_item)
        self._save_registry()
        return intake_item

    def get_item(self, item_id: str) -> Optional[Dict]:
        for item in self.registry.get("items", []):
            if item["id"].lower() == item_id.lower():
                return item
        return None

    def list_items(self, pillar: Optional[str] = None, account: Optional[str] = None) -> List[Dict]:
        items = self.registry.get("items", [])
        if pillar:
            items = [it for it in items if it["pillar"].lower() == pillar.lower()]
        if account:
            items = [it for it in items if it["account"].lower() == account.lower()]
        return items

    def update_status(self, item_id: str, new_status: str):
        for item in self.registry.get("items", []):
            if item["id"].lower() == item_id.lower():
                item["status"] = new_status
                item["updated_at"] = datetime.now().isoformat()
                self._save_registry()
                return True
        return False
