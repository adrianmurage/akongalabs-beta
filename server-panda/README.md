# Server Panda 🐼

A production-ready Express.js server built with TypeScript, PostgreSQL, and Docker. Deployed on Fly.io with intelligent caching and comprehensive health monitoring.

## Quick Start

### Prerequisites

- Node.js 22.16.0 or higher
- PostgreSQL database
- Docker (for containerized deployment)
- Fly CLI (for deployment)

### Installation

```bash
# Clone and setup
git clone git@github.com:Adrian-corp/server-panda.git

# change dire
cd server-panda

# install dependencies
yarn install

# Set up environment
cp .env.example .env
# Edit .env with your database URLs

# Start development server
yarn dev
```

## Project Overview

Server Panda is a modern Node.js backend application featuring:

- **Express.js** server with TypeScript
- **PostgreSQL** database with Drizzle ORM
- **Docker** containerization
- **Fly.io** deployment with intelligent caching
- **Health monitoring** endpoints
- **CORS** support for cross-origin requests

## Development Setup

### Database Configuration

The application uses Drizzle ORM with PostgreSQL. Database configuration automatically switches between development and production based on `NODE_ENV`.

- **Development:** Uses `DEV_DATABASE_URL`
- **Production:** Uses `DATABASE_URL`

### Using Fly.io Hosted Database (Recommended for Development)

If you're using the hosted database on Fly.io for development, you'll need to proxy the connection:

```bash
# Start the database proxy (run this in a separate terminal)
flyctl proxy 5432 -a database-panda-dev

# In your .env file, use:
# DEV_DATABASE_URL=postgres://postgres:your_password@0.0.0.0:5432/postgres
```

> **Important:** Keep the proxy running in a separate terminal window while developing. The proxy forwards your local port 5432 to the remote Fly.io database.

### Development Commands

```bash
# Start development server with hot reload
yarn dev

# Build TypeScript
yarn tsc

# Lint code
yarn lint

# Type check
yarn tsc --noEmit
```

## API Endpoints

### Health Checks

- **GET /** - Basic server response

  ```
  Response: "Hello from server"
  ```

- **GET /health** - Application health status

  ```json
  {
    "status": "OK",
    "timestamp": "2025-06-07T17:27:31.244Z"
  }
  ```

- **GET /db-health** - Database connectivity status
  ```json
  {
    "status": "OK",
    "timestamp": "2025-06-07T17:27:31.244Z"
  }
  ```

## Deployment

### Fly.io Deployment

The project includes a smart deployment script with cache management options:

```bash
# Normal deployment (recommended)
./deploy.sh

# Cache-busted deployment (for major changes)
./deploy.sh --cache-bust

# Complete rebuild (when dependencies change)
./deploy.sh --no-cache

# Show help
./deploy.sh --help
```

### Manual Fly.io Setup

```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login to Fly.io
fly auth login

# Deploy
fly deploy
```

## Project Structure

```
server-panda/
├── src/
│   └── db.ts              # Database configuration and utilities
├── drizzle/               # Database migrations
├── build/                 # Compiled TypeScript output
├── index.ts               # Main application entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── drizzle.config.ts      # Database ORM configuration
├── Dockerfile             # Container configuration
├── fly.toml               # Fly.io deployment config
├── deploy.sh              # Smart deployment script
└── README.md              # This file
```


## Configuration Files

### TypeScript (`tsconfig.json`)

- ES2022 target with Node22 lib
- ESNext modules with node resolution
- Strict type checking enabled

### ESLint (`eslint.config.mjs`)

- TypeScript ESLint integration
- Stylistic rules for consistent code formatting

### Environment Variables

| Variable           | Description                       | Required    |
| ------------------ | --------------------------------- | ----------- |
| `DEV_DATABASE_URL` | Development PostgreSQL connection | Development |
| `DATABASE_URL`     | Production PostgreSQL connection  | Production  |
| `PORT`             | Server port (default: 3001)       | No          |
| `NODE_ENV`         | Environment mode                  | No          |

## Troubleshooting

### Common Issues

1. **Database Connection Failed**

   - Verify database URLs in `.env`
   - Check database server is running (or Fly.io proxy if using hosted DB)
   - For Fly.io database: Ensure `flyctl proxy 5432 -a database-panda-dev` is running
   - Test connection: `yarn dev` and visit `/db-health`

2. **TypeScript Compilation Errors**

   - Run `yarn tsc` to see detailed errors
   - Check `tsconfig.json` configuration
   - Ensure all dependencies are installed

3. **Deployment Issues**
   - Use `./deploy.sh --cache-bust` for cache-related problems
   - Check Fly.io logs: `fly logs`
   - Verify environment variables: `fly secrets list`

## Contributing

1. Follow the existing code style (ESLint configured)
2. Add tests for new features
3. Update this README for significant changes
4. Use meaningful commit messages

---

Built with ❤️ using Express.js, TypeScript, PostgreSQL, and Fly.io
