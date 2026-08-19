"""
Voice profiles, tone guidelines, and CTA strategies for LaunchGremlin accounts.
"""

VOICE_PROFILES = {
    "launchgremlin": {
        "account": "@LaunchGremlin",
        "display_name": "LaunchGremlin (Main Brand)",
        "tone": "Warm, plain-language, client/craft-forward, practical SA small business focus, no technical jargon.",
        "perspective": "Third-person brand / team ('we', 'our team', 'local businesses')",
        "pillars": [
            "cold_calls",
            "vibe_coding_events",
            "music_video_competition",
            "educational"
        ],
        "core_guardrail": (
            "Every post passes one filter: does this help, entertain, or reassure the "
            "South African small-business owner — or is it just talking about LaunchGremlin?"
        ),
        "cta_rules": {
            "educational": "Visit LaunchGremlin Content Hub / Try the instant business-card generator (Link in bio)",
            "cold_calls": "Need a high-converting digital storefront? Book a 15-min discovery call.",
            "vibe_coding_events": "RSVP for our next free in-person build session in Umhlanga/Ballito.",
            "music_video_competition": "Submit your music video entry or vote for your favourite creator."
        },
        "banned_phrases": [
            "synergy", "disruptive paradigm", "rockstar developer", "web3", "hypergrowth"
        ]
    },
    "needmoney4maserati": {
        "account": "@needmoney4maserati",
        "display_name": "Need Money for Maserati (Founder Narrative)",
        "tone": "First-person, raw, build-in-public, energetic, transparent, high stakes, humorous yet focused.",
        "perspective": "First-person founder ('I', 'me', 'my goal')",
        "pillars": [
            "maserati_narrative"
        ],
        "core_guardrail": (
            "A Maserati post is ALWAYS derived from real proof-points or events from the "
            "other four pillars (cold calls landed, events run, competition submissions), "
            "never generated as an isolated fantasy."
        ),
        "cta_rules": {
            "maserati_narrative": "Follow the journey from 0 to Maserati / Drop your feedback or guess the next milestone in comments."
        },
        "banned_phrases": [
            "get rich quick", "crypto scheme", "guaranteed returns", "guru"
        ]
    }
}

def get_voice_profile(account_key: str) -> dict:
    account_key = account_key.lower().replace("@", "").strip()
    if account_key in VOICE_PROFILES:
        return VOICE_PROFILES[account_key]
    
    # Dynamic fallback for custom multi-tenant SaaS accounts
    return {
        "account": f"@{account_key}",
        "display_name": account_key.replace("_", " ").title(),
        "tone": "Professional, authentic, value-driven, and clear.",
        "perspective": "Brand / Team",
        "pillars": ["educational", "transformations", "behind_scenes"],
        "core_guardrail": "Focus on high-value client transformation and clear communication.",
        "cta_rules": {
            "educational": f"Follow @{account_key} / Link in bio for more details",
            "default": f"Follow @{account_key} / Link in bio"
        },
        "banned_phrases": ["cheap", "guaranteed overnight"]
    }

