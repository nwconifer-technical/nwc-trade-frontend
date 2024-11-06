FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-log.json* ./
RUN npm ci

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

RUN npm run build
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]