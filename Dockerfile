# syntax = docker/dockerfile:1

# Unified Dockerfile for consolidated working-panda repository
# Builds server-panda (Express), client-panda (React), and landing-panda (Astro)

ARG NODE_VERSION=22.16.0
FROM node:${NODE_VERSION}-slim AS base

# Cache busting argument - pass current timestamp or commit hash to invalidate cache
ARG CACHE_BUST

LABEL fly_launch_runtime="Node.js"
LABEL app_name="working-panda-unified"

# Set production environment
ENV NODE_ENV="production"
# Install bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

# Install packages needed to build node modules and frontend apps
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3 curl && \
    rm -rf /var/lib/apt/lists/*

# =============================================
# Frontend Build Stage - Client Panda (React)
# =============================================
FROM base AS build-client

WORKDIR /workspace/client-panda

# Copy client package files
COPY client-panda/package.json client-panda/bun.lock* ./
RUN bun install --frozen-lockfile

# Copy client source code
COPY client-panda/ ./

# Build React application
RUN bun run build

# =============================================
# Frontend Build Stage - Landing Panda (Astro)
# =============================================
FROM base AS build-landing

WORKDIR /workspace/landing-panda

# Copy landing package files
COPY landing-panda/package.json landing-panda/bun.lock* ./
RUN bun install --frozen-lockfile

# Copy landing source code
COPY landing-panda/ ./

# Build Astro application
RUN bun run build

# =============================================
# Server Build Stage
# =============================================
FROM base AS build-server

WORKDIR /app

# Copy server package files
COPY server-panda/package.json server-panda/bun.lock* ./
RUN bun install --frozen-lockfile

# Copy server source code
COPY server-panda/ ./

# Copy built frontend applications from previous stages
COPY --from=build-client /workspace/client-panda/dist ./client-panda/dist
COPY --from=build-landing /workspace/landing-panda/dist ./landing-panda/dist

# Cache bust label using build arg
LABEL cache_bust=$CACHE_BUST

# Build TypeScript server
RUN bun run tsc

# =============================================
# Production Stage
# =============================================
FROM base AS production

WORKDIR /app

# Copy server package files for production dependencies only
COPY server-panda/package.json server-panda/bun.lock* ./
RUN bun install --frozen-lockfile --production

# Copy built server application
COPY --from=build-server /app/build ./build

# Copy built frontend static assets
COPY --from=build-server /app/client-panda ./client-panda
COPY --from=build-server /app/landing-panda ./landing-panda

# Copy essential server runtime files
COPY --from=build-server /app/src ./src

# Create non-root user for security
RUN groupadd --gid 1001 nodejs && \
    useradd --uid 1001 --gid nodejs --shell /bin/bash --create-home nodejs

# Change ownership of app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose the port the app runs on
EXPOSE 3001

# Health check to ensure the application is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:3001/api/health || exit 1

# Start the server
CMD [ "node", "build/index.js" ]
