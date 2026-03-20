# 🛠️ Použij oficiální Node.js image jako základ
FROM node:lts-alpine AS builder

WORKDIR /app

COPY backend/package.json backend/pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY backend/ .

RUN pnpm run build

# 🚀 Použij lehčí image pro běh aplikace
FROM node:lts-alpine AS runner

ARG NODE_ENV=production
ARG PORT=3001
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ARG PDF_SERVICE_API_URL

WORKDIR /app

COPY --from=builder /app/ ./

RUN addgroup -S app && adduser -S app -G app
USER app

ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV PDF_SERVICE_API_URL=${PDF_SERVICE_API_URL}

EXPOSE ${PORT}

CMD ["node", "dist/src/main.js"]
