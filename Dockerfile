# ==============================================================================
# Production Dockerfile for LaunchGremlin Backend & MCP Server
#
# NOTE: This Dockerfile is DEDICATED SOLELY to the backend/MCP Web Service.
# It starts node backend/server.js to serve API and Model Context Protocol endpoints.
#
# DO NOT USE THIS DOCKERFILE FOR FRONTEND DEPLOYMENT.
# The frontend website (https://launchgremlin.com) must be deployed as a
# Render Static Site (runtime: static, publish path: dist) built via:
#   npm ci && npm run build
# ==============================================================================
FROM node:22-alpine

WORKDIR /app

# Copy package descriptors
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install production dependencies for backend service
RUN npm --prefix backend install --omit=dev

# Copy shared application code and backend services
COPY src ./src
COPY backend ./backend

EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "backend/server.js"]
