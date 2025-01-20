# Builder stage
FROM node:22 AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml tsconfig.json /app/

RUN pnpm install

COPY . /app

RUN pnpm build

# Production stage
FROM node:22-slim AS production

WORKDIR /app

COPY package.json pnpm-lock.yaml /app/

COPY --from=builder /app /app

RUN rm -rf /app/src /app/tsconfig.json

CMD ["pnpm", "start"]
