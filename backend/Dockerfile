# 🛠️ Použij oficiální Node.js image jako základ
FROM node:lts-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

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
ARG DB_SSL=false
ARG PDF_SERVICE_API_URL

WORKDIR /app

COPY --from=builder /app/ ./

RUN addgroup -S app && adduser -S app -G app \
	&& chmod +x /app/docker/entrypoint.sh \
	&& mkdir -p /app/temp \
	&& chown -R app:app /app/temp
USER app

ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV DB_SSL=${DB_SSL}
ENV DB_RUN_MIGRATIONS=true
ENV DB_MIGRATION_MAX_ATTEMPTS=30
ENV DB_MIGRATION_RETRY_DELAY_SECONDS=2

EXPOSE ${PORT}

CMD ["/app/docker/entrypoint.sh"]
