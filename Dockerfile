FROM node:18-alpine 
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN npm ci
WORKDIR /app
COPY . .
ENV NODE_ENV=production
ENV SESSION_SECRET="$(openssl rand -hex 12)"
RUN npm run build
EXPOSE 3000
CMD ["node", "server.js"]