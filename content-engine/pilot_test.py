"""
Pilot test suite for the LaunchGremlin AI Content Engine.
Validates the Educational Pillar pilot and Maserati narrative derivation end-to-end.
"""

import os
import sys
import json
import unittest

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from intake.intake_manager import IntakeManager
from generators.format_multiplier import FormatMultiplier
from tracker.tracking_sheet import TrackingSheet
from distribution.queue_manager import QueueManager

class ContentEnginePilotTest(unittest.TestCase):
    def setUp(self):
        self.intake_mgr = IntakeManager()
        self.multiplier = FormatMultiplier()
        self.tracking_sheet = TrackingSheet()
        self.queue_mgr = QueueManager()

    def test_01_educational_pilot_intake_and_generation(self):
        print("\n--- TEST 1: Educational Pillar Pilot Intake & 4-Way Format Generation ---")
        
        # 1. Register Educational Intake
        item = self.intake_mgr.register_intake(
            pillar="educational",
            title="The R15,000 Website Myth for SA Small Businesses",
            content=(
                "Most South African small business owners are convinced they need to spend R15k–R30k "
                "and wait 6 weeks for an agency to build a website. In reality, 85% of their traffic comes "
                "from mobile phones looking for 3 things: what you do, how much it costs, and a 1-tap WhatsApp link. "
                "LaunchGremlin replaces bloated agency delays with instant, high-converting digital storefronts."
            ),
            source_type="content_hub_article"
        )
        
        self.assertIsNotNone(item)
        self.assertTrue(item["id"].startswith("LG-EDU-"))
        self.assertEqual(item["account"], "launchgremlin")
        print(f"Registered Intake Item: {item['id']} ({item['title']})")

        # 2. Multiply into 4 Formats
        package = self.multiplier.multiply_formats(item, hook_index=0)
        self.assertIn("candidate_hooks", package)
        self.assertGreaterEqual(len(package["candidate_hooks"]), 3)
        self.assertIn("formats", package)
        
        formats = package["formats"]
        self.assertIn("talking_clip", formats)
        self.assertIn("carousel", formats)
        self.assertIn("before_after", formats)
        self.assertIn("caption_only", formats)
        
        print(f"Candidate Hooks Count: {len(package['candidate_hooks'])}")
        print(f"Selected Hook: \"{package['chosen_hook']}\"")
        print(f"4 Formats Generated: {list(formats.keys())}")

        # 3. Save to Draft Queue & Log to Tracking Sheet
        draft_path = self.queue_mgr.save_draft_package(package)
        self.assertTrue(os.path.exists(draft_path))
        print(f"Draft Saved to Queue: {draft_path}")

        logged_rows = self.tracking_sheet.log_multiplied_package(package, status="PENDING_REVIEW")
        self.assertEqual(len(logged_rows), 4)
        print(f"Logged {len(logged_rows)} format assets to data/tracking_sheet.csv")

        # 4. Human Approval Gate
        approved_md = self.queue_mgr.approve_draft(item["id"], reviewer_notes="Approved for Day 1 posting")
        self.assertIsNotNone(approved_md)
        self.assertTrue(os.path.exists(approved_md))
        print(f"Approved Ready-to-Post Markdown Brief: {approved_md}")

    def test_02_maserati_narrative_derivation(self):
        print("\n--- TEST 2: Maserati Narrative Derivation from Educational Proof Point ---")
        
        # 1. Register Maserati Narrative post derived from educational launch
        maserati_item = self.intake_mgr.register_intake(
            pillar="maserati_narrative",
            title="Building the Content Engine in Public",
            content=(
                "Just finished shipping the first automated educational content batch for LaunchGremlin. "
                "Tested the business card generator with local entrepreneurs in Durban. "
                "Proof that speed beats polish every time when you're building towards the Maserati."
            ),
            proof_point_ref="LG-EDU-001"
        )
        
        self.assertIsNotNone(maserati_item)
        self.assertTrue(maserati_item["id"].startswith("MAS-NAR-"))
        self.assertEqual(maserati_item["account"], "needmoney4maserati")
        print(f"Registered Maserati Intake Item: {maserati_item['id']}")

        # 2. Multiply formats
        mas_package = self.multiplier.multiply_formats(maserati_item, hook_index=0)
        self.assertIn("candidate_hooks", mas_package)
        print(f"Maserati Hook: \"{mas_package['chosen_hook']}\"")

        # 3. Save and Approve
        self.queue_mgr.save_draft_package(mas_package)
        approved_md = self.queue_mgr.approve_draft(maserati_item["id"])
        self.assertIsNotNone(approved_md)
        self.assertTrue(os.path.exists(approved_md))
        print(f"Approved Maserati Markdown Brief: {approved_md}")

    def test_03_tracking_metrics_and_paid_candidate_evaluation(self):
        print("\n--- TEST 3: Tracking Sheet Performance Evaluation for Paid Amplification ---")
        
        # Simulate high engagement on LG-EDU-001-TALK
        post_sub_id = "LG-EDU-001-TALK"
        updated = self.tracking_sheet.update_metrics(
            post_id=post_sub_id,
            views=1200,
            saves=45,
            comments=18,
            shares=32,
            paid_spend="R0"
        )
        self.assertTrue(updated)
        
        # Verify it became a paid candidate
        rows = self.tracking_sheet.get_all_rows()
        target = [r for r in rows if r["post_id"] == post_sub_id][0]
        self.assertEqual(target["paid_candidate"], "YES")
        print(f"Post {post_sub_id} evaluated with 45 saves / 32 shares -> Paid Candidate: {target['paid_candidate']} ✅")

    def test_04_custom_client_brand_workspace_creation_and_generation(self):
        print("\n--- TEST 4: Custom Client Brand Workspace Creation & Generation ---")
        
        # 1. Register intake for a custom client workspace (Durban Artisan Coffee Roasters)
        custom_item = self.intake_mgr.register_intake(
            pillar="educational",
            title="Why Supermarket Coffee Beans Are 6 Months Stale",
            content=(
                "Most grocery store coffee beans were roasted 180 days ago in industrial warehouses. "
                "Fresh artisan beans roasted in Durban reach peak flavor within 14 days of roasting. "
                "Here is how to spot the real roast date and brew cafe-quality espresso at home."
            ),
            source_type="content_hub_article"
        )
        
        # Override with custom client metadata
        custom_item["account"] = "durbancoffeeroasters"
        custom_item["id"] = "ROAST-ORIGIN-001"
        custom_item["title"] = "Why Supermarket Coffee Beans Are 6 Months Stale"
        
        print(f"Registered Custom Client Workspace Item: {custom_item['id']} for @{custom_item['account']}")
        
        # 2. Multiply into 4 Formats
        package = self.multiplier.multiply_formats(custom_item, hook_index=0)
        self.assertEqual(package["account"], "durbancoffeeroasters")
        self.assertIn("talking_clip", package["formats"])
        self.assertIn("carousel", package["formats"])
        self.assertIn("before_after", package["formats"])
        self.assertIn("caption_only", package["formats"])
        
        print(f"Generated 4-Way Package for @durbancoffeeroasters with hook: \"{package['chosen_hook']}\"")
        
        # 3. Save Draft and Approve
        draft_path = self.queue_mgr.save_draft_package(package)
        self.assertTrue(os.path.exists(draft_path))
        
        approved_md = self.queue_mgr.approve_draft("ROAST-ORIGIN-001", reviewer_notes="Approved for Durban Coffee Roasters campaign")
        self.assertIsNotNone(approved_md)
        self.assertTrue(os.path.exists(approved_md))
        print(f"Approved Custom Client Markdown Brief: {approved_md}")

if __name__ == "__main__":
    unittest.main()

