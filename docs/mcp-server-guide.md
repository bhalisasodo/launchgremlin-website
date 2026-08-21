# LaunchGremlin MCP Server — Complete Operator & Developer Guide

**Server Name:** `launchgremlin-mcp-server`  
**Version:** `1.0.0`  
**Protocol:** Model Context Protocol (MCP)  
**Location:** [`backend/mcp/`](../backend/mcp)  

---

## 1. Overview

The **LaunchGremlin MCP Server** provides a secure, deterministic Model Context Protocol interface exposing LaunchGremlin's brand positioning, service catalog, transparent pricing engine, published Content Hub guides, and LeadGremlin prospect pipeline to AI assistants and autonomous workflows.

---

## 2. Quickstart & Client Configuration

### 2.1 Starting the Server Locally (stdio)
```bash
# From workspace root
npm run mcp

# Or directly from backend
npm --prefix backend run mcp
```

### 2.2 Antigravity / Claude Code / Cursor MCP Configuration
Add the server configuration to your MCP settings file (e.g. `mcpServers` in `antigravity.config.json` or `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "launchgremlin": {
      "command": "node",
      "args": [
        "C:\\Users\\bhali\\launchgremlin-website\\backend\\mcp\\bin\\cli.js"
      ],
      "env": {
        "MCP_API_KEY": "lg_mcp_dev_key_2026",
        "NODE_ENV": "production"
      }
    }
  }
}
```

---

## 3. Tool Reference

### 3.1 Public Knowledge Tools (Implicit `public:read`)

#### 1. `get_brand_context`
- **Description:** Returns LaunchGremlin's operating philosophy, positioning, tone guidelines, and founder background.
- **Parameters:**
  - `audience` (*optional, enum: `'general'` | `'technical'`*): Target audience context.

#### 2. `get_services`
- **Description:** Returns LaunchGremlin's active service catalog, deliverables, and estimated sprint turnaround times.
- **Parameters:**
  - `category` (*optional, enum: `'web'` | `'content'` | `'ai'` | `'all'`*): Filter services by pillar.

#### 3. `get_pricing`
- **Description:** Returns published transparent investment pricing and sprint models.
- **Parameters:**
  - `service_id` (*optional, string*): Specific service identifier (e.g. `'web-landing'`, `'ai-rag-search'`).
  - `currency` (*optional, enum: `'USD'` | `'ZAR'`*): Target currency (defaults to `'USD'`).

#### 4. `search_content`
- **Description:** Full-text search across 100+ published strategic guides and articles in the Content Hub. Strictly excludes drafts.
- **Parameters:**
  - `query` (*required, string, 1..500 chars*): Search query or keywords.
  - `limit` (*optional, int 1..50, default 10*): Max items to return.
  - `cursor` (*optional, string*): Pagination offset cursor.

---

### 3.2 Sensitive Lead Interface Tools (Requires `leads:read:summary` or `leads:read:full`)

#### 5. `search_leads`
- **Description:** Searches prospective clients and inbound inquiries with field-level privacy minimization (contact info excluded).
- **Parameters:**
  - `query` (*optional, string*): Free-text search across client name, company, or challenge.
  - `status` (*optional, enum: `'New'` | `'Contacted'` | `'In Progress'` | `'Archived'` | `'all'`*): Lead status filter.
  - `service` (*optional, string*): Requested service pillar.
  - `territory` (*optional, string*): Market region.
  - `limit` (*optional, int 1..25, default 10*): Max leads to return.
  - `cursor` (*optional, string*): Pagination offset cursor.
- **Defense:** At least one filter must be provided; unbounded "dump all leads" calls are rejected.

#### 6. `get_lead`
- **Description:** Retrieves complete record details for a specific prospect lead in LeadGremlin by ID.
- **Parameters:**
  - `lead_id` (*required, string*): Unique identifier of the lead.
- **Privacy Masking:**
  - `leads:read:summary`: `contact.email`, `contact.phone`, and `notes` are masked as `"[REDACTED]"`.
  - `leads:read:full`: Complete unredacted record with verified contact details.

---

## 4. Resource Endpoints (Direct Addressable URIs)

- `launchgremlin://health` — Server health, uptime, and version metrics.
- `launchgremlin://brand-context` — Complete static brand context and positioning document.
- `launchgremlin://services` — Full service catalog with deliverables and technical add-ons.
- `launchgremlin://pricing` — Published pricing matrix in USD & ZAR, exchange rates, and sprint models.

---

## 5. Security, Auth & Structured Logging

### 5.1 Authentication
- **Bearer JWT:** Verified against `JWT_SECRET` (supports `role: "admin"` or `scopes: ["leads:read:summary"]`).
- **API Key:** Pre-shared key verified against `MCP_API_KEY` (grants `leads:read:full`).

### 5.2 Standard Error Envelope
All tool errors adhere to the standard JSON error envelope:
```json
{
  "error": {
    "code": "INVALID_ARGUMENT | UNAUTHENTICATED | PERMISSION_DENIED | NOT_FOUND | UPSTREAM_UNAVAILABLE | RATE_LIMITED | INTERNAL",
    "message": "Human-readable, non-sensitive description",
    "details": {}
  }
}
```

### 5.3 Structured Audit Logging
Every invocation emits a structured JSON line on stdout:
```json
{
  "timestamp": "2026-08-21T09:59:06.205Z",
  "trace_id": "1bbe223b-0df3-43c0-9095-69251b441e94",
  "level": "info",
  "tool": "search_leads",
  "caller_id": "ai_operator_workflow",
  "scopes": ["public:read", "leads:read:summary", "leads:read:full"],
  "duration_ms": 11,
  "status": "SUCCESS",
  "params": { "status": "New", "limit": 5 }
}
```
*Note: PII (`email`, `phone`, `password`, `notes`, `tokens`) is automatically sanitized and redacted before logging.*

---

## 6. Running Tests & Verifications

```bash
# Run all 114 verification tests across Foundation, Knowledge, Lead, and Prospect suites
npm test
```
