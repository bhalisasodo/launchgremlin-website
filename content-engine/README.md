# LaunchGremlin — Semi-Automated AI Content Engine

A semi-automated content pipeline that takes raw source material (call recordings, event footage, competition entries, Content Hub articles, founder updates) and turns it into multi-format, ready-to-post Instagram/TikTok/Facebook assets in a single pass.

Built directly according to:
- [`LaunchGremlin_AI_Workflow_Spec.md`](./LaunchGremlin_AI_Workflow_Spec.md)
- [`LaunchGremlin_30-60-90_Content_Calendar.md`](./LaunchGremlin_30-60-90_Content_Calendar.md)

---

## 🎯 Architecture

```
[1. INTAKE] ──> [2. HOOK GENERATOR] ──> [3. SCRIPT & CAPTIONS] ──> [4. FORMAT MULTIPLIER] ──> [5. TRACKING & QUEUE]
```

### Supported Accounts & Voice Layers
1. **`@LaunchGremlin` (Main Brand)**:
   - **Tone:** Warm, plain-language, client/craft-forward, practical SA small business focus, no technical jargon.
   - **Pillars:** Educational & Content Hub, Cold-Call Reels, Vibe-Coding Events, Music Video Competition.
2. **`@needmoney4maserati` (Founder Narrative Spine)**:
   - **Tone:** First-person, raw, build-in-public, energetic, high stakes, transparent.
   - **Pillar:** Need Money for Maserati (strictly derived from real proof points of the main pillars).

---

## 🚀 Quick Start CLI

### 1. Register a Raw Content Source
```powershell
python cli.py intake --pillar educational --title "The R15,000 Website Myth" --content "Notes from client discussions..."
```

For Maserati narrative (must reference proof point):
```powershell
python cli.py intake --pillar maserati_narrative --title "Building in Public" --content "Shipped the new tool batch..." --proof-point LG-EDU-001
```

### 2. Generate 4-Way Multi-Format Package
```powershell
python cli.py generate --id LG-EDU-001
```
This automatically produces:
1. **Short-Form Video Script** (Reels / TikTok talking clip with scene breakdown & duration)
2. **5-Slide Carousel Guide** (Slide titles, copy, and visual design direction)
3. **Before & After Visual Case Proof** (Comparison and caption)
4. **Caption-Only Micro-Blog Post** (LinkedIn / Meta feed format)
5. Auto-logs the assets to `data/tracking_sheet.csv` with status `PENDING_REVIEW`.

### 3. Review & Inspect Draft
```powershell
python cli.py view-draft --id LG-EDU-001
```

### 4. Human Approval Gate
```powershell
python cli.py approve --id LG-EDU-001 --notes "Approved for posting"
```
Generates a markdown brief in `distribution/ready_to_post/launchgremlin/LG-EDU-001_READY_TO_POST.md`.

### 5. Update Metrics & Paid Amplification Evaluation
```powershell
python cli.py update-metrics --id LG-EDU-001-TALK --views 1200 --saves 45 --comments 18 --shares 32
```
Automatically evaluates whether the organic performance meets the threshold for paid ad spend (per the 30/60/90 calendar).

### 6. View the Shared Tracking Sheet
```powershell
python cli.py show-tracking
```

---

## 🧪 Automated Testing

Run the test suite to verify all pipeline stages:
```powershell
python pilot_test.py
```

---

## 📁 Directory Structure

```
content-engine/
├── config/
│   ├── voices.py             # Voice guidelines for @LaunchGremlin & @needmoney4maserati
│   └── pillars.py            # Pillar definitions, weekly targets, CTAs
├── intake/
│   └── intake_manager.py     # Registry & tagging system for raw inputs
├── generators/
│   ├── llm_client.py         # Unified LLM client (Gemini/OpenAI + fallback)
│   ├── hook_generator.py     # 3-5 ranked candidate hooks with rationales
│   ├── script_generator.py   # Talking scripts, scene visual cues, captions
│   └── format_multiplier.py  # 4-way cross-platform format multiplication
├── tracker/
│   └── tracking_sheet.py     # Shared tracking CSV & paid spend evaluator
├── distribution/
│   ├── drafts/               # Pending review JSON packages
│   ├── ready_to_post/        # Human-ready markdown briefs
│   └── queue_manager.py      # Approval gate and queue manager
├── cli.py                    # Unified CLI command center
├── pilot_test.py             # End-to-end pilot verification suite
└── README.md
```
