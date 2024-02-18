# Base config
ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-bookworm-slim AS base

WORKDIR /app

COPY package.json .
COPY package-lock.json .

EXPOSE 5173


# Local dev environment
FROM base AS dev

RUN npm pkg delete scripts.prepare && npm ci

COPY . .

CMD ["npm", "run", "dev"]


# Prod environment
FROM base AS prod

RUN npm pkg delete scripts.prepare && npm ci
RUN npm install serve -g

COPY . .

RUN npm run build

CMD ["serve", "-s", "dist", "-p", "5173"]