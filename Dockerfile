FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY *package.json *package-log.json ./
RUN npm ci

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV SESSION_SECRET="$(openssl rand -hex 12)"

RUN npm run build
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]