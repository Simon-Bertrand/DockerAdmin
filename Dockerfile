FROM node:18-alpine AS base
FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app/

COPY website/package.json website/yarn.lock* website/package-lock.json* website/pnpm-lock.yaml* ./website/
RUN \
  if [ -f website/yarn.lock ]; then cd website && yarn --frozen-lockfile; \
  elif [ -f website/package-lock.json ]; then cd website && npm ci; \
  elif [ -f website/pnpm-lock.yaml ]; then cd website && yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/website/node_modules ./website/node_modules
COPY ./website/ ./website/
RUN mv ./website/.env ./website/.env.production
RUN cd website && npx prisma generate
RUN cd website && yarn build


FROM base AS runner
WORKDIR /app/website

ENV NODE_ENV=production



COPY --from=builder --chown=nextjs:nodejs /app/website/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/website/.next/static ./.next/static

USER root
RUN apk add --update py3-pip
COPY /api /app/api

RUN pip3 install -r ../api/requirements.txt
COPY website/db/store.db ./db/store.db

EXPOSE 3000
EXPOSE 5000

ENV PORT 3000
CMD ["npx", "concurrently", "--names", "Python,NextJs", "\"python ../api/server.py\"", "\"node server.js\""]