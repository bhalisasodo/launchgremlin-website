# Production Dockerfile for LaunchGremlin Backend & MCP Server
FROM node:22-alpine

WORKDIR /app

# Copy package descriptors
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install production dependencies
RUN npm --prefix backend install --omit=dev

# Copy shared application code and backend services
COPY src ./src
COPY backend ./backend

EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "backend/server.js"]
