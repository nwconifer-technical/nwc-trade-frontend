FROM node:18-alpine
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm ci

RUN npm run build
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV SESSION_SECRET="$(openssl rand -hex 12)"
ENV NEXT_PUBLIC_NS_TOKEN="IAMATESTINGPAGEWOOOHOOOO"
ENV API_ADDRESS="https://api.finance.nwconifer.net/"
COPY --from=builder /app/public ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static /app/.next/static
EXPOSE 3000
CMD ["node", ".next/standalone/server.js"]