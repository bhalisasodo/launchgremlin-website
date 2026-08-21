# Phase 0: Repository Audit & Architecture Assessment

**Date:** 2026-08-21  
**Project:** LaunchGremlin MCP Server  
**Author:** AI Staff Software Engineer & Infrastructure Lead  
**Specification:** [`docs/LaunchGremlin_MCP_Product_Implementation_Spec.md`](./LaunchGremlin_MCP_Product_Implementation_Spec.md)  
**Execution Prompt:** [`docs/Antigravity_LaunchGremlin_MCP_Implementation_Prompt.md`](./Antigravity_LaunchGremlin_MCP_Implementation_Prompt.md)

---

## 1. Executive Summary

This document presents the completed repository audit and architectural discovery for the **LaunchGremlin MCP Server**, executed strictly in accordance with Phase 0 requirements and Section 22 of the authoritative product specification.

The LaunchGremlin repository is a hybrid architecture comprising:
1. **Frontend:** React 18 SPA bundled with Vite 5 and Tailwind CSS v4, deployed to GitHub Pages (`launchgremlin.com`).
2. **Backend:** Node.js Express API (`backend/server.js`) with MongoDB / local JSON fallback (`leads.json`), JWT authentication, and SMTP email dispatch.
3. **Data Stores & Business Logic:** High-value business logic (services, scope calculation, pricing multipliers, and 100+ Content Hub articles) resides in clean, modular JavaScript modules under `src/utils/`.

---

## 2. Repository Discovery Checklist (Section 22 Resolution)

| # | Discovery Question | Repository Evidence & Findings | Resolution for MCP Server |
|---|---|---|---|
| **1** | Does an existing API expose services, pricing, or brand content, or does MCP need to read sources directly? | No REST API currently serves services/pricing/brand. Source of truth is structured ESM modules in `src/utils/scopePricingData.js`, `src/utils/seoData.js`, and `src/pages/AboutPage.jsx`. | MCP server will import/call these modules directly (or via a clean backend data-access layer) to avoid duplicating business logic or creating a shadow database. |
| **2** | What CMS/content system backs the Content Hub? Does it support published/draft distinction and full-text search? | Backed by `src/utils/blogData.js` (100+ articles across 10 clusters). All items in `blogData.js` are published. Drafts are managed in `content-engine/distribution/drafts/` via `/api/content-engine/drafts`. | MCP `search_content` will query published articles from `blogData.js`, enforcing published-only boundaries at the data layer. |
| **3** | What is LeadGremlin's data access layer? | Express API (`backend/server.js`) backed by MongoDB (with fallback to `backend/leads.json`). Endpoints: `GET /api/leads`, `POST /api/leads`, `PATCH /api/leads/:id`. | MCP server will act as a client to the Lead API or invoke shared data-access functions with strict scope enforcement. |
| **4** | What authentication system already exists? | JWT (`jsonwebtoken` v9.0.2) + `bcryptjs` password hashing against `ADMIN_PASSWORD_HASH`. Middleware: `authenticateToken`. | Can be reused directly. MCP server will validate Bearer JWTs or API keys mapped to specific roles/scopes. |
| **5** | Does a scope system exist for `leads:read` vs `leads:read:full`? | Currently, the API only checks `{ role: 'admin' }`. | A fine-grained scope authorization handler (`leads:read`, `leads:read:summary`, `leads:read:full`) will be implemented in the MCP auth middleware layer. |
| **6** | What language, framework, and package manager does the repo use? | JavaScript (Node.js ESM, React 18, Express 4), npm with lockfiles (`package-lock.json`). Node 20 target. | MCP server will be built in Node.js ESM to remain 100% native to the existing repository stack. |
| **7** | What hosting/deployment provider and CI/CD exist? | GitHub Pages for frontend (`.github/workflows/deploy.yml`), GitHub Actions CI (`.github/workflows/ci.yml`). Backend runs as a Node.js daemon. | MCP server can run as a standalone Node process (stdio or HTTP/SSE) or as an isolated subservice within `backend/`. |
| **8** | What logging/observability exists? | Standard `console.log` in Express. | MCP server will implement Section 15's structured JSON logging (`timestamp`, `trace_id`, `tool`, `duration_ms`, `caller_id`, `status`, redaction of PII). |
| **9** | Does "pricing" have non-public/negotiated tiers? | No. Pricing in `scopePricingData.js` uses standard public formulas (base price + sprint multipliers + add-ons). | All pricing data is public-tier. |
| **10** | Single-tenant or multi-tenant? | Single-tenant (LaunchGremlin-only). | MCP server is scoped exclusively to LaunchGremlin operations. |

---

## 3. Authoritative Data Sources for the 6 MVP Tools

| MCP Tool | Data Classification | Upstream Authoritative Source | Reusable Methods / Functions |
|---|---|---|---|
| `get_brand_context` | **Public** | `src/utils/seoData.js` (`BASE_SEO_DATA`), `src/pages/AboutPage.jsx`, `src/pages/HomePage.jsx` | Brand mission, founder background, core differentiators, target market. |
| `get_services` | **Public** | `src/utils/scopePricingData.js` (`SCOPE_PILLARS`, `TECHNICAL_ADDONS`, `TIMELINE_SPRINTS`) | Pillar listings (Web, Content, AI), deliverable descriptions, estimated turnaround. |
| `get_pricing` | **Public** | `src/utils/scopePricingData.js` (`calculateScopeQuote`, `CURRENCY_RATES`) | `calculateScopeQuote(selectedItemIds, sprintId, selectedAddonIds, currency)` |
| `search_content` | **Public** | `src/utils/blogData.js` (`BLOG_ARTICLES`, `BLOG_CLUSTERS`, `getArticlesByCluster`, `getArticleBySlug`) | Filterable by cluster, keyword, category; returns title, summary, slug, URL, headings. |
| `search_leads` | **Sensitive** (Scoped) | `backend/server.js` (`GET /api/leads`, MongoDB / `backend/leads.json`) | Filterable by service, status, budget, date range. Summary vs full record masking. |
| `get_lead` | **Sensitive** (Scoped) | `backend/server.js` (`GET /api/leads/:id`, MongoDB / `backend/leads.json`) | Requires `leads:read:full` for PII (email, phone, notes). Redacts PII if only `leads:read:summary`. |

---

## 4. Technical Risks & Mitigations

1. **Risk:** PII leakage in lead search/detail responses or logs.  
   *Mitigation:* Strict field-level redaction in tool handlers; structured logger explicitly omits `email`, `phone`, `company`, `notes`, and raw inputs from audit payloads.
2. **Risk:** Dual-mode backend storage (MongoDB in prod vs `leads.json` in dev).  
   *Mitigation:* Access lead data through the unified Express backend API or a shared repository adapter so storage mode is abstracted.
3. **Risk:** Transport mismatch with Gemini / client integrations.  
   *Mitigation:* Isolate transport adapter (support standard stdio and Streamable HTTP/SSE) using the official `@modelcontextprotocol/sdk`.

---

## 5. Required Environment Variables

| Variable Name | Purpose | Sensitivity | Default / Fallback |
|---|---|---|---|
| `MCP_API_KEY` | Bearer token for authenticating external AI clients / Gemini | Secret | Required in production |
| `JWT_SECRET` | Secret key used to verify scoped JWT tokens | Secret | `launchgremlin_super_secret_dev_key` (dev only) |
| `PORT` / `MCP_PORT` | Port for MCP HTTP/SSE transport (if running HTTP) | Config | `5001` (or integrated with `5000`) |
| `MONGODB_URI` | Connection string for live LeadGremlin database | Secret | Falls back to `backend/leads.json` |
| `LOG_LEVEL` | Minimum log severity (`debug`, `info`, `warn`, `error`) | Config | `info` |

---

## 6. Items Marked as "Repository Discovery Required" (Pending Stakeholder Confirmation)

1. **Target Gemini Client Surface:** Confirmation of whether the initial Gemini integration connects via local stdio (e.g. Antigravity / Claude Code / Cursor / CLI) or remote Streamable HTTP / Server-Sent Events (SSE).
   - *Architecture Plan:* Implement standard stdio and SSE transports via the official SDK so both environments work seamlessly out of the box.
