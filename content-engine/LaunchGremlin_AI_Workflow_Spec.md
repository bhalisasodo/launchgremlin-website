# LaunchGremlin — AI Content Workflow Spec
### For: Google Antigravity CLI Agent build
### Accounts: @LaunchGremlin · @needmoney4maserati

---

## 1. Purpose

Build a streamlined, semi-automated pipeline that takes raw source material (call recordings, event footage, competition submissions, Content Hub articles, founder updates) and turns it into ready-to-post Instagram/TikTok/Facebook content — hook, script, and final video/post — with minimal manual steps between "I have footage" and "it's scheduled."

Two accounts, one shared engine, different voice layers:

| | @LaunchGremlin | @needmoney4maserati |
|---|---|---|
| Covers pillars | Cold-call reels, vibe-coding events, music video competition, educational/Content Hub | Need Money for Maserati (narrative spine) |
| Voice | Warm, plain-language, client/craft-forward, per report's "credibility > founder face" | First-person, build-in-public, founder-forward |
| Source material | Prospect calls, event footage, competition entries, website Content Hub | Milestones/proof-points pulled *from* the other pillar's activity |

---

## 2. Pipeline Stages (shared architecture)

```
[1. INTAKE] → [2. HOOK GENERATION] → [3. SCRIPT/CAPTION] → [4. VIDEO/POST ASSEMBLY] → [5. QUEUE + LOG]
```

### Stage 1 — Intake
- Input types per pillar:
  - Cold-call reels: raw call clip/recording + prospect name/context (optional, respect privacy)
  - Vibe-coding events: batch footage dump (talking clips, before/after, testimonials) + event metadata (venue, date)
  - Music video competition: submitted videographer entries + entry metadata
  - Educational: Content Hub article/URL or feature-update note
  - Maserati: a "proof point" reference — a Maserati post is *always derived from* an event on one of the other four pillars, never generated standalone
- Each intake item gets tagged: `pillar`, `date`, `source_type`, `raw_file_path`

### Stage 2 — Hook Generation
- Given raw input + pillar tag, generate 3–5 candidate hooks (first line/first 2 seconds).
- Hooks should draw on the avatar-feed tone from the strategy report — problem/solution framing for LaunchGremlin, momentum/stakes framing for Maserati.
- Output: ranked hook list with a one-line rationale per hook (so a human can pick fast, not regenerate).

### Stage 3 — Script/Caption Generation
- Given chosen hook + raw input, generate:
  - Full script (for talking clips) OR carousel/caption copy (for static formats)
  - Platform-specific caption variants (IG, TikTok, FB — length/tone differences)
  - CTA appropriate to pillar (educational → soft CTA to Content Hub/business-card tool; Maserati → follow/watch-the-journey CTA; cold-call → book-a-call CTA)

### Stage 4 — Video/Post Assembly
- Combine script + raw footage into edited output (captions burned in, pacing cuts, format-appropriate crop for Reels/TikTok/Feed).
- Reuse-across-formats step (per report): one source item → talking clip + carousel + before/after image + caption-only post, generated in the same pass, not four separate manual jobs.

### Stage 5 — Queue + Log
- Drop finished assets into a per-account posting queue with suggested date/time.
- Log every post into the shared tracking sheet: `pillar, account, post_id, format, date, hook_used, views, saves, comments, shares, paid_spend`.
- This log is what later decides paid-amplification candidates (per the 30/60/90 calendar) — the agent should write to it automatically, not require manual entry.

---

## 3. What "Streamlined and Seamless" Means for the Build

- **One command per intake item** should ideally take raw footage/text all the way to a reviewable draft (hook + script + rough cut) — human only approves/edits, doesn't operate each stage manually.
- **Shared hook/script engine, account-specific voice config** — don't fork the pipeline per account; parameterize voice/tone/CTA by account so the two accounts stay maintainable as one codebase.
- **Human approval gate before posting** — full automation to *drafts*, manual approval before anything goes live (especially for cold-call content involving real prospects — privacy/consent check belongs here).
- **Everything traceable back to the tracking sheet** — every asset produced should carry its pillar/account/hook tags all the way through so performance data can be attributed without manual reconciliation.

---

## 4. Suggested Build Order for the Agent

1. Intake + tagging system (folder structure or lightweight DB)
2. Hook generation module (pillar-aware prompts)
3. Script/caption generation module (account voice configs)
4. Format-multiplication step (one input → multiple output formats)
5. Tracking sheet integration (auto-log on asset creation)
6. Queue/scheduling handoff (even if posting itself stays manual initially)

Start with the LaunchGremlin educational pillar as the pilot (lowest complexity, no event/privacy dependencies) before wiring in cold-call and event pillars.
