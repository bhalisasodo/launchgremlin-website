"""
Script and caption generator producing talking-clip scripts, platform captions, and CTAs.
"""

import os
import sys
import json
from typing import Dict, List, Any, Optional

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from config.pillars import get_pillar_config
from config.voices import get_voice_profile
from generators.llm_client import LLMClient

class ScriptGenerator:
    def __init__(self):
        self.llm = LLMClient()

    def generate_script_and_captions(
        self,
        intake_item: Dict[str, Any],
        chosen_hook: str,
        chosen_hook_rationale: Optional[str] = None
    ) -> Dict[str, Any]:
        pillar = intake_item.get("pillar", "educational")
        account = intake_item.get("account", "launchgremlin")
        title = intake_item.get("title", "")
        content = intake_item.get("content", "")

        pillar_cfg = get_pillar_config(pillar)
        voice_cfg = get_voice_profile(account)
        cta = voice_cfg.get("cta_rules", {}).get(pillar, pillar_cfg.get("default_cta"))

        # Check for LLM generation
        system_prompt = (
            f"You are the senior scriptwriter and social media strategist for {voice_cfg['account']}.\n"
            f"Brand Tone: {voice_cfg['tone']}\n"
            f"Perspective: {voice_cfg['perspective']}\n"
            f"Guardrail: {voice_cfg['core_guardrail']}\n"
            f"Pillar: {pillar_cfg['name']}\n"
            f"Mandatory CTA: {cta}\n"
            "Generate a complete short-form video package formatted as JSON with keys:\n"
            "- 'hook_used': string\n"
            "- 'video_duration_est': string (e.g. '45-60s')\n"
            "- 'script_scenes': list of objects [{'scene': 1, 'visual': '...', 'audio_spoken': '...', 'on_screen_text': '...'}]\n"
            "- 'captions': object with keys 'instagram', 'tiktok', 'facebook'\n"
            "- 'cta': string\n"
            "- 'hashtags': list of strings\n"
        )

        prompt = (
            f"Chosen Hook: \"{chosen_hook}\"\n"
            f"Topic: {title}\n"
            f"Source Material: {content}\n"
            "Return valid JSON only matching the schema."
        )

        llm_response = self.llm.generate_completion(prompt, system_prompt)
        if llm_response:
            try:
                clean_json = llm_response.strip()
                if clean_json.startswith("```"):
                    clean_json = clean_json.split("\n", 1)[1]
                    if clean_json.endswith("```"):
                        clean_json = clean_json.rsplit("\n", 1)[0]
                result = json.loads(clean_json)
                if isinstance(result, dict) and "script_scenes" in result:
                    result["cta"] = cta
                    return result
            except Exception as e:
                print(f"[ScriptGenerator] LLM JSON parse error: {e}. Falling back to structured generator.")

        return self._generate_structured_script(pillar, account, title, content, chosen_hook, cta, voice_cfg)

    def _generate_structured_script(
        self,
        pillar: str,
        account: str,
        title: str,
        content: str,
        hook: str,
        cta: str,
        voice_cfg: dict
    ) -> Dict[str, Any]:
        if account == "needmoney4maserati":
            scenes = [
                {
                    "scene": 1,
                    "visual": "Founder on camera, direct eye contact, walking or working at desk.",
                    "audio_spoken": hook,
                    "on_screen_text": "ROAD TO THE MASERATI 🏎️💨"
                },
                {
                    "scene": 2,
                    "visual": "Screen recording or cut to the actual build/work proof point.",
                    "audio_spoken": f"Here's the honest breakdown. While building LaunchGremlin, we hit this exact challenge with {title.lower()}.",
                    "on_screen_text": "The Real Struggle 📉"
                },
                {
                    "scene": 3,
                    "visual": "Over-the-shoulder view showing real results, client feedback, or event metrics.",
                    "audio_spoken": f"Instead of overcomplicating it, we stripped it back. {content[:150]}... and the result was instant clarity.",
                    "on_screen_text": "The Solution 🚀"
                },
                {
                    "scene": 4,
                    "visual": "Back to founder, holding up phone or looking into camera with confidence.",
                    "audio_spoken": f"We're documenting every single win and failure on the path to the Maserati. {cta}",
                    "on_screen_text": "Drop a comment 👇"
                }
            ]
            captions = {
                "instagram": f"{hook}\n\nTransparent build-in-public update on LaunchGremlin.\n\nEvery milestone brings us closer to the goal. {cta}\n\n#needmoney4maserati #buildinpublic #southafrica #entrepreneurship #solopreneur",
                "tiktok": f"{hook} 🚀 Follow the journey from R0 to Maserati. {cta} #buildinpublic #southafrica #techstartups #entrepreneur",
                "facebook": f"{hook}\n\nA quick look behind the scenes of building LaunchGremlin. {cta}"
            }
            hashtags = ["#needmoney4maserati", "#buildinpublic", "#southafrica", "#founderjourney", "#techstartups"]

        else:
            # @LaunchGremlin Main Account
            scenes = [
                {
                    "scene": 1,
                    "visual": "Clean hook shot, creator or product screen with bold caption overlay.",
                    "audio_spoken": hook,
                    "on_screen_text": "🚨 WATCH BEFORE YOU PAY FOR A WEBSITE"
                },
                {
                    "scene": 2,
                    "visual": "Cut to split-screen showing the common mistake vs the clean, fast modern approach.",
                    "audio_spoken": f"Most local businesses are told they need weeks of complex dev work. But here's what actually converts customers: speed, clean mobile layout, and a frictionless WhatsApp or booking CTA.",
                    "on_screen_text": "Mobile-First + Instant Conversion 📱"
                },
                {
                    "scene": 3,
                    "visual": "Live demo of LaunchGremlin tool or client storefront working smoothly on a phone.",
                    "audio_spoken": f"Take a look at how this works in real life: {content[:160]}...",
                    "on_screen_text": "Simple. Clean. Effective. ✨"
                },
                {
                    "scene": 4,
                    "visual": "Ending screen with LaunchGremlin logo and clean call-out.",
                    "audio_spoken": f"You don't need a bloated agency quote. {cta}",
                    "on_screen_text": "Link in Bio 🔗"
                }
            ]
            captions = {
                "instagram": f"{hook}\n\nSouth African small businesses don't need bloated R15k agency retainers. You need a fast, mobile-optimised digital presence that turns visitors into paying customers.\n\n💡 {cta}\n\n#LaunchGremlin #SABusiness #DurbanBusiness #SouthAfricaEntrepreneurs #WebDesignSA #DigitalMarketing",
                "tiktok": f"{hook} 🇿🇦 Skip the overpriced agency fluff. {cta} #southafrica #smallbusinesssa #webdesign #entrepreneurship",
                "facebook": f"{hook}\n\nPractical digital solutions for South African businesses. Read the full breakdown or try our free business-card tool today: {cta}"
            }
            hashtags = ["#LaunchGremlin", "#SmallBusinessSA", "#SouthAfrica", "#DigitalStorefront", "#LocalBusiness"]

        return {
            "hook_used": hook,
            "video_duration_est": "45-60s",
            "script_scenes": scenes,
            "captions": captions,
            "cta": cta,
            "hashtags": hashtags
        }
