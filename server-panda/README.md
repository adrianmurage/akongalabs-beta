# Server Panda 🐼

The backend that actually does the work.

## What is this?

An Express.js server that handles your API, serves your frontend apps, and doesn't fall over when people use it. Built with TypeScript because life's too short for runtime type errors, and PostgreSQL because your data deserves better than MongoDB.

## Get it running

```bash
cd server-panda
bun install
cp .env.template .env
# Edit .env with your database info
bun run dev
```

Your API is now running on `localhost:3001`.

## The stack (and why)

- **Express.js 5** - Still the best Node.js web framework
- **TypeScript** - JavaScript but with fewer surprises
- **PostgreSQL** - A real database for real applications
- **Drizzle ORM** - Type-safe database queries without the magic
- **Fly.io** - Deployment that actually works

## What it does

This server handles three jobs:

1. **API endpoints** - Your actual business logic lives here
2. **Static file serving** - Serves your React app and landing pages in production
3. **Development proxy** - Routes requests to Vite/Astro during development

## Environment setup

Copy `.env.template` to `.env` and fill in your database details:

```env
DEV_DATABASE_URL=postgres://user:pass@localhost:5432/dbname
DATABASE_URL=postgres://user:pass@prod-host:5432/dbname
PORT=3001
```

## The important endpoints

- `GET /` - Basic health check
- `GET /health` - App health status
- `GET /db-health` - Database connection status
- `GET /api/*` - Your actual API routes

## Database stuff

Using Drizzle ORM because it's TypeScript-first and doesn't try to be too clever. Schema lives in `src/db/schema.ts`, migrations in `drizzle/`.

**Development with Fly.io database:**
```bash
# Start the proxy (keep this running)
flyctl proxy 5432 -a your-database-app

# Then your app can connect to localhost:5432
```

## Deployment

We use Fly.io because it's simple and works:

```bash
# The easy way
./deploy.sh

# If things are broken and you need a fresh build
./deploy.sh --no-cache

# If you changed a lot and want to bypass caches
./deploy.sh --cache-bust
```

That's it. Your app is live.

## Project structure

```
src/
├── db/             # Database config and schema
├── routes/         # API route handlers
├── middleware/     # Express middleware
└── utils/          # Utility functions

index.ts            # Main app entry point
drizzle/           # Database migrations
```

Keep it simple. No `/helpers`, `/services`, `/controllers` until you actually need them.

## Common problems

**Database won't connect:** Check your `.env` file and make sure PostgreSQL is running (or your Fly proxy).

**TypeScript errors:** Run `bun run tsc` to see what's broken.

**Deploy failing:** Try `./deploy.sh --no-cache` to force a fresh build.

**502 errors:** Check `fly logs` to see what's actually wrong.

## Philosophy

- Write boring code that works
- Keep the API simple and predictable
- Handle errors gracefully
- Log useful information for debugging
- Don't optimize until you have actual performance problems

Built for people who want to ship products, not win Node.js architecture contests.