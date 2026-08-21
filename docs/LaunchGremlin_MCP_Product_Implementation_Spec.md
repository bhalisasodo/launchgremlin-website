# LaunchGremlin MCP Server — Product & Implementation Specification

**Status:** Authoritative specification (pre-implementation)
**Owner:** LaunchGremlin
**Document role:** This document is the single source of truth for the initial LaunchGremlin MCP server. A future implementation agent should read this document in full, then inspect the existing LaunchGremlin repository, before writing any code.

---

## 0. Review of the Preliminary Specification

Before presenting the authoritative spec, this section records the gaps found in the preliminary version so the reasoning is traceable.

### 0.1 Missing requirements
- No definition of who/what authenticates to the server (end user? AI client on behalf of a user? a service account?).
- No data model for "lead" — fields, PII classification, retention, source of truth.
- No mention of multi-tenancy (LaunchGremlin only, or eventually other LaunchGremlin clients like NO SKIP Records / Vai Taxi Courier?). This spec assumes **single-tenant, LaunchGremlin-only** unless repository discovery shows otherwise.
- No non-functional requirements (latency, availability, rate limits).
- No versioning strategy for the MCP surface itself.
- No explicit statement of transport (stdio vs. HTTP/SSE vs. streamable HTTP) — MCP supports several, and Gemini-side support varies and changes.

### 0.2 Ambiguous requirements
- "search_leads" / "get_lead" — unclear whether these are read-only lookups against LeadGremlin or a new lead store. Treated below as **read-only interfaces into the existing lead system**, not a new database.
- "controlled operations" is mentioned but never scoped — resolved below by explicitly deferring all mutating tools to Phase 6, gated separately.
- "compatible AI clients, including Gemini" — ambiguous about which transport/auth Gemini expects today. Flagged as Repository/External Discovery Required (Section 9).

### 0.3 Architectural risks
- Risk of the MCP server becoming a shadow backend (a second app) if it starts caching or duplicating LaunchGremlin data instead of proxying it live.
- Risk of unbounded tool surface growth without a resource/tool boundary policy.
- Risk of conflating "public marketing content" tools with "sensitive lead data" tools under one auth model.

### 0.4 Security risks
- Lead/prospect data is the highest-risk asset exposed by this server and was underspecified in the preliminary draft. This is addressed exhaustively in Sections 6, 10, and 11.
- No mention of prompt-injection risk from content ingested into `search_content` (e.g., a blog post containing adversarial instructions returned to an LLM client). Addressed in Section 10.8.
- No mention of tool-abuse protection (rate limiting, quota, anomaly detection) for a server that will eventually be reachable by third-party AI clients.

### 0.5 Scalability concerns
- `search_content` and `search_leads` both imply query/search capability; the preliminary spec does not say whether search is delegated to an existing system (e.g., Postgres full-text, existing CMS search) or reimplemented. This spec mandates delegation to existing systems (Section 1.3).

### 0.6 Missing MCP design decisions
- No Resources vs. Tools distinction — corrected in Section 4.
- No error taxonomy — corrected in Section 8.
- No pagination/limits on list-like tools (`search_content`, `search_leads`) — corrected in Section 5.

### 0.7 Missing acceptance criteria / operational requirements
- No Definition of Done, no logging/observability requirements, no deployment/config requirements. All added below (Sections 13–17).

### 0.8 Dependencies requiring repository discovery
Flagged throughout as **"Repository Discovery Required"** rather than assumed. See Section 18 for the consolidated discovery checklist.

---

## 1. Executive Summary

LaunchGremlin will expose a Model Context Protocol (MCP) server that gives compatible AI clients (including Gemini-based workflows, where supported) structured, permissioned, read-oriented access to LaunchGremlin's business information: brand context, services, pricing, published content, and — under stricter controls — lead/prospect data already held in LaunchGremlin's existing systems.

The MCP server is an **interface layer**, not a new application. It has no independent database of record for any entity that already has one. Its job is to translate MCP tool/resource calls into authenticated calls against LaunchGremlin's existing API(s), reusing existing auth, storage, and business logic wherever they exist.

The MVP is intentionally small: six read-only capabilities (five if `get_lead` is folded into `search_leads`), no write operations, and a single trust boundary between "public marketing data" and "internal lead data." Mutating capabilities are explicitly out of scope until Phase 6, and only after the read-only surface has been operated safely.

## 2. Product Vision

LaunchGremlin's authoritative business knowledge (who it is, what it sells, what it costs, what it has published, and who it's talking to) currently lives across a website, a content system, and a lead-management flow (LeadGremlin). Today, an AI assistant can only get at this by scraping HTML or being manually fed context.

The vision is for any MCP-compatible AI client to ask structured questions — "what services do we offer," "find prospects in Umhlanga we haven't contacted," "what's our positioning for a plumbing business" — and get accurate, permissioned, structured answers pulled live from LaunchGremlin's real systems, with the AI client doing the reasoning and the MCP server doing nothing but supplying verified facts and, later, tightly-scoped actions.

## 3. Problem Statement

- LaunchGremlin's business data is fragmented across a marketing site, a content hub, and LeadGremlin.
- There is no structured, machine-readable, permissioned way for an AI client to query this data; the only current option is HTML scraping, which is brittle, unstructured, and cannot respect data-sensitivity boundaries (e.g., it cannot distinguish public content from private lead data).
- As LaunchGremlin increases its use of agentic AI workflows (per existing practice), the absence of a structured interface becomes the limiting factor for further automation, especially around prospect research and outreach.

## 4. Goals and Non-Goals

### 4.1 Goals
1. Provide a small, secure, read-oriented MCP surface over existing LaunchGremlin systems.
2. Establish a clear, auditable trust boundary between public/marketing data and internal/lead data.
3. Make the server a thin proxy: no duplicated data stores, no shadow business logic.
4. Make the server extensible so future phases (Gemini integration, prospect-intelligence workflow, controlled write actions) can be added without re-architecting.
5. Ensure every tool has explicit input validation, output schema, auth requirements, and error handling from day one.

### 4.2 Non-Goals (for this spec / MVP)
- No write/mutating operations in the MVP (create, update, delete, send). All are deferred to Phase 6 and require separate authorization design.
- No arbitrary database or SQL access of any kind, at any phase.
- No new database of record — the MCP server does not "own" leads, services, pricing, or content.
- No general-purpose web scraping fallback; if an authoritative API for a data type doesn't exist yet, that tool is blocked until Repository Discovery confirms a source, rather than scraping HTML as a workaround.
- No multi-tenant support beyond LaunchGremlin unless repository discovery reveals this is already a shared platform.
- No assumption of a specific Gemini/MCP transport — see Section 9.

## 5. Users / AI Clients

| Actor | Description | Access level |
|---|---|---|
| LaunchGremlin operator (human) | Bhalisa or a future team member, acting through an AI client on their own behalf | Authenticated, full read scope including leads |
| Internal AI workflow client | An agentic workflow (e.g., a prospect-research pipeline) running with a scoped service credential | Authenticated, scoped read (may exclude lead PII depending on task) |
| Gemini-based client | External AI client connecting via MCP, subject to whatever auth Gemini's MCP integration requires | Authenticated only; no anonymous access to lead data ever |
| Public/anonymous AI client | Any client without valid credentials | Public-tier data only (brand, services, pricing, public content) — see Section 10.1 |

There is no anonymous access to lead/prospect data under any circumstance.

## 6. Core Use Cases

1. An AI client answers "What services does LaunchGremlin offer and what do they cost?" using `get_services` + `get_pricing`.
2. An AI client drafts brand-consistent copy using `get_brand_context`.
3. An AI client finds relevant published articles to reference in outreach using `search_content`.
4. An authenticated operator, via an AI client, looks up prospects matching criteria (`search_leads`) and retrieves one prospect's full record (`get_lead`) to prepare outreach.
5. (Future, Phase 5) An AI client chains all of the above to produce a personalized business case and outreach draft for a specific prospect — the AI reasons, the MCP server only supplies facts.

## 7. User Stories

- As the LaunchGremlin operator, I want an AI client to answer questions about my own services and pricing accurately, so I don't have to keep copy-pasting website content into prompts.
- As the LaunchGremlin operator, I want lead search restricted to my authenticated session, so prospect data is never exposed to an unauthenticated AI client.
- As a future coding agent, I want every tool to declare its inputs, outputs, and errors precisely, so I can implement without guessing.
- As a security reviewer, I want a documented data boundary and audit log, so I can verify lead data cannot leak through a misconfigured tool.

## 8. MCP Architecture

```
AI Client (operator-facing or Gemini-based)
        |
        | MCP (transport: Repository/External Discovery Required — see Section 9)
        v
LaunchGremlin MCP Server  (this project — stateless interface layer)
        |
        | authenticated calls, reusing existing auth
        v
Existing LaunchGremlin Systems
  +-- LaunchGremlin site/API (brand, services, pricing, content)
  +-- Content Hub / CMS (published articles, resources)
  +-- LeadGremlin (lead/prospect data, CRM)
```

Design principles:
- **Statelessness:** the MCP server holds no data of record. Every call either reads from or (later) writes to an existing system.
- **Proxy, not app:** business logic (pricing rules, lead scoring, content publishing workflow) stays in the existing systems. The MCP server does not reimplement it.
- **One trust boundary per data class:** public data tools require no auth; lead-data tools require full authentication and authorization, enforced at the MCP server and re-verified against the upstream system (never trust a cached permission).
- **Facts vs. reasoning:** the MCP server never generates prose, recommendations, or business cases. That is the AI client's job (see Section 12).

## 9. MCP Compatibility — Explicit Non-Assumptions

The preliminary spec references "Gemini-based workflows" and "Spark." MCP client support, transport options (stdio, HTTP+SSE, streamable HTTP), and Gemini's specific MCP integration requirements change over time and are **not** to be hard-coded into this spec or the implementation.

**Repository/External Discovery Required before Phase 4:**
- Which transport(s) the target Gemini client currently supports for remote MCP servers.
- Current authentication requirements for that transport (API key, OAuth, service account, etc.).
- Any Gemini-specific tool/resource naming, schema, or size constraints.
- Whether the target integration is "Gemini in a general sense" or a specific product (e.g., a specific Google AI product) — this must be confirmed with the operator and verified against current official documentation before Phase 4 begins, not assumed from this spec.

Until this discovery is complete, the MVP should be built against the standard MCP specification using a transport that is broadly supported (Repository Discovery Required to confirm which the existing stack can host, e.g., streamable HTTP vs. stdio for local dev), with Gemini-specific adaptation isolated to Phase 4 so it doesn't leak into the core tool implementations.

## 10. Data Boundary and Classification

All data exposed via the MCP server must be classified before any tool touches it.

| Class | Definition | Examples | Auth required |
|---|---|---|---|
| **Public** | Already published / intended for public consumption | Brand context, service descriptions, published pricing, published content/articles | None |
| **Authenticated** | Not secret, but not meant for anonymous/public tools | Draft or unpublished content, internal service notes | Valid session/credential |
| **Internal** | Operational business data not meant for external clients | Content Hub drafts, internal metrics | Valid credential + LaunchGremlin-operator scope |
| **Sensitive** | Personally identifiable or business-confidential | Lead/prospect name, contact details, notes, status, any LeadGremlin record | Valid credential + explicit lead-access scope; full audit logging required on every access |

### 10.1 Rules
1. No tool may return **Sensitive**-class data to a caller that hasn't been authenticated and explicitly authorized for lead access (Section 11.2).
2. No tool may mix classes silently — e.g., `search_content` (Public) must never be extended later to also surface Internal drafts without a distinct auth check and, ideally, a distinct tool.
3. The MCP server must never provide raw database or SQL access, at any classification level, at any phase.
4. Pricing and service data returned to AI clients must match what's actually published — the server must read from the same source the public site reads from, not a separate copy, to avoid drift.

### 10.2 Lead/Prospect data — special handling
- Lead data is the single highest-risk asset in this system.
- `search_leads` must support field-level minimization: default responses should return only what's needed for identification and triage (e.g., name, company, territory, status) unless the caller explicitly requests full detail via `get_lead` and is authorized for it.
- `get_lead` (full record) must be logged with caller identity, timestamp, and which lead was accessed, at minimum (see Section 10.9 Audit Logging).
- Lead data must never be used to train or fine-tune anything, cached beyond the request lifecycle, or persisted by the MCP server itself.

## 11. MCP Tools — MVP Surface

Evaluation of the proposed six tools: all six are appropriate as **Tools** (not Resources) because each requires parameters and returns a computed/filtered result rather than a static, addressable document. Section 11.8 discusses what *should* be Resources instead.

Common conventions for every tool below:
- All responses are JSON.
- All list-returning tools support pagination (`limit`, `cursor`) to bound response size and prevent abuse.
- All tools validate input server-side even if the AI client is trusted, per least-privilege/defense-in-depth.
- All tools return a standard error envelope (Section 8's sibling, Section 14).

### 11.1 `get_brand_context`
- **Purpose:** Return LaunchGremlin's brand voice, positioning, and tone guidance for use in AI-generated content.
- **Class:** Public.
- **Input parameters:** none required. Optional: `audience` (string enum, e.g., `general | technical`) if the repository's brand content is segmented — **Repository Discovery Required** to confirm whether segmentation exists.
- **Validation:** `audience`, if provided, must match a known enum value; otherwise return `INVALID_ARGUMENT`.
- **Output structure:**
```json
{
  "brand_name": "string",
  "positioning": "string",
  "tone_guidelines": "string",
  "target_audience": "string",
  "voice_examples": ["string"]
}
```
- **Auth:** None required (public tier).
- **Authorization:** N/A.
- **Expected errors:** `INVALID_ARGUMENT` (bad `audience`), `UPSTREAM_UNAVAILABLE` (source system down).
- **Read-only.**
- **Example invocation:** `get_brand_context()`
- **Example response:** as above, populated from the live brand-context source (Repository Discovery Required to confirm exact source: CMS field, config file, or site content).

### 11.2 `get_services`
- **Purpose:** Return LaunchGremlin's current service catalog.
- **Class:** Public.
- **Input parameters:** optional `category` (string) to filter.
- **Validation:** `category` must be a known category if provided; else `INVALID_ARGUMENT`.
- **Output structure:**
```json
{
  "services": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "category": "string"
    }
  ]
}
```
- **Auth:** None required.
- **Expected errors:** `INVALID_ARGUMENT`, `UPSTREAM_UNAVAILABLE`.
- **Read-only.**
- **Example invocation:** `get_services(category="web")`
- **Example response:** array of matching services as above.

### 11.3 `get_pricing`
- **Purpose:** Return current published pricing for one or more services.
- **Class:** Public (published pricing only — never internal/negotiated pricing unless that concept doesn't exist, to be confirmed via Repository Discovery).
- **Input parameters:** optional `service_id` (string) to scope to one service.
- **Validation:** if `service_id` provided, must correspond to a real service (validated against `get_services`' source) or return `NOT_FOUND`.
- **Output structure:**
```json
{
  "pricing": [
    { "service_id": "string", "name": "string", "price": "string", "currency": "string", "billing_period": "string" }
  ]
}
```
- **Auth:** None required.
- **Expected errors:** `INVALID_ARGUMENT`, `NOT_FOUND`, `UPSTREAM_UNAVAILABLE`.
- **Read-only.**
- **Example invocation:** `get_pricing(service_id="website-launch")`

### 11.4 `search_content`
- **Purpose:** Search LaunchGremlin's published Content Hub / resources for relevant articles.
- **Class:** Public (published content only — must not surface drafts; if the Content Hub has a draft/unpublished state, this tool must filter to published-only at the query level, not just in presentation).
- **Input parameters:** `query` (string, required), `limit` (int, default 10, max 50), `cursor` (string, optional).
- **Validation:** `query` non-empty, max length (e.g., 500 chars) to prevent abuse; `limit` clamped to max.
- **Output structure:**
```json
{
  "results": [
    { "id": "string", "title": "string", "summary": "string", "url": "string", "published_at": "ISO8601" }
  ],
  "next_cursor": "string|null"
}
```
- **Auth:** None required.
- **Expected errors:** `INVALID_ARGUMENT`, `UPSTREAM_UNAVAILABLE`.
- **Read-only.**
- **Prompt-injection note:** returned `summary`/`title` fields are user/CMS-authored text that will be fed into an AI client's context. The server should pass this through as inert data fields (not as instructions) and the response schema should make clear to any well-behaved client that these are data, not directives. This does not fully eliminate prompt-injection risk on the client side, but the server must not itself execute or interpret content it retrieves.
- **Example invocation:** `search_content(query="pricing for small business websites", limit=5)`

### 11.5 `search_leads`
- **Purpose:** Search leads/prospects in LeadGremlin by criteria (e.g., territory, status).
- **Class:** Sensitive.
- **Input parameters:** `query` (string, optional — free text), `territory` (string, optional), `status` (string enum, optional), `limit` (int, default 10, max 25 — deliberately lower cap than public search), `cursor` (string, optional).
- **Validation:** all filters validated against known enums/formats; `query` length-capped; if no filter and no query provided, require at least one to prevent "dump all leads" calls — return `INVALID_ARGUMENT` otherwise.
- **Output structure (minimized by default):**
```json
{
  "leads": [
    { "id": "string", "name": "string", "company": "string", "territory": "string", "status": "string" }
  ],
  "next_cursor": "string|null"
}
```
- **Auth:** Required — valid authenticated session.
- **Authorization:** Caller must have explicit lead-access scope (Section 11 Security). Public/unauthenticated and Gemini clients without this scope receive `PERMISSION_DENIED`, not a filtered empty result (to avoid leaking existence-of-data signals ambiguously — the error should be unambiguous).
- **Expected errors:** `UNAUTHENTICATED`, `PERMISSION_DENIED`, `INVALID_ARGUMENT`, `UPSTREAM_UNAVAILABLE`.
- **Read-only.**
- **Audit:** every call logged (caller identity, filters used, result count — not full result payload, to avoid duplicating PII into logs).
- **Example invocation:** `search_leads(territory="Umhlanga", status="new")`

### 11.6 `get_lead`
- **Purpose:** Retrieve the full record for a single lead by ID.
- **Class:** Sensitive.
- **Input parameters:** `lead_id` (string, required).
- **Validation:** `lead_id` format-checked; must resolve to an existing lead or return `NOT_FOUND`.
- **Output structure:**
```json
{
  "id": "string",
  "name": "string",
  "company": "string",
  "contact": { "email": "string|null", "phone": "string|null" },
  "territory": "string",
  "status": "string",
  "notes": "string|null",
  "created_at": "ISO8601",
  "last_updated": "ISO8601"
}
```
- **Auth:** Required.
- **Authorization:** Explicit lead-access scope required; same-scope model as `search_leads`.
- **Expected errors:** `UNAUTHENTICATED`, `PERMISSION_DENIED`, `NOT_FOUND`, `UPSTREAM_UNAVAILABLE`.
- **Read-only.**
- **Audit:** every call logged individually with full identity + lead ID, per Section 10.2.
- **Example invocation:** `get_lead(lead_id="lead_8f21")`

### 11.7 Refinement note
`search_leads` and `get_lead` are kept as two distinct tools rather than merged, specifically so that list-level access (lower sensitivity — summary fields only) and record-level access (higher sensitivity — full PII) can carry **different authorization scopes** if the operator ever wants to grant one without the other (e.g., a workflow that can triage by territory but not see contact details).

### 11.8 Tools vs. Resources
MCP Resources are appropriate for **static or slowly-changing, directly addressable** content rather than parameterized queries. Recommendation:
- Consider exposing `get_brand_context`'s output additionally as a **Resource** (e.g., `launchgremlin://brand-context`) since it's usually fetched whole and rarely filtered — this lets simple clients read it without a tool call. Keep `get_brand_context` as a Tool too for clients that only support tool-calling and for the optional `audience` filter.
- `get_services` and `get_pricing` could similarly have a Resource form (`launchgremlin://services`, `launchgremlin://pricing`) for the unfiltered case, with the Tool form remaining for filtered queries.
- `search_content`, `search_leads`, and `get_lead` should remain Tools only — they are inherently parameterized/query-shaped and `get_lead`/`search_leads` must never be exposed as a generically-addressable Resource given their sensitivity (a Resource URI is easier to enumerate/guess against than a validated tool call).

This dual exposure (Resource for the whole-object public case, Tool for filtered/sensitive cases) is a **recommendation for Phase 2 refinement**, not required for the initial MVP cut, which may ship Tools-only.

## 12. The Facts-vs-Reasoning Boundary

This must be explicit throughout implementation and documentation:
- The MCP server supplies **verified, structured facts** pulled live from LaunchGremlin's systems.
- The MCP server never generates a business case, outreach message, recommendation, or summary opinion. That is the responsibility of the AI client.
- Concretely: `search_leads` + `get_lead` + `get_services` + `get_pricing` + `get_brand_context` may all be called in sequence by an AI client building toward "generate a business case for this prospect," but the MCP server's role stops at returning the facts each tool promises — it does not have a `generate_business_case` tool in the MVP or in Phase 5. If a synthesis tool is ever added, it must be documented as reasoning-adjacent and reviewed separately for prompt-injection and hallucination risk, since at that point the server would be shaping AI output rather than supplying facts.

## 13. Security Architecture

### 13.1 Authentication
- Every non-public tool requires an authenticated caller. **Repository Discovery Required** to determine whether to reuse the existing LaunchGremlin/LeadGremlin auth system (preferred) or introduce a new credential type solely for MCP access.
- Service-to-service callers (internal AI workflows) should use scoped service credentials, not the operator's personal credentials, so access can be revoked/rotated independently.

### 13.2 Authorization / least privilege
- Minimum two scopes: `public:read` (implicit, no credential needed) and `leads:read` (explicit grant required). A third scope, `leads:read:full` vs `leads:read:summary`, is recommended per Section 11.7 if the upstream system can express it.
- No caller, including the operator's own AI client, should hold write scope until Phase 6 is explicitly designed and approved.

### 13.3 Secret management
- No credentials, API keys, or tokens are ever hard-coded in the MCP server code or committed to the repository.
- Secrets are sourced from whatever secret-management approach the existing repository already uses. **Repository Discovery Required.**

### 13.4 Rate limiting
- Per-caller rate limits on all tools, with a stricter limit on `search_leads`/`get_lead` than on public tools, to reduce the blast radius of a compromised or misbehaving client scraping lead data.

### 13.5 Audit logging
- Every call to a Sensitive-class tool logs: timestamp, caller identity, tool name, key parameters (e.g., `lead_id`, filters — not full PII payloads), and result count/outcome.
- Public-tier tools may be logged at a lower fidelity (aggregate metrics) for observability, not per-PII audit.

### 13.6 Input validation
- Every tool validates types, lengths, and enums server-side, regardless of client trust level, per the parameter tables in Section 11.

### 13.7 Data minimization
- Default responses return the minimum fields needed (see `search_leads` summary vs. `get_lead` full record).
- No tool should return more fields "for convenience" than its stated purpose requires.

### 13.8 Prompt-injection considerations
- Content returned by `search_content` (and any future free-text field) is untrusted with respect to instruction-following: the server treats it purely as data and does not execute, interpret, or forward it as system/instruction text. This is primarily a client-side mitigation concern, but the server's schema should clearly label these fields as content, not directives, and the server itself must never construct prompts internally from this content (it has no reasoning role — Section 12).

### 13.9 Tool abuse protection
- Combination of rate limiting (13.4), authorization scopes (13.2), and audit logging (13.5) constitutes the primary abuse-protection mechanism for the MVP. Anomaly detection (e.g., unusual volume of `get_lead` calls) is a Phase 3+ hardening item, not required for initial launch, but should be a named backlog item.

### 13.10 Protection against unauthorized write operations
- The MVP ships with **zero** mutating tools. This is itself the primary protection. When Phase 6 introduces mutations, each mutating tool must additionally define: confirmation/idempotency requirements, a distinct write scope, and stricter audit logging (before/after state where feasible).

## 14. Error Handling

Standard error envelope for all tools:
```json
{
  "error": {
    "code": "INVALID_ARGUMENT | UNAUTHENTICATED | PERMISSION_DENIED | NOT_FOUND | UPSTREAM_UNAVAILABLE | RATE_LIMITED | INTERNAL",
    "message": "human-readable, non-sensitive description",
    "details": "optional, non-sensitive structured context"
  }
}
```
Rules:
- Error messages must never leak internal system details (stack traces, upstream connection strings, raw upstream error bodies).
- `PERMISSION_DENIED` vs `NOT_FOUND` must be chosen carefully for lead tools: prefer `PERMISSION_DENIED` when the caller lacks scope entirely, and `NOT_FOUND` only when scoped correctly but the record doesn't exist, to avoid inconsistent signals about record existence to unauthorized callers.

## 15. Logging & Observability

- Structured (JSON) logs for every tool call: timestamp, tool name, caller identity (or "anonymous" for public tier), outcome, latency.
- Sensitive-tier calls additionally logged per Section 13.5.
- Metrics: call volume per tool, error rate per tool, latency per tool, at minimum.
- **Repository Discovery Required** to determine whether to integrate with an existing logging/observability stack or stand up a minimal one for this service.

## 16. Testing

- Unit tests per tool: valid input → valid output shape; invalid input → correct error code; unauthorized caller → `PERMISSION_DENIED`/`UNAUTHENTICATED`.
- Integration tests against the real upstream systems (or their staging equivalents) to confirm the "proxy, not app" principle holds — i.e., data returned matches upstream source of truth.
- Security tests: confirm no path exists for an unauthenticated or under-scoped caller to reach `search_leads` or `get_lead` data, including via malformed/edge-case input.
- Load/rate-limit tests: confirm rate limiting actually engages before abuse thresholds.

## 17. Deployment & Configuration

- **Repository Discovery Required** for: hosting/deployment provider, package manager, language/runtime, existing CI/CD pipeline, and whether this should be a new service or a module within the existing LaunchGremlin app.
- Configuration (upstream API base URLs, scopes, rate-limit thresholds) must be externalized (env vars / config files), never hard-coded.
- No assumption of a specific database — this server should not need one if it stays a true proxy; if any caching layer is introduced later for performance, it must be documented as a cache (with TTL and invalidation strategy), never as a data store of record.

## 18. Versioning

- The MCP tool surface is versioned independently from the LaunchGremlin application (e.g., a `server_version` reported via a health/info endpoint or Resource).
- Breaking changes to any tool's input/output schema require a version bump and, where feasible, a deprecation window rather than an in-place breaking change, since AI clients may cache tool schemas.

## 19. Documentation Requirements

- This spec itself, kept up to date as the authoritative reference.
- A generated/maintained tool reference (name, purpose, schema, auth, errors) suitable for onboarding a new AI client or developer.
- A short "what this server is NOT" section in developer-facing docs (not a database, not a second app, not a place to add business logic) to prevent scope creep, referencing Section 4.2.

## 20. Acceptance Criteria (MVP)

- [ ] All six tools (`get_brand_context`, `get_services`, `get_pricing`, `search_content`, `search_leads`, `get_lead`) implemented exactly per Section 11 schemas.
- [ ] Zero mutating tools present.
- [ ] Zero raw database/SQL access present, verified by code review.
- [ ] `search_leads` and `get_lead` unreachable without valid authentication AND explicit lead-access scope, verified by security test.
- [ ] All tools return the standard error envelope (Section 14) for all documented error cases.
- [ ] All Sensitive-class calls produce an audit log entry per Section 13.5.
- [ ] Rate limiting active and verified on all tools, stricter on lead tools.
- [ ] No data duplicated/cached as a store of record; all responses traceable to a live upstream call (or a documented, TTL'd cache).
- [ ] Repository Discovery checklist (Section 22) fully resolved and recorded before Phase 4 (Gemini integration) begins.

## 21. Definition of Done (MVP)

The MVP is done when: all Section 20 acceptance criteria pass; the tool reference documentation (Section 19) is published; the server has been exercised end-to-end by at least one real AI client against real (or staging) LaunchGremlin data for each of the six tools; and a security review confirms the data-boundary rules in Section 10 hold under test.

## 22. Repository Discovery Checklist

To be completed by the implementation agent against the actual LaunchGremlin repository before finalizing architecture decisions:

1. Does an existing API already expose services/pricing/brand content, or does the MCP server need to read the site/CMS source directly?
2. What CMS/content system backs the Content Hub, and does it support a published/draft distinction and full-text search natively?
3. What is LeadGremlin's data access layer — a REST API, direct DB access from the same codebase, or something else? Confirm the MCP server can call it as a client rather than reaching into its database directly.
4. What authentication system does LaunchGremlin/LeadGremlin already use (session-based, JWT, OAuth, API keys)? Can it be reused for MCP callers?
5. Does an existing scope/permission system exist that can express `leads:read` vs `leads:read:full`, or does one need to be added?
6. What language/framework/package manager does the existing repo use, to keep the MCP server consistent rather than introducing a new stack unnecessarily?
7. What hosting/deployment provider and CI/CD pipeline already exist?
8. What logging/observability tooling, if any, already exists to integrate with?
9. Does "pricing" have any non-public/negotiated tier, or is all published pricing effectively public?
10. Is LaunchGremlin single-tenant today, or could this server need to eventually serve other ventures (e.g., NO SKIP Records, Vai Taxi Courier) — confirm scope stays LaunchGremlin-only for this spec unless told otherwise.

## 23. Implementation Phases

### Phase 0 — Repository Audit
- **Objective:** Resolve every item in Section 22 before any code is written.
- **Deliverables:** A short findings document answering each discovery question.
- **Dependencies:** Read access to the LaunchGremlin repository/repositories.
- **Acceptance criteria:** All 10 discovery questions answered with evidence (file/module references), not assumptions.
- **Risks:** Discovery reveals no existing API for one or more data types (e.g., brand context lives only as static site copy) — if so, document the gap explicitly rather than inventing a new data store; the correct fix may be a small addition to the existing site/CMS, not a new MCP-owned database.

### Phase 1 — MCP Foundation
- **Objective:** Stand up a minimal MCP server (no business tools yet) with auth, error envelope, logging, and rate-limiting scaffolding in place.
- **Deliverables:** Running server exposing a health/info endpoint or Resource; auth middleware; standard error envelope implemented; structured logging wired up.
- **Dependencies:** Phase 0 complete (auth system and hosting decisions known).
- **Acceptance criteria:** A test client can connect, authenticate, and receive a well-formed response/error from a placeholder tool.
- **Risks:** Choosing a transport before Gemini requirements are confirmed (mitigated by keeping transport choice isolated per Section 9).

### Phase 2 — LaunchGremlin Knowledge Interface
- **Objective:** Implement `get_brand_context`, `get_services`, `get_pricing`, `search_content` exactly per Section 11.
- **Deliverables:** Four working, tested, public-tier tools; optional Resource forms per Section 11.8.
- **Dependencies:** Phase 1; confirmed upstream sources from Phase 0.
- **Acceptance criteria:** Section 20's criteria for these four tools; integration tests confirm live data matches the public site/CMS.
- **Risks:** Content Hub search capability may not exist upstream and may need to be added there first (per the "reuse, don't duplicate" principle) rather than reimplemented in the MCP server.

### Phase 3 — Lead Interface
- **Objective:** Implement `search_leads` and `get_lead` with full auth, authorization, and audit logging.
- **Deliverables:** Two working, tested, Sensitive-tier tools; audit log pipeline; lead-access scope enforced end-to-end.
- **Dependencies:** Phase 0's confirmation of LeadGremlin's access layer and auth/scope system; Phase 1's auth middleware.
- **Acceptance criteria:** Security tests in Section 16 pass; no path to lead data without correct scope.
- **Risks:** This is the highest-risk phase — do not proceed to Phase 4/5 until this phase's security review is independently confirmed, not just self-tested.

### Phase 4 — Gemini/Client Integration
- **Objective:** Confirm and implement whatever transport/auth the target Gemini client currently requires (Section 9), and validate the full read-only tool surface against a real Gemini-based client.
- **Deliverables:** Verified transport configuration; documented client-connection instructions; end-to-end test with a real client.
- **Dependencies:** Phases 1–3 complete; Section 9 external discovery complete and current as of implementation time.
- **Acceptance criteria:** A real Gemini-based client can successfully call all six MVP tools and receive correctly-scoped responses/errors.
- **Risks:** Gemini's MCP support may change between spec-writing and implementation — re-verify against current official documentation immediately before this phase, not from this spec.

### Phase 5 — Prospect Intelligence Workflow
- **Objective:** Validate (not implement as a new tool) the chained workflow in Section 6/12 — search leads → get lead → get services → get pricing → get brand context — as consumed by an AI client to produce a business case, with the MCP server strictly supplying facts.
- **Deliverables:** A documented example/reference workflow; confirmation that no new server-side reasoning tool was needed.
- **Dependencies:** Phases 2–4 complete.
- **Acceptance criteria:** An AI client can complete the full chain using only existing tools; the facts-vs-reasoning boundary (Section 12) holds — the server added no synthesis logic.
- **Risks:** Temptation to add a `generate_business_case` tool for convenience — resist per Section 12 unless separately specified and security-reviewed.

### Phase 6 — Controlled Write/Action Capabilities
- **Objective:** Design (separately from this document) any mutating tools, e.g., updating lead status, logging outreach activity.
- **Deliverables:** A new, dedicated spec addendum covering write scopes, confirmation/idempotency, and audit requirements for each mutating tool, following the same rigor as Section 11.
- **Dependencies:** Phases 1–5 operating safely in production for a meaningful period.
- **Acceptance criteria:** Not defined in this document — Phase 6 requires its own acceptance criteria once scoped.
- **Risks:** Write access to lead data materially raises the risk profile; do not begin design work on this phase until the read-only system has demonstrated reliable auth/authorization/audit behavior in real use.

## 24. Future Roadmap (Beyond Phase 6)

- Field-level, per-caller permission policies (e.g., different AI clients see different lead fields).
- Anomaly detection on tool-call patterns (Section 13.9).
- Optional Resource forms for all public-tier tools (Section 11.8) if client feedback shows demand.
- Possible multi-tenant extension if LaunchGremlin's other ventures (NO SKIP Records, Vai Taxi Courier) need a similar interface — would require a new, separate discovery and spec, not a silent extension of this one.

---

**Reminder to the implementation agent:** Do not assume a database, API framework, deployment provider, package manager, authentication system, or Gemini MCP transport beyond what Section 22's Repository Discovery Checklist confirms, or what current official documentation verifies at implementation time. Where discovery is incomplete, mark the affected decision as "Repository Discovery Required" in your own implementation notes rather than guessing.
