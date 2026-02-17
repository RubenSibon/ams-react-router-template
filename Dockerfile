# Dockerfile for React Router template for the City of Amsterdam
# This file can be used for both development with HMR, building for production and starting React Router's Node.js server.

FROM node:lts-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /appname
RUN corepack enable
COPY package.json pnpm-lock.yaml ./

## Development stage
# Does not run by default; use the target "dev" to run it.
FROM base AS dev
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
EXPOSE 5173
CMD ["pnpm", "dev", "--host"]

## Build stage
# Runs by default with the base stage.
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts
COPY . .
RUN pnpm run build

## Production (serve) SSR stage
# Runs by default with the base stage. Serve the built application with Node.js.
# Will fail if SSR is disabled in react-router.config.ts
FROM base AS prod
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod --ignore-scripts
COPY --from=build /appname/build ./build
EXPOSE 3000
CMD ["pnpm", "start"]
