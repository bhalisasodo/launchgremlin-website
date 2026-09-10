# ==============================================================================
# Production Dockerfile for LaunchGremlin Frontend & Backend Service
# Multi-stage build:
#   Stage 1: Compiles Vite React frontend into ./dist
#   Stage 2: Runs Express server which automatically serves ./dist + APIs
# ==============================================================================

# --- Stage 1: Build Frontend ---
FROM node:22-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm ci

# Copy frontend source and build configurations
COPY vite.config.js index.html eslint.config.js ./
COPY public ./public
COPY src ./src
COPY scripts ./scripts
COPY backend ./backend

# Build the React/Vite SPA and generate static routes & sitemaps
RUN npm run build

# --- Stage 2: Production Server ---
FROM node:22-alpine

WORKDIR /app

# Copy package manifests
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install production backend dependencies
RUN npm --prefix backend install --omit=dev

# Copy backend server code, public assets, and compiled frontend dist from builder
COPY backend ./backend
COPY public ./public
COPY --from=builder /app/dist ./dist

EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "backend/server.js"]
