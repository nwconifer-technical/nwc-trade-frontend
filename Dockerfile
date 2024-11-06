FROM node:18-alpine 
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN npm ci
WORKDIR /app
COPY . .
ENV NODE_ENV=production
ENV SESSION_SECRET="$(openssl rand -hex 12)"
ENV NEXT_PUBLIC_NS_TOKEN="IAMATESTINGPAGEWOOOHOOOO"
ENV API_ADDRESS="https://api.finance.nwconifer.net/"
RUN npm run build
EXPOSE 3000
COPY /app/public ./
COPY /app/.next/standalone ./
COPY /app/.next/static /app/.next/static
CMD ["node", ".next/standalone/server.js"]