# LaunchGremlin MCP Server — Architecture Decision Document (Phase 1)

**Document Status:** Final (Architecture Decision Record)  
**Date:** 2026-08-21  
**Author:** AI Staff Software Engineer & Infrastructure Lead  
**Specification Reference:** [`docs/LaunchGremlin_MCP_Product_Implementation_Spec.md`](./LaunchGremlin_MCP_Product_Implementation_Spec.md)  
**Execution Reference:** [`docs/Antigravity_LaunchGremlin_MCP_Implementation_Prompt.md`](./Antigravity_LaunchGremlin_MCP_Implementation_Prompt.md)  

---

## 1. Architectural Strategy & Deployment Model

### 1.1 Decision: Isolated Subservice with Dual-Transport Entrypoints
We will implement the LaunchGremlin MCP server as an **isolated, modular subservice** located in `backend/mcp/`, equipped with dual-transport interfaces:
1. **`stdio` Transport (`backend/mcp/bin/cli.js`):** For local AI developer environments (Google Antigravity, Claude Code, Cursor, MCP CLI runners) without network latency.
2. **`Streamable HTTP / SSE` Transport (`backend/mcp/routes/sse.js`):** For remote AI clients, webhooks, and cloud-hosted agent workflows (e.g. Gemini / external AI workers).

### 1.2 Justification Grounded in Phase 0 Findings
- **Zero Redundant Infrastructure:** Avoids maintaining a detached repository or duplicate container deployment while keeping the MCP server completely decoupled from frontend web assets.
- **Zero Data Duplication:** Direct access to authoritative in-repo business logic (`src/utils/scopePricingData.js`, `src/utils/blogData.js`, `src/utils/seoData.js`) and database helpers (`backend/leads.json` / Mongoose `Lead` model) prevents the MCP server from becoming a "shadow database" or stale cache.
- **Strict Boundary Isolation:** All MCP tool logic, validation schemas, auth middlewares, and audit logs live exclusively within `backend/mcp/`, ensuring clean separation from the Express web server.

---

## 2. Tool-to-Source Mapping & Data Flow

Every MVP tool is mapped strictly to an authoritative upstream data source with zero synthetic reasoning:

```
+-----------------------------------------------------------------------------------+
|                              AI Client / Gemini / IDE                             |
+-----------------------------------------+-----------------------------------------+
                                          | MCP Protocol (stdio / SSE)
                                          v
+-----------------------------------------------------------------------------------+
|                        LaunchGremlin MCP Server (backend/mcp/)                    |
|  +-----------------------+------------------------+----------------------------+  |
|  | Input Validation (Zod)| Auth & Scope Middleware| Structured Audit Logger    |  |
|  +-----------------------+------------------------+----------------------------+  |
+-----------------------------------------+-----------------------------------------+
                                          |
        +---------------------------------+---------------------------------+
        | (Public Tools)                                                    | (Sensitive Tools)
        v                                                                   v
+--------------------------------+                          +-------------------------------+
| In-Memory Data Registries      |                          | LeadGremlin Storage Adapter   |
| • src/utils/scopePricingData.js|                          | • MongoDB (Mongoose Model)    |
| • src/utils/blogData.js        |                          | • backend/leads.json Fallback |
| • src/utils/seoData.js         |                          +-------------------------------+
+--------------------------------+
```

### Detailed Mapping:

| Tool Name | Class | Upstream Authoritative Function / Source | Parameters & Validation | Return Structure |
|---|---|---|---|---|
| **`get_brand_context`** | Public | `src/utils/seoData.js` (`BASE_SEO_DATA`) + `src/pages/AboutPage.jsx` | Optional `audience` (`"general"` \| `"technical"`) | Brand identity, mission, positioning, voice examples |
| **`get_services`** | Public | `src/utils/scopePricingData.js` (`SCOPE_PILLARS`, `TECHNICAL_ADDONS`) | Optional `category` (`"web"` \| `"content"` \| `"ai"`) | Array of services with deliverables & turnaround |
| **`get_pricing`** | Public | `src/utils/scopePricingData.js` (`calculateScopeQuote`, `CURRENCY_RATES`) | Optional `service_id`, `sprint_id`, `addons`, `currency` (`"USD"` \| `"ZAR"`) | Computed pricing items with rates & currency symbol |
| **`search_content`** | Public | `src/utils/blogData.js` (`BLOG_ARTICLES`, `BLOG_CLUSTERS`) | Required `query`, optional `limit` (max 50), `cursor` | Published articles matching query across title, description, content |
| **`search_leads`** | Sensitive | `backend/mcp/adapters/leadsAdapter.js` (`backend/leads.json` / Mongo) | Optional `status`, `service`, `query`, `limit` (max 25), `cursor` | Minimized lead summaries (`id`, `name`, `company`, `service`, `status`, `created_at`) |
| **`get_lead`** | Sensitive | `backend/mcp/adapters/leadsAdapter.js` (`backend/leads.json` / Mongo) | Required `lead_id` (validated format) | Complete lead record; contact PII unredacted only if `leads:read:full` |

---

## 3. Authentication, Scopes & Authorization

### 3.1 Authentication Mechanism
The MCP server enforces dual-mode authentication via `backend/mcp/middleware/auth.js`:
1. **Bearer JWT Token:** Validated against existing `JWT_SECRET` (from `backend/.env`). Decodes claims `{ role: string, scopes?: string[] }`.
2. **Pre-Shared API Key:** Validated against `MCP_API_KEY` (for automated background workers and external agent runners). API Key defaults to full operator scopes (`leads:read:full`).

### 3.2 Scope Hierarchy
- `public:read` — Implicit for all public tools (`get_brand_context`, `get_services`, `get_pricing`, `search_content`). No credentials required.
- `leads:read` / `leads:read:summary` — Allows `search_leads` and `get_lead` with PII masked (email/phone replaced with `"[REDACTED]"`).
- `leads:read:full` — Allows `search_leads` and `get_lead` with full unredacted contact information and private notes.

### 3.3 Authorization Failure Behavior
- Unauthenticated requests to sensitive tools return `UNAUTHENTICATED` (HTTP 401 equivalent).
- Authenticated requests lacking required scopes return `PERMISSION_DENIED` (HTTP 403 equivalent).
- No data existence leaks: Unauthorized callers cannot deduce lead existence from error responses.

---

## 4. Data Boundary & Field-Level Classification

| Field / Asset | Classification | Redaction / Masking Rule |
|---|---|---|
| Brand description, mission, values | **Public** | None |
| Service items, scope deliverables, turnaround | **Public** | None |
| Base prices, sprint multipliers, currency rates | **Public** | None |
| Published blog titles, summaries, slugs, URLs | **Public** | None |
| Content Hub Drafts (`/content-engine/drafts`) | **Internal** | Excluded at query layer; never returned by public search |
| Lead ID, Service Pillar, Status, Created Date | **Sensitive (Summary)** | Returned to `leads:read:summary` callers |
| Lead Name, Company Name | **Sensitive (Summary)** | Returned to `leads:read:summary` callers |
| Lead Email, Phone / WhatsApp | **Sensitive (PII)** | Redacted (`"[REDACTED]"`) unless `leads:read:full` |
| Lead Internal Notes & Specific Scoping Details | **Sensitive (Confidential)** | Redacted unless `leads:read:full` |

---

## 5. Standard Error Handling & Structured Logging

### 5.1 Error Envelope (Spec Section 14)
All MCP tools return structured error objects adhering to:
```json
{
  "error": {
    "code": "INVALID_ARGUMENT | UNAUTHENTICATED | PERMISSION_DENIED | NOT_FOUND | UPSTREAM_UNAVAILABLE | RATE_LIMITED | INTERNAL",
    "message": "Human-readable, non-sensitive description",
    "details": {}
  }
}
```

### 5.2 Structured Audit Logging (Spec Section 15)
Every tool invocation produces a structured JSON log entry:
- **Timestamp & Trace ID:** ISO-8601 UTC timestamp and UUID trace identifier.
- **Caller Context:** Caller ID and authenticated scopes (or `"anonymous"`).
- **Tool Metrics:** Tool name, execution duration in milliseconds, status (`SUCCESS` / `ERROR`).
- **PII Protection:** Parameters and outputs are strictly sanitized before logging. Lead emails, phone numbers, and full names are never written to log sinks.

---

## 6. Directory & File Layout

```
launchgremlin-website/
├── docs/
│   ├── LaunchGremlin_MCP_Product_Implementation_Spec.md
│   ├── Antigravity_LaunchGremlin_MCP_Implementation_Prompt.md
│   ├── phase0-repository-audit.md
│   └── mcp-architecture.md
└── backend/
    ├── leads.json
    ├── server.js
    └── mcp/
        ├── bin/
        │   └── cli.js                       # Stdio transport entrypoint
        ├── server.js                        # MCP Server factory & tool registration
        ├── config.js                        # Environment configuration
        ├── middleware/
        │   ├── auth.js                      # Token/API Key & scope verification
        │   ├── logger.js                    # Structured JSON audit logging
        │   └── errorHandler.js              # Error envelope formatter
        ├── adapters/
        │   ├── leadsAdapter.js              # Lead data access (MongoDB / leads.json)
        │   └── contentAdapter.js            # Content Hub query & search engine
        ├── tools/
        │   ├── getBrandContext.js           # Tool: get_brand_context
        │   ├── getServices.js               # Tool: get_services
        │   ├── getPricing.js                # Tool: get_pricing
        │   ├── searchContent.js             # Tool: search_content
        │   ├── searchLeads.js               # Tool: search_leads
        │   └── getLead.js                   # Tool: get_lead
        ├── resources/
        │   ├── brandContextResource.js      # Resource: launchgremlin://brand-context
        │   ├── servicesResource.js          # Resource: launchgremlin://services
        │   └── pricingResource.js           # Resource: launchgremlin://pricing
        └── test/
            ├── foundation.test.js           # Phase 2 verification tests
            ├── knowledgeTools.test.js       # Phase 3 verification tests
            └── leadInterface.test.js        # Phase 4 verification tests
```

---

## 7. Next Steps: Phase 2 Foundation

Upon approval of this Architecture Decision Document, execution proceeds immediately to **Phase 2 — MCP Foundation**:
1. Installing the official `@modelcontextprotocol/sdk` and `zod`.
2. Setting up the server factory, config, auth middleware, structured logger, and error envelope.
3. Exposing a server info/health check resource (`launchgremlin://health`) and verifying stdio connection.
