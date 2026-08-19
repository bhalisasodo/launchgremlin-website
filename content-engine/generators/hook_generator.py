"""
Hook generator producing 3-5 ranked candidate hooks with strategic rationales.
"""

import os
import sys
import json
from typing import Dict, List, Any

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from config.pillars import get_pillar_config
from config.voices import get_voice_profile
from generators.llm_client import LLMClient

class HookGenerator:
    def __init__(self):
        self.llm = LLMClient()

    def generate_hooks(self, intake_item: Dict[str, Any]) -> List[Dict[str, str]]:
        pillar = intake_item.get("pillar", "educational")
        account = intake_item.get("account", "launchgremlin")
        title = intake_item.get("title", "")
        content = intake_item.get("content", "")
        
        pillar_cfg = get_pillar_config(pillar)
        voice_cfg = get_voice_profile(account)

        # Attempt LLM generation first
        system_prompt = (
            f"You are the senior social copywriter for {voice_cfg['account']}.\n"
            f"Voice & Tone: {voice_cfg['tone']}\n"
            f"Pillar: {pillar_cfg['name']} ({pillar_cfg['description']})\n"
            f"Guardrail: {voice_cfg['core_guardrail']}\n"
            "Task: Generate exactly 4 ranked short-form video / post hooks (the first 2 seconds or first line). "
            "For each hook, provide a 1-line strategic rationale. "
            "Return valid JSON array of objects with keys 'rank', 'hook', 'rationale', 'style'."
        )

        prompt = (
            f"Source Content Title: {title}\n"
            f"Source Content Body: {content}\n"
            "Respond ONLY with a JSON array: [{\"rank\": 1, \"hook\": \"...\", \"rationale\": \"...\", \"style\": \"...\"}]"
        )

        llm_response = self.llm.generate_completion(prompt, system_prompt)
        if llm_response:
            try:
                # Clean code fences if any
                clean_json = llm_response.strip()
                if clean_json.startswith("```"):
                    clean_json = clean_json.split("\n", 1)[1]
                    if clean_json.endswith("```"):
                        clean_json = clean_json.rsplit("\n", 1)[0]
                hooks = json.loads(clean_json)
                if isinstance(hooks, list) and len(hooks) > 0:
                    return hooks
            except Exception as e:
                print(f"[HookGenerator] LLM JSON parse error: {e}. Falling back to structured generator.")

        # High-Quality Local Structured Generator
        return self._generate_structured_hooks(pillar, account, title, content)

    def _generate_structured_hooks(self, pillar: str, account: str, title: str, content: str) -> List[Dict[str, str]]:
        if account == "needmoney4maserati":
            return [
                {
                    "rank": 1,
                    "hook": f"Here's why {title.lower()} is bringing me one step closer to the Maserati.",
                    "rationale": "High curiosity and direct tie-in to the founder's build-in-public milestone.",
                    "style": "Momentum / High-Stakes"
                },
                {
                    "rank": 2,
                    "hook": f"I used to think this took 3 weeks. We just proved it takes 24 hours.",
                    "rationale": "Contrast hook that challenges standard assumptions and builds speed authority.",
                    "style": "Contrarian / Speed"
                },
                {
                    "rank": 3,
                    "hook": f"The biggest risk I took this week: {title}.",
                    "rationale": "Vulnerability and drama hook that draws viewers into the messy building reality.",
                    "style": "Vulnerability / BTS"
                },
                {
                    "rank": 4,
                    "hook": f"If you're building a business in South Africa right now, watch this before you spend R10k.",
                    "rationale": "Direct local relevance with money-saving stakes.",
                    "style": "Direct Value Warning"
                }
            ]

        # LaunchGremlin Pillar Hooks
        if pillar == "educational":
            return [
                {
                    "rank": 1,
                    "hook": f"90% of SA small business websites make this exact mistake — here's the 5-minute fix.",
                    "rationale": "High-urgency problem/solution opening tailored to SA business owners without buzzwords.",
                    "style": "Problem / Urgent Solution"
                },
                {
                    "rank": 2,
                    "hook": f"Why paying R15,000 for a static website in 2026 is officially a trap.",
                    "rationale": "Addresses direct cost pain point with strong polarizing stance that hooks attention.",
                    "style": "Myth-Busting / Pricing"
                },
                {
                    "rank": 3,
                    "hook": f"If your website doesn't do this one thing on mobile, you're losing customers every day.",
                    "rationale": "Highlights mobile-first reality for South African consumers.",
                    "style": "Fear-of-Missing-Out / Practical Check"
                },
                {
                    "rank": 4,
                    "hook": f"How to turn a simple business card into a 24/7 sales engine in under 10 minutes.",
                    "rationale": "Feature hook that promotes the free business-card tool with tangible outcome.",
                    "style": "Actionable Feature / Tool"
                }
            ]
        elif pillar == "cold_calls":
            return [
                {
                    "rank": 1,
                    "hook": "We called 20 local business owners. Here is what they ACTUALLY said about their websites.",
                    "rationale": "Social proof and unscripted raw reality that proves market demand.",
                    "style": "Curiosity / Raw Reality"
                },
                {
                    "rank": 2,
                    "hook": "'I don't need a website, I have Instagram.' Here's what happened when we showed them their lost search traffic.",
                    "rationale": "Direct objection handling that educates while entertaining.",
                    "style": "Objection Handling"
                },
                {
                    "rank": 3,
                    "hook": "The exact script we used to book 4 client audits in Durban this morning.",
                    "rationale": "Process breakdown hook for entrepreneurs looking for lead gen tactics.",
                    "style": "Behind-The-Scenes Tactical"
                }
            ]
        elif pillar == "vibe_coding_events":
            return [
                {
                    "rank": 1,
                    "hook": "We put 10 non-technical founders in a room in Umhlanga and built 10 live web apps in 3 hours.",
                    "rationale": "High-energy event proof showing tangible speed and community vibe.",
                    "style": "Event Proof / Transformation"
                },
                {
                    "rank": 2,
                    "hook": "What happens when you replace 6 months of coding with 1 afternoon of vibe-coding?",
                    "rationale": "Shows radical contrast in delivery time.",
                    "style": "Contrast / Modern Tech"
                },
                {
                    "rank": 3,
                    "hook": "Ballito & Umhlanga founders: here's what you missed at Event #1.",
                    "rationale": "Hyper-local geo-targeted community FOMO.",
                    "style": "Local Community FOMO"
                }
            ]
        elif pillar == "music_video_competition":
            return [
                {
                    "rank": 1,
                    "hook": "Calling all SA videographers: shoot the official visual for 'NO SKIP' and win big.",
                    "rationale": "Direct call to action for the creator community.",
                    "style": "Open Call / Competition"
                },
                {
                    "rank": 2,
                    "hook": "We gave 5 Durban videographers the exact same audio track. Here are the 5 completely different visions.",
                    "rationale": "Showcase of creator craft that drives massive natural shares.",
                    "style": "Creative Showcase"
                },
                {
                    "rank": 3,
                    "hook": "Vote for the top entry: which creator understood the brief best?",
                    "rationale": "Audience engagement and voting mechanic.",
                    "style": "Interactive Community Poll"
                }
            ]

        # Generic fallback
        return [
            {
                "rank": 1,
                "hook": f"Here is the truth about {title}.",
                "rationale": "Direct clarity hook.",
                "style": "Direct"
            },
            {
                "rank": 2,
                "hook": f"Before you make your next business move in SA, look at this.",
                "rationale": "Local warning hook.",
                "style": "Warning"
            }
        ]
