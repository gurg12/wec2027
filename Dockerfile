# ── Stage 1: Build the React client ─────────────────────────────────────────
FROM node:20-alpine AS client-builder
WORKDIR /build/client

COPY client/package*.json ./
RUN npm ci --prefer-offline

COPY client/ .
RUN npm run build

# ── Stage 2: Production server ───────────────────────────────────────────────
FROM node:20-alpine AS production
WORKDIR /app

# Server deps only
COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev --prefer-offline

# Server source
COPY server/ ./server/

# Built frontend from stage 1
COPY --from=client-builder /build/client/dist ./client/dist

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "server/index.js"]
