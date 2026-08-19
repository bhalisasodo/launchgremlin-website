"""
LaunchGremlin Semi-Automated AI Content Engine CLI.
Provides unified commands for Intake, Generation, Review/Approval, Tracking, and Analytics.
"""

import os
import sys
import argparse
import json

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass
try:
    from tabulate import tabulate
except ImportError:
    def tabulate(rows, headers, tablefmt="grid"):
        col_widths = [len(h) for h in headers]
        for row in rows:
            for i, val in enumerate(row):
                col_widths[i] = max(col_widths[i], len(str(val)))
        
        sep = "+-" + "-+-".join("-" * w for w in col_widths) + "-+"
        head_line = "| " + " | ".join(f"{h:<{w}}" for h, w in zip(headers, col_widths)) + " |"
        res = [sep, head_line, sep]
        for row in rows:
            row_line = "| " + " | ".join(f"{str(val):<{w}}" for val, w in zip(row, col_widths)) + " |"
            res.append(row_line)
        res.append(sep)
        return "\n".join(res)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from config.pillars import PILLARS
from config.voices import VOICE_PROFILES
from intake.intake_manager import IntakeManager
from generators.format_multiplier import FormatMultiplier
from tracker.tracking_sheet import TrackingSheet
from distribution.queue_manager import QueueManager

def cmd_intake(args):
    im = IntakeManager()
    item = im.register_intake(
        pillar=args.pillar,
        title=args.title,
        content=args.content,
        source_type=args.source_type,
        raw_file_path=args.file,
        proof_point_ref=args.proof_point
    )
    print(f"\n✅ Registered Intake Item:")
    print(f"   ID:       {item['id']}")
    print(f"   Account:  {item['account_handle']}")
    print(f"   Pillar:   {item['pillar_name']}")
    print(f"   Title:    {item['title']}")
    print(f"\nNext step: Run `python cli.py generate --id {item['id']}` to multiply formats.\n")

def cmd_list_intake(args):
    im = IntakeManager()
    items = im.list_items(pillar=args.pillar, account=args.account)
    if not items:
        print("\nNo intake items found.")
        return

    table = []
    for it in items:
        table.append([it["id"], it["account_handle"], it["pillar"], it["title"][:35], it["status"], it["created_at"][:16]])
    
    print("\n" + tabulate(table, headers=["ID", "Account", "Pillar", "Title", "Status", "Created At"], tablefmt="grid"))

def cmd_generate(args):
    im = IntakeManager()
    item = im.get_item(args.id)
    if not item:
        print(f"\n❌ Error: Item with ID '{args.id}' not found in intake registry.")
        return

    print(f"\n⚙️ Generating 4 multi-channel formats for {item['id']} ({item['title']})...")
    multiplier = FormatMultiplier()
    package = multiplier.multiply_formats(item, hook_index=args.hook_index)

    # Save to Queue as Draft
    qm = QueueManager()
    draft_file = qm.save_draft_package(package)
    
    # Auto-log to Tracking Sheet
    ts = TrackingSheet()
    ts.log_multiplied_package(package, status="PENDING_REVIEW")
    
    im.update_status(item["id"], "GENERATED_DRAFT")

    print(f"\n🎉 Formats Generated Successfully!")
    print(f"   Chosen Hook: \"{package['chosen_hook']}\"")
    print(f"   Draft Saved: {draft_file}")
    print(f"   Tracking Log: Auto-logged to data/tracking_sheet.csv")
    print(f"\nNext step: Run `python cli.py view-draft --id {item['id']}` or `python cli.py approve --id {item['id']}`.\n")

def cmd_list_drafts(args):
    qm = QueueManager()
    drafts = qm.list_drafts(status_filter=args.status, account_filter=args.account)
    if not drafts:
        print("\nNo drafts found.")
        return

    table = []
    for d in drafts:
        table.append([
            d.get("intake_id"),
            d.get("account"),
            d.get("pillar"),
            d.get("title")[:30],
            d.get("status"),
            d.get("chosen_hook")[:35] + "..."
        ])
    print("\n" + tabulate(table, headers=["ID", "Account", "Pillar", "Title", "Status", "Hook Selected"], tablefmt="grid"))

def cmd_view_draft(args):
    qm = QueueManager()
    draft = qm.get_draft(args.id)
    if not draft:
        print(f"\n❌ Error: Draft '{args.id}' not found.")
        return

    print("=" * 70)
    print(f"DRAFT INSPECTION: {draft['intake_id']} [{draft['status']}]")
    print(f"Account: {draft['account']} | Pillar: {draft['pillar']}")
    print(f"Title:   {draft['title']}")
    print("=" * 70)
    
    print("\n--- CANDIDATE HOOKS GENERATED ---")
    for h in draft.get("candidate_hooks", []):
        marker = "👉 [CHOSEN]" if h["hook"] == draft.get("chosen_hook") else "   "
        print(f"{marker} Rank {h.get('rank')}: \"{h.get('hook')}\"")
        print(f"     Rationale: {h.get('rationale')}")

    formats = draft.get("formats", {})
    print("\n--- 1. SHORT-FORM VIDEO SCRIPT (REELS / TIKTOK) ---")
    tc = formats.get("talking_clip", {})
    print(f"Hook: {tc.get('hook')}")
    print(f"Est. Duration: {tc.get('duration')}")
    for sc in tc.get("scenes", []):
        print(f"  [Scene {sc.get('scene')}] Visual: {sc.get('visual')}")
        print(f"             Spoken: {sc.get('audio_spoken')}")
        print(f"             Text:   {sc.get('on_screen_text')}")

    print("\n--- 2. 5-SLIDE CAROUSEL ---")
    car = formats.get("carousel", {})
    for sl in car.get("slides", []):
        print(f"  [Slide {sl.get('slide_number')} - {sl.get('type')}] {sl.get('headline')}")

    print("\n--- 3. BEFORE / AFTER PROOF ---")
    ba = formats.get("before_after", {})
    print(f"  Before: {ba.get('before_state', {}).get('description')}")
    print(f"  After:  {ba.get('after_state', {}).get('description')}")

    print("\n--- 4. CAPTION-ONLY POST ---")
    co = formats.get("caption_only", {})
    print(f"  {co.get('text')[:200]}...")
    print("=" * 70 + "\n")

def cmd_approve(args):
    qm = QueueManager()
    out_file = qm.approve_draft(args.id, reviewer_notes=args.notes or "Approved via CLI")
    if not out_file:
        print(f"\n❌ Error: Draft '{args.id}' could not be approved.")
        return

    # Update intake status
    im = IntakeManager()
    im.update_status(args.id, "APPROVED_READY_TO_POST")

    print(f"\n✅ Draft {args.id} APPROVED!")
    print(f"   Ready-to-post brief written to:\n   📄 {out_file}\n")

def cmd_update_metrics(args):
    ts = TrackingSheet()
    ok = ts.update_metrics(
        post_id=args.id,
        views=args.views,
        saves=args.saves,
        comments=args.comments,
        shares=args.shares,
        paid_spend=args.paid_spend or "R0"
    )
    if ok:
        print(f"\n✅ Metrics updated for {args.id}.")
        print(f"   Evaluated paid amplification candidate status updated in data/tracking_sheet.csv\n")
    else:
        print(f"\n❌ Error: Post ID '{args.id}' not found in tracking sheet.")

def cmd_show_tracking(args):
    ts = TrackingSheet()
    rows = ts.get_all_rows()
    if not rows:
        print("\nTracking sheet is currently empty.")
        return

    table = []
    for r in rows:
        table.append([
            r["post_id"],
            r["account"],
            r["pillar"],
            r["format"],
            r["status"],
            r["views"],
            r["saves"],
            r["shares"],
            r["paid_candidate"]
        ])
    print("\n" + tabulate(table, headers=["Post ID", "Account", "Pillar", "Format", "Status", "Views", "Saves", "Shares", "Paid?"], tablefmt="grid"))

def main():
    parser = argparse.ArgumentParser(description="LaunchGremlin Semi-Automated Content Engine CLI")
    subparsers = parser.add_subparsers(dest="command", help="Available subcommands")

    # Intake
    p_intake = subparsers.add_parser("intake", help="Register a raw content source")
    p_intake.add_argument("--pillar", required=True, choices=list(PILLARS.keys()), help="Content pillar")
    p_intake.add_argument("--title", required=True, help="Title or summary topic")
    p_intake.add_argument("--content", required=True, help="Source text, transcript, or notes")
    p_intake.add_argument("--source-type", default="text_note", help="Source type (call_recording, footage_dump, article, etc.)")
    p_intake.add_argument("--file", help="Path to raw audio/video/markdown file")
    p_intake.add_argument("--proof-point", help="Reference ID for Maserati narrative proof point")
    p_intake.set_defaults(func=cmd_intake)

    # List intake
    p_list_in = subparsers.add_parser("list-intake", help="List registered intake sources")
    p_list_in.add_argument("--pillar", help="Filter by pillar")
    p_list_in.add_argument("--account", help="Filter by account")
    p_list_in.set_defaults(func=cmd_list_intake)

    # Generate
    p_gen = subparsers.add_parser("generate", help="Generate hooks, scripts, and 4-way formats for an intake item")
    p_gen.add_argument("--id", required=True, help="Intake item ID (e.g. LG-EDU-001)")
    p_gen.add_argument("--hook-index", type=int, default=0, help="Index of candidate hook to use (0 is rank 1)")
    p_gen.set_defaults(func=cmd_generate)

    # List drafts
    p_drafts = subparsers.add_parser("list-drafts", help="List generated draft packages")
    p_drafts.add_argument("--status", help="Filter by status (PENDING_REVIEW, APPROVED)")
    p_drafts.add_argument("--account", help="Filter by account")
    p_drafts.set_defaults(func=cmd_list_drafts)

    # View draft
    p_view = subparsers.add_parser("view-draft", help="Inspect generated draft and candidate hooks")
    p_view.add_argument("--id", required=True, help="Intake / Post ID")
    p_view.set_defaults(func=cmd_view_draft)

    # Approve
    p_app = subparsers.add_parser("approve", help="Approve draft and create ready-to-post briefs")
    p_app.add_argument("--id", required=True, help="Intake / Post ID")
    p_app.add_argument("--notes", help="Review notes")
    p_app.set_defaults(func=cmd_approve)

    # Update Metrics
    p_metrics = subparsers.add_parser("update-metrics", help="Update views, saves, shares and evaluate paid amplification")
    p_metrics.add_argument("--id", required=True, help="Post ID from tracking sheet")
    p_metrics.add_argument("--views", type=int, default=0)
    p_metrics.add_argument("--saves", type=int, default=0)
    p_metrics.add_argument("--comments", type=int, default=0)
    p_metrics.add_argument("--shares", type=int, default=0)
    p_metrics.add_argument("--paid-spend", default="R0")
    p_metrics.set_defaults(func=cmd_update_metrics)

    # Show Tracking
    p_track = subparsers.add_parser("show-tracking", help="View the shared tracking sheet")
    p_track.set_defaults(func=cmd_show_tracking)

    args = parser.parse_args()
    if hasattr(args, "func"):
        args.func(args)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
