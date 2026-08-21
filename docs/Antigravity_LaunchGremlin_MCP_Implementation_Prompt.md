# Antigravity Implementation Prompt — LaunchGremlin MCP Server

You are acting as a Staff Software Engineer and AI Infrastructure Lead implementing the LaunchGremlin MCP server inside the existing LaunchGremlin repository.

You have been given, alongside this prompt, the authoritative specification: **`LaunchGremlin_MCP_Product_Implementation_Spec.md`**. That document is the source of truth for product requirements, tool schemas, security boundaries, and phasing. This prompt tells you *how* to execute against it inside this specific repository. Where this prompt and the spec conflict, the spec wins on product/security requirements; this prompt wins on process/workflow.

**Do not start coding yet.** Your first job is a full repository audit. You must not propose or make architectural decisions until you know what already exists.

Work through the phases below in order. Do not skip ahead. Do not silently merge phases. At the end of each phase, produce the phase's required report before moving to the next.

---

## Ground rules (apply to every phase)

- **Preserve existing functionality.** Nothing you do should break the current LaunchGremlin site, API, or LeadGremlin.
- **Avoid unnecessary rewrites.** Extend and reuse; don't refactor code that isn't in your way.
- **Follow existing repository conventions** — naming, folder structure, linting rules, commit style, test patterns. Match what's already there rather than introducing your own style.
- **Reuse, don't duplicate:**
  - Reuse existing services, existing authentication/authorization, existing data-access layers.
  - Do not create a second database unless the audit proves no viable data-access path exists, and even then, flag it explicitly for human approval before creating it.
  - Do not reimplement business logic that already exists elsewhere in the repo (pricing rules, lead status logic, etc.) — call into it.
- **Security defaults:**
  - Keep all secrets out of source control. Use environment variables. Never hard-code credentials, tokens, or keys.
  - Validate all external inputs at the MCP tool boundary, even if the caller is "trusted."
  - Never expose unrestricted database access or arbitrary SQL execution, at any phase.
  - Never log sensitive information (lead PII, secrets, tokens) — structured logs must redact or omit these fields.
- **Code quality:**
  - Use strict TypeScript typing (or the repository's existing language/type-strictness conventions if not TypeScript — confirm in Phase 0 and follow what's actually there).
  - Produce useful, non-leaky error messages (no stack traces or internal connection strings in responses).
  - Implement structured logging per Section 15 of the spec.
  - Write maintainable code; document non-obvious architectural decisions inline or in the architecture doc from Phase 1.
- **Scope boundary — read-only MVP:**
  - Do NOT implement automatic WhatsApp messaging, automatic email sending, destructive operations, unrestricted lead modification, or unrestricted database access.
  - Do NOT implement any tool beyond the six defined in the spec (`get_brand_context`, `get_services`, `get_pricing`, `search_content`, `search_leads`, `get_lead`) unless the spec's Section 11.8 Resource-form recommendation is being followed for the *same* underlying data.
  - Architect cleanly for future write/action tools (Phase 6 in the spec) but do not build them now.
- **Git discipline:**
  1. Inspect `git status` and recent history before touching anything. Understand what's already in flight.
  2. Never overwrite or clobber unrelated in-progress work. If you find uncommitted changes unrelated to this task, stop and report them rather than working around them silently.
  3. Make changes incrementally, in logically separable commits/checkpoints (even if you don't commit — see below).
  4. Run tests after every meaningful change, not just at the end.
  5. Run the production build before declaring any phase complete.
  6. Inspect the final diff yourself before reporting it.
  7. Document every assumption you had to make, inline in your report — not just in code comments.
  8. Never commit secrets, `.env` files, or credentials.
  9. **Do not commit anything unless the existing repository workflow clearly expects it** (e.g., there's an established pattern of feature-branch commits). If unsure, stop and ask rather than assuming you should commit.

---

## Phase 0 — Repository Audit (mandatory first step, no exceptions)

Do not write any implementation code in this phase. Inspect and report only.

Inspect and document:
1. **Project structure** — overall layout, monorepo vs. single app, where a new MCP module/service would naturally live.
2. **Package manager** — npm/yarn/pnpm/other, and lockfile state.
3. **Runtime** — Node version, any other runtime involved.
4. **TypeScript configuration** (or language/type setup if not TS) — strictness settings, path aliases, build tooling.
5. **Frontend** — framework, how it talks to the backend, whether it's relevant to MCP at all (likely not, but confirm).
6. **Backend/API** — framework, existing route/controller structure, existing REST/GraphQL surface for services, pricing, content, brand data.
7. **Database** — what's used, ORM/query layer, whether there's a clean data-access layer the MCP server could call into vs. raw queries scattered around.
8. **Authentication** — mechanism (session, JWT, OAuth, API keys), where it's implemented, whether it can be reused for MCP callers.
9. **Admin dashboard** — does one exist, does it already manage leads/content, would it need visibility into MCP activity (e.g., audit logs)?
10. **Lead/prospect data model** (LeadGremlin) — schema/fields, access layer (API vs. direct DB), existing status/territory enums, whether summary vs. full-record distinction already exists anywhere.
11. **Content system** — CMS or flat content, published/draft distinction, existing search capability (full-text index, tags, etc.) or absence of one.
12. **Environment variables** — current `.env`/config conventions, secret-management approach.
13. **Deployment configuration** — hosting provider, CI/CD pipeline, how services get deployed, whether a subdomain like `mcp.launchgremlin.com` is feasible given current DNS/infra, or whether the MCP server would need to be a route/module within an existing deployed service instead.
14. **Existing integrations** — anything already calling external AI APIs, MCP-related code, or automation that's relevant context.
15. **Existing API endpoints** — enumerate what already exposes services/pricing/brand/content/lead data, so MCP tools can call these rather than reinventing access.
16. **Existing business logic** — pricing calculation rules, lead scoring/status transitions, content publishing rules — identify what must be called into, not reimplemented.
17. **Existing tests** — test framework, coverage patterns, how to run the suite, so your Phase 5 tests match conventions.

**Explicitly answer every item in Section 22 ("Repository Discovery Checklist") of the spec**, citing file/module references as evidence, not assumptions.

**Phase 0 deliverable (required before proceeding):** A written architecture assessment covering: existing architecture summary, reusable services identified, authoritative data sources for each of the six tools' data (brand/services/pricing/content/leads), integration points, missing components, technical risks, required environment variables (names and purpose, not values), and deployment implications. Explicitly flag anything that remains "Repository Discovery Required" even after this audit (e.g., something only a human stakeholder can answer, such as confirming the target Gemini client/product).

Stop and present this assessment before proceeding to Phase 1.

---

## Phase 1 — Architecture

Using the Phase 0 findings and the spec's Section 8 (MCP Architecture) and Section 10 (Data Boundary), design the MCP integration for *this specific repository*.

- Decide, with justification grounded in Phase 0 findings: separate service vs. isolated module within the existing app. The spec expresses a preference for "ideally a separate service or clearly isolated module" — validate or override this based on actual repo structure and deployment constraints, and explain your reasoning.
- Map each of the six MVP tools to the specific existing API endpoint, service, or data-access function it will call. If no existing path exists for a given tool's data (e.g., brand context is static site copy with no API), say so explicitly and propose the smallest reasonable addition upstream — do not invent a parallel MCP-owned data store to work around the gap.
- Define the auth/authorization integration plan: how the MCP server will authenticate callers and check the `leads:read` (and, if applicable, `leads:read:full` vs `leads:read:summary`) scopes against the real auth system found in Phase 0.
- Confirm the data classification mapping (public/authenticated/internal/sensitive per spec Section 10) against the actual fields in the real lead/content data models.

**Phase 1 deliverable:** A short architecture decision doc (can be a markdown file in the repo, e.g., `docs/mcp-architecture.md`) covering the above, plus a directory/file layout for the new module or service. Present this before writing implementation code.

---

## Phase 2 — MCP Foundation

- Select the MCP SDK and transport based on: (1) the target deployment architecture confirmed in Phase 1, (2) the *current* official MCP specification/SDK (verify live — do not rely on possibly-outdated training knowledge of MCP SDK APIs), and (3) the current, verified requirements of the intended Gemini client integration (per spec Section 9 — this must be checked against current official documentation at implementation time, not assumed).
- Do not invent compatibility assumptions. If the Gemini-side transport requirements cannot be confirmed, implement against the standard MCP transport best supported by this repo's hosting setup, isolate the choice behind a clean interface, and flag the Gemini-specific adaptation as pending verification (matching spec Section 9's guidance) rather than guessing.
- Stand up: server bootstrap, auth middleware (wired to the real auth system from Phase 0/1), the standard error envelope from spec Section 14, structured logging from spec Section 15, and a health/info endpoint or Resource.
- No business tools yet — this phase proves the foundation works with a trivial placeholder tool/resource only.

**Phase 2 verification (required before proceeding):** Confirm the server starts successfully, a test client can connect over the selected transport, authentication is enforced, and a placeholder tool call returns a correctly-shaped response and a correctly-shaped error for a deliberately bad input.

---

## Phase 3 — Knowledge Tools/Resources

Implement, exactly per spec Section 11.1–11.4 and 11.8:
- `get_brand_context`
- `get_services`
- `get_pricing`
- `search_content`

For each: implement per the input/output schemas, validation rules, and error cases in the spec. Apply spec Section 11.8's guidance — implement Resource forms alongside the Tool forms wherever the spec recommends it (whole-object, unfiltered fetch cases), while keeping the Tool forms for filtered/parameterized queries.

Ensure `search_content` only ever returns published content (never drafts), per spec Section 10.1 and 11.4, filtering at the query level against the real content system found in Phase 0 — not just hiding drafts in the response.

**Phase 3 verification:** Each tool/resource callable and returning schema-correct output against real (or staging) data; invalid input produces the correct error code; content search never surfaces unpublished items (test this explicitly).

---

## Phase 4 — Lead Interface

Implement, exactly per spec Section 11.5–11.7 and Section 10.2:
- `search_leads`
- `get_lead`

This is the highest-risk phase. Strictly enforce:
- Authentication required for both tools — no anonymous path.
- Explicit `leads:read` authorization scope required, checked against the real auth/permission system from Phase 0/1 — not just checked in MCP-server-local logic that could be bypassed.
- Data minimization: `search_leads` returns summary fields only by default, per the spec's output schema; `get_lead` returns the full record only when the caller is authorized for it.
- Audit logging on every call to both tools: caller identity, timestamp, parameters/lead ID, result count — never full PII payloads in logs.
- No unrestricted database access, no arbitrary SQL, under any circumstance — all access goes through the existing LeadGremlin access layer identified in Phase 0.
- No mutating capability of any kind in this phase.

**Phase 4 verification (required, do not proceed without this):**
- An authenticated, correctly-scoped caller can successfully call both tools and receive correctly-minimized/full data as appropriate.
- An unauthenticated caller is rejected with `UNAUTHENTICATED`.
- An authenticated but under-scoped caller is rejected with `PERMISSION_DENIED`.
- Audit log entries are produced for every call and contain no raw PII beyond what's documented as acceptable.
- Attempt at least one adversarial input per tool (malformed ID, oversized query, injection-style string) and confirm safe, correctly-typed error handling with no data leakage.

---

## Phase 5 — Testing

Implement, matching the existing repository's test framework and conventions found in Phase 0:
- **Unit tests** per tool: valid input → valid output shape; invalid input → correct error code.
- **Integration tests** against real or staging upstream systems confirming returned data matches the source of truth (proxy-not-app principle).
- **MCP contract/schema tests** validating tool/resource schemas conform to what's documented in the spec and are stable/discoverable by a client.
- **Authorization tests** covering every unauthenticated/under-scoped access path identified in Phase 4.
- **Security tests** confirming: no SQL injection path, no path to bypass the `leads:read` scope, no sensitive data in logs or error messages.
- **Error-handling tests** covering every documented error code in spec Section 14 for every tool.

Run the full test suite and the production build. Fix failures before proceeding. Report pass/fail results verbatim, not summarized as "all passing" without evidence.

---

## Phase 6 — Deployment

- Prepare the service for production deployment following the deployment approach confirmed in Phase 0/1.
- If a dedicated subdomain such as `mcp.launchgremlin.com` fits the existing deployment architecture (confirmed in Phase 0), configure for it; if it does not fit (e.g., infra doesn't support easy subdomain provisioning, or the module lives inside the existing deployed app), do not force it — deploy as a route/module within the existing service instead and document why.
- Confirm all required environment variables are documented (names/purpose only, never values) and that none are missing for a clean deploy.
- Validate deployment configuration without actually pushing to production unless the existing repo workflow clearly expects that as part of this task — confirm with the operator before any production deploy action.

**Phase 6 verification:** Deployment configuration is valid and reviewable; no secrets present in any config committed to source control; the build that would be deployed is the one that passed Phase 5.

---

## Phase 7 — Documentation

Create or update documentation covering:
- Architecture (link to the Phase 1 decision doc).
- Local development setup for the MCP server.
- Environment variables (names and purpose).
- Authentication (how a client authenticates to the MCP server).
- MCP tools (full reference: name, purpose, schema, auth, errors — matching spec Section 11).
- MCP resources (if implemented per Phase 3).
- Deployment (how it's deployed, per Phase 6).
- Testing (how to run the suite).
- Client configuration (how an AI client, including the Gemini-based target client once confirmed, should be configured to connect).
- Security model (summarize spec Section 13, tailored to what was actually implemented).

Include, per spec Section 19, a short "what this server is NOT" note (not a database, not a second app, not a place for new business logic) to prevent future scope creep.

---

## Final Report (required output at the end of this task)

Regardless of how many phases you complete in one pass, report:
- **Files created** (full paths).
- **Files modified** (full paths, with a one-line description of the change per file).
- **Architecture decisions** made and their justification.
- **Tools implemented** (list, with current status: complete/partial).
- **Resources implemented** (list, with current status).
- **Tests added** (list, with what each covers).
- **Commands executed** (exact commands — install, test, build, etc.).
- **Test/build results** (verbatim pass/fail output, not paraphrased).
- **Unresolved issues** (anything blocking completion).
- **Assumptions made** (every place you had to decide something the spec or repo didn't make explicit).
- **Next steps** (what remains, mapped to the phase it belongs to).

---

## Reminder

Do not assume a database, API framework, deployment provider, package manager, authentication system, or Gemini MCP transport beyond what your Phase 0 audit confirms in this actual repository, or what current official MCP/Gemini documentation verifies at the time you implement Phase 2 and Phase 4/6. Where something cannot be confirmed, stop and report it as an open question rather than guessing — this applies at every phase, not just Phase 0.

Begin now with Phase 0 — Repository Audit. Do not proceed to Phase 1 until you have presented the Phase 0 deliverable.
