ARG NODE_VERSION=20.11.0


# Local dev environment
FROM node:${NODE_VERSION} AS dev

WORKDIR /app

COPY package*.json ./

RUN npm pkg delete scripts.prepare && npm ci

COPY . .

RUN npm run prisma:generate


# Build for production
FROM node:${NODE_VERSION}-bookworm-slim AS build

WORKDIR /app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=dev /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm pkg delete scripts.prepare && npm ci --only=production && npm cache clean --force

USER node


# Prod environment
FROM node:${NODE_VERSION}-bookworm-slim AS prod

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

CMD ["node", "dist/main.js"]