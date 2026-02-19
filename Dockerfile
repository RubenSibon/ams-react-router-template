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

## Production (serve) SPA stage
# Serve the built SPA with NGINX.
# This stage is not used by default. It is only used if you explicitly specify the "prod-spa" target when building the image or running the container.
# Make sure to use the "prod-spa" profile to enable this service: `docker compose --profile prod-spa up --remove-orphans`.
FROM nginx:stable-bookworm AS prod-spa
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /appname/build/client /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
