# Deploying LaunchGremlin MCP to the Cloud & Connecting Google Spark

This guide provides step-by-step instructions to deploy the LaunchGremlin Backend & MCP Server to a public HTTPS cloud provider and connect **Google Spark (Gemini Workspace Agent)**.

---

## 1. Choose a Cloud Hosting Provider

The LaunchGremlin backend runs as a Node.js Express server that supports persistent **Server-Sent Events (SSE)** connections.

### Option 1: Render (Recommended — Free & Instant)
1. Push your repository changes to GitHub (`origin main`).
2. Go to [render.com](https://render.com) and create a **New Web Service**.
3. Select your `launchgremlin-website` GitHub repository.
4. Configure:
   - **Environment:** `Node`
   - **Build Command:** `npm --prefix backend install`
   - **Start Command:** `node backend/server.js`
5. Under **Environment Variables**, set:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `MCP_API_KEY`: `<Generate a secure 32+ character key, e.g. lg_mcp_prod_778899>`
   - `JWT_SECRET`: `<Generate a secure random string>`
   - `NOTIFICATION_EMAIL`: `bhalisasodo10@gmail.com`
   - `MONGODB_URI`: `<Your MongoDB Atlas connection string, or leave blank for local fallback>`
6. Click **Deploy Web Service**.
7. Once deployed, you will get a public URL (e.g. `https://launchgremlin-backend-mcp.onrender.com`).

---

### Option 2: Railway
1. Go to [railway.app](https://railway.app) and create a **New Project from GitHub Repo**.
2. Railway will automatically detect [`railway.json`](../railway.json).
3. Set your environment variables in the Railway dashboard (`MCP_API_KEY`, `JWT_SECRET`, etc.).
4. Generate a public domain under Settings (e.g. `https://launchgremlin-backend.up.railway.app`).

---

### Option 3: Custom Subdomain (e.g. `api.launchgremlin.com` or `mcp.launchgremlin.com`)
1. In Render or Railway, go to **Custom Domains** and add `api.launchgremlin.com`.
2. Add a `CNAME` record in your DNS provider (e.g. Cloudflare / Namecheap / GoDaddy):
   - **Type:** `CNAME`
   - **Name / Host:** `api`
   - **Target / Value:** `<your-render-or-railway-url>`
3. SSL certificates are provisioned automatically.

---

## 2. Verify Your Cloud MCP Server

Once deployed, verify that the health and MCP discovery endpoints respond:

```bash
# 1. Test public health & tools discovery
curl -X GET "https://<your-cloud-domain>/api/mcp/health"

# Expected JSON Response:
# {
#   "status": "healthy",
#   "server": "launchgremlin-mcp-server",
#   "version": "1.0.0",
#   "transports_supported": ["stdio", "sse", "http"],
#   "tools": ["get_brand_context", "get_services", "get_pricing", "search_content", "search_leads", "get_lead"]
# }
```

---

## 3. Connecting Google Spark to LaunchGremlin MCP

1. In your **Google Workspace / Gemini Spark Agent Studio** or Agent Settings:
2. Navigate to **Integrations / MCP Tools / External Connectors**.
3. Click **Add New MCP Server**.
4. Enter the connection settings:
   - **Connector Name:** `LaunchGremlin Production MCP`
   - **Transport Type:** `Server-Sent Events (SSE)` / `Remote HTTP`
   - **Server URL:** `https://<your-cloud-domain>/api/mcp/sse`
   - **Authentication:** `Bearer Token` / `API Key`
   - **Token / API Key:** `<Value of your MCP_API_KEY>`
5. Click **Connect & Authorize**.

---

## 4. Testing Google Spark Multi-Tool Workflow

Once connected, you can ask Google Spark natural language prompts in Gmail or Workspace:

### Example Prompts:
- *"Check LaunchGremlin leads for new website inquiries from this week and summarize their requirements."*
- *"Look up the fixed-price pricing for a High-Converting Landing Page MVP and 30-Day Short-Form Viral Video System."*
- *"Draft an onboarding proposal email for prospect Bhalisa Sodo matching our official brand tone and Web Engineering service catalog."*
