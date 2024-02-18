ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-alpine AS base



FROM base AS builder
ARG WORKSPACE_NAME=poc-frontend
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install --global turbo
COPY . .
RUN turbo prune ${WORKSPACE_NAME} --docker



# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
ARG WORKSPACE_NAME=poc-frontend
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install dependencies (as they change less often)
# COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install
RUN npm install serve -g

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN npx turbo build --filter=${WORKSPACE_NAME}



FROM base AS runner
WORKDIR /app

COPY --from=installer /app .

CMD ["serve", "-s", "dist", "-p", "5173"]