# Builder stage
FROM node:22 AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml tsconfig.json /app/

RUN npm install

COPY . /app

RUN npm run build

# Production stage
FROM node:22-slim AS production

WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd

COPY package.json pnpm-lock.yaml /app/

COPY --from=builder /app /app

RUN rm -rf /app/src /app/tsconfig.json

CMD ["npm", "run", "start"]
