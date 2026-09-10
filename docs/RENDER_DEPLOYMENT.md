# LaunchGremlin Production Deployment Guide for Render

This guide outlines the production deployment architecture for LaunchGremlin, resolving the deployment separation between the **React/Vite Frontend** and the **Express Backend & Model Context Protocol (MCP) Server**.

---

## 1. Architectural Overview

The repository contains two independent services that must be deployed as separate resources on Render:

```
                            GitHub Repository
                     (bhalisasodo/launchgremlin-website)
                                     |
              +----------------------+----------------------+
              |                                             |
              v                                             v
     FRONTEND SERVICE                              BACKEND SERVICE
    Render Static Site                            Render Web Service
              |                                             |
              v                                             v
     React 18 / Vite SPA                           Express & MCP Server
   (npm ci && npm run build)                    (npm --prefix backend install)
       Publish: dist/                               node backend/server.js
              |                                             |
              v                                             v
    https://launchgremlin.com                     https://backend.launchgremlin.com
  https://www.launchgremlin.com
```

### Why the Domain Was Returning MCP JSON Previously

The Render Web Service running `node backend/server.js` was previously assigned the custom domains `launchgremlin.com` and `www.launchgremlin.com`. Because its build command was `npm --prefix backend install`, the frontend was never compiled, no `dist/` directory existed on the container, and root HTTP requests fell through to the backend service's JSON response:

```json
{
  "status": "online",
  "service": "LaunchGremlin Backend & Model Context Protocol (MCP) Server",
  "version": "1.0.0",
  "endpoints": {
    "mcp_health": "/api/mcp/health",
    "mcp_sse": "/api/mcp/sse",
    "mcp_messages": "/api/mcp/messages",
    "leads": "/api/leads"
  },
  "documentation": "https://launchgremlin.com"
}
```

To fix this, the root domain must point to a **Render Static Site**, while the backend service is assigned `backend.launchgremlin.com`.

---

## 2. Service Specifications

### Service A: Frontend (Static Site)

* **Render Service Type:** `Static Site`
* **Name:** `launchgremlin-frontend`
* **Runtime:** `Static`
* **Build Command:** `npm ci && npm run build`
* **Publish Directory:** `dist`
* **SPA Routing Rule (Rewrite):**
  * **Type:** `Rewrite`
  * **Source:** `/*`
  * **Destination:** `/index.html`
* **Custom Domains:**
  * `launchgremlin.com`
  * `www.launchgremlin.com`
* **Environment Variables:**
  | Variable | Value | Description |
  | :--- | :--- | :--- |
  | `VITE_API_URL` | `https://backend.launchgremlin.com` | Backend origin baked into Vite bundle during build |

---

### Service B: Backend & MCP (Web Service)

* **Render Service Type:** `Web Service`
* **Name:** `launchgremlin-backend-mcp`
* **Runtime:** `Node`
* **Plan:** `Free` (or Starter / Standard for high availability)
* **Build Command:** `npm --prefix backend install`
* **Start Command:** `node backend/server.js`
* **Custom Domain:**
  * `backend.launchgremlin.com`
* **Endpoints Served:**
  * `GET /` — Backend & MCP discovery status JSON
  * `GET /api/mcp/health` — Public MCP health & tool catalog
  * `GET /api/mcp/sse` — SSE connection stream for Google Spark / AI agents
  * `POST /api/mcp/messages` — JSON-RPC message dispatcher
  * `POST /api/leads` — Inbound client scope & lead submission
  * `GET /api/leads` — Lead management (JWT auth required)
  * `POST /api/auth/login` — Admin login (JWT generation)
  * `POST /api/cards/save` — Digital card profile persistence
  * `GET /api/cards/:slug` — Digital card retrieval
  * `POST /api/cards/upload-avatar` — Digital card avatar upload
* **Environment Variables:**
  | Variable | Type | Example / Description |
  | :--- | :--- | :--- |
  | `NODE_ENV` | String | `production` |
  | `PORT` | Integer | `5000` |
  | `JWT_SECRET` | Secret | Generated 32+ character random string |
  | `MCP_API_KEY` | Secret | Dedicated API key for Google Spark & AI callers |
  | `NOTIFICATION_EMAIL` | String | `bhalisasodo10@gmail.com` |
  | `MONGODB_URI` | Secret (Optional) | MongoDB Atlas connection string (fallback to local `leads.json`) |
  | `SMTP_HOST` | String (Optional) | e.g. `smtp.gmail.com` |
  | `SMTP_PORT` | Integer (Optional) | `587` |
  | `SMTP_SECURE` | Boolean (Optional) | `false` |
  | `SMTP_USER` | String (Optional) | Outbound SMTP sender email |
  | `SMTP_PASS` | Secret (Optional) | Outbound SMTP app password |

---

## 3. Deploying via Render Blueprint (`render.yaml`)

The repository includes a root `render.yaml` defining both services:

1. In the [Render Dashboard](https://dashboard.render.com/), click **New +** → **Blueprint**.
2. Connect your `launchgremlin-website` GitHub repository.
3. Render reads `render.yaml` and provisions:
   * `launchgremlin-frontend` (Static Site)
   * `launchgremlin-backend-mcp` (Web Service)
4. Populate secret environment variables (`MONGODB_URI`, `SMTP_*`, etc.) under the backend service settings.
5. Apply the blueprint.

---

## 4. Manual Render Dashboard Configuration (If Deploying Services Manually)

If you configure or maintain services individually in the Render UI rather than via Blueprint:

### Step 1: Fix the Existing Backend Web Service
1. Navigate to the existing backend Web Service (e.g. `launchgremlin-backend-mcp`).
2. Go to **Settings** → **Custom Domains**.
3. **Remove** `launchgremlin.com` and `www.launchgremlin.com` from this backend service.
4. **Add** `backend.launchgremlin.com` as the custom domain.
5. Verify that:
   * **Build Command** is `npm --prefix backend install`
   * **Start Command** is `node backend/server.js`

### Step 2: Create the Frontend Static Site
1. In the Render Dashboard, click **New +** → **Static Site**.
2. Connect your `launchgremlin-website` repository.
3. Configure:
   * **Name:** `launchgremlin-frontend`
   * **Branch:** `main`
   * **Build Command:** `npm ci && npm run build`
   * **Publish Directory:** `dist`
4. Under **Environment Variables**, add:
   * `VITE_API_URL`: `https://backend.launchgremlin.com`
5. Under **Redirects/Rewrites**:
   * Add a Rewrite: `/*` → `/index.html`
6. Click **Create Static Site**.
7. Once deployed, go to **Settings** → **Custom Domains**:
   * Add `launchgremlin.com`
   * Add `www.launchgremlin.com`

---

## 5. DNS Configuration

In your DNS provider (e.g., Cloudflare, Namecheap, GoDaddy):

| Type | Name / Host | Target / Value | Description |
| :--- | :--- | :--- | :--- |
| **ANAME / ALIAS / A** | `@` (root) | Provided by Render Static Site (e.g. `launchgremlin-frontend.onrender.com` or Render IP) | Routes `launchgremlin.com` to the frontend Static Site |
| **CNAME** | `www` | `launchgremlin-frontend.onrender.com` | Routes `www.launchgremlin.com` to the frontend Static Site |
| **CNAME** | `backend` | `launchgremlin-backend-mcp.onrender.com` | Routes `backend.launchgremlin.com` to the backend Web Service |

> [!IMPORTANT]
> Verify that the `@` (root) and `www` DNS records point to the **Frontend Static Site**, NOT the Backend Web Service.

---

## 6. Verification Checklist

After deployment and DNS propagation:

1. **Frontend Verification:**
   ```bash
   curl -I https://launchgremlin.com
   ```
   * HTTP 200 with `content-type: text/html`.
   * Serves the LaunchGremlin React application, landing page, and navigation.

2. **Backend Root Endpoint:**
   ```bash
   curl https://backend.launchgremlin.com
   ```
   * Returns JSON with status: `online` and service: `LaunchGremlin Backend & Model Context Protocol (MCP) Server`.

3. **MCP Health & Tools Endpoint:**
   ```bash
   curl https://backend.launchgremlin.com/api/mcp/health
   ```
   * Returns JSON with status: `healthy` and registered tools (`get_brand_context`, `get_services`, `get_pricing`, `search_content`, `search_leads`, `get_lead`).

4. **Client Lead Submission:**
   * Test submitting a contact/scope request on `https://launchgremlin.com/contact`.
   * Verifies the frontend dispatches to `https://backend.launchgremlin.com/api/leads`.
