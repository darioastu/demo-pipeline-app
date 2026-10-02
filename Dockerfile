# ---------- Etapa 1: dependencias ----------
FROM node:20-alpine AS deps
WORKDIR /app
COPY app/package*.json ./
RUN npm install --omit=dev

# ---------- Etapa 2: imagen final ----------
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY app/src ./src
COPY app/package.json ./
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "src/server.js"]
