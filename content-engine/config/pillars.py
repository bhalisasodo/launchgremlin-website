"""
Pillar configurations, formats, and validation rules aligned with the 30/60/90 Content Calendar.
"""

PILLARS = {
    "educational": {
        "id": "educational",
        "name": "Educational & Content Hub",
        "account": "launchgremlin",
        "id_prefix": "LG-EDU",
        "description": "Repurposing Content Hub articles, digital storefront myths, and business tools for SA entrepreneurs.",
        "weekly_target": 2,
        "input_fields": ["title", "source_text_or_url", "key_takeaway", "target_audience"],
        "primary_formats": ["talking_clip", "carousel", "before_after", "caption_only"],
        "default_cta": "Visit LaunchGremlin Content Hub / Try our instant business-card generator"
    },
    "cold_calls": {
        "id": "cold_calls",
        "name": "Cold-Call Reels",
        "account": "launchgremlin",
        "id_prefix": "LG-COLD",
        "description": "Real prospect call clips, client reactions, objections handled, and website audits.",
        "weekly_target": 4,
        "input_fields": ["prospect_industry", "objection_or_hook", "call_outcome", "raw_notes"],
        "primary_formats": ["talking_clip", "caption_only"],
        "default_cta": "Book a 15-minute quick audit with LaunchGremlin",
        "requires_privacy_check": True
    },
    "vibe_coding_events": {
        "id": "vibe_coding_events",
        "name": "Vibe-Coding Events",
        "account": "launchgremlin",
        "id_prefix": "LG-EVT",
        "description": "Footage and learnings from live build events in Umhlanga/Ballito.",
        "weekly_target": 2,
        "input_fields": ["event_name", "venue", "date", "footage_summary", "key_moments"],
        "primary_formats": ["talking_clip", "carousel", "before_after", "caption_only"],
        "default_cta": "RSVP for our next in-person session / link in bio"
    },
    "music_video_competition": {
        "id": "music_video_competition",
        "name": "Music Video Competition",
        "account": "launchgremlin",
        "id_prefix": "LG-COMP",
        "description": "NO SKIP track briefs, submissions, BTS creator highlights, voting, and winner spotlight.",
        "weekly_target": 2,
        "input_fields": ["artist_track", "submission_or_update", "creator_handle", "brief_summary"],
        "primary_formats": ["talking_clip", "carousel", "caption_only"],
        "default_cta": "Submit your video / check the leaderboards in bio"
    },
    "maserati_narrative": {
        "id": "maserati_narrative",
        "name": "Need Money for Maserati",
        "account": "needmoney4maserati",
        "id_prefix": "MAS-NAR",
        "description": "Founder narrative connecting all four pillars into an authentic build-in-public milestone journey.",
        "weekly_target": 6,
        "input_fields": ["proof_point_source", "milestone_text", "lesson_or_struggle", "current_mrr_or_traction"],
        "primary_formats": ["talking_clip", "caption_only", "carousel"],
        "default_cta": "Follow the journey / comment what feature we should ship next",
        "requires_proof_point": True
    }
}

def get_pillar_config(pillar_id: str) -> dict:
    normalized = pillar_id.lower().replace("-", "_").strip()
    if normalized in PILLARS:
        return PILLARS[normalized]
    raise ValueError(f"Unknown pillar '{pillar_id}'. Valid pillars: {list(PILLARS.keys())}")
