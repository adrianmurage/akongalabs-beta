# SaaS Panda 🐼

Look, another developer with big dreams and a monorepo. But hear me out.

## What is this?

This is a **real** SaaS boilerplate that I actually use to ship products. No BS, no over-engineering, just three simple pieces that work together:

- **React app** - Where users do the actual work
- **Landing pages** - Astro site that converts visitors  
- **API server** - Express.js that handles the heavy lifting

## Why should you care?

Because I'm tired of seeing developers waste months setting up the "perfect" stack instead of shipping products. This setup lets you:

- Start building features on day one
- Deploy everything together (no microservice hell)
- Scale when you actually have users to scale for

## Quick start (the only section that matters)

```bash
# First time setup
./setup.sh

# Get it running
bun run dev

# That's it. Everything runs on localhost:3001
```

The setup script handles dependencies and configuration. The dev command starts all three servers and handles the boring stuff. Your app is at `localhost:3001/app`, landing pages at `localhost:3001`, and API at `localhost:3001/api`.

## How it works

```
User Request → Express (3001) → Routes to:
├── / → Landing pages (Astro)
├── /app → React app (Vite) 
└── /api → API endpoints (Express)
```

In development: 3 separate servers + proxy  
In production: 1 unified server serving everything

## Quick Reference

**Common tasks:**
- Start dev environment: `bun run dev`
- Build for production: `bun run build`
- Deploy: `bun run deploy`
- Check logs: `bun run logs`
- Database proxy: `flyctl proxy 5432 -a your-db-app`

**Troubleshooting:**
- Port conflicts: Script handles cleanup automatically
- Database issues: Check `.env` and proxy connection
- Build failures: Try `--no-cache` flag on deploy

## What's inside?

**React App** (`client-panda/`)
- Vite for fast development
- Base UI components that actually look good
- CSS modules because styled-components is overkill

**Landing Site** (`landing-panda/`)
- Astro for stupid-fast static pages
- Perfect for SEO and conversion
- No unnecessary JavaScript

**API Server** (`server-panda/`)
- Express.js 5 with TypeScript
- PostgreSQL because your data matters
- Deploys to Fly.io without drama

## The opinionated bits

- **Bun** for package management (it's faster, deal with it)
- **TypeScript** everywhere (JavaScript is fine, TypeScript is better)
- **No Docker in development** (it's slow and you don't need it)
- **Consolidated logging** (see what's happening across all services)
- **PostgreSQL** (not MongoDB, fight me)

## Getting serious

**When you're ready to deploy and make money:**

```bash
# Build everything
bun run build

# Deploy to Fly.io
bun run deploy
```

Everything deploys together. No orchestration nightmares, no separate hosting bills.

## The real talk

I built this because I was sick of:
- Spending weeks on setup instead of building features
- Microservices for apps with 10 users
- Choosing between 47 different React frameworks
- Documentation that assumes you have a PhD in DevOps

This is for builders who want to ship products, not impress other developers.

## Need help?

- Check the [docs](./docs/) if you want the full story
- Look at individual project READMEs for specifics
- Open an issue if something's broken

## Contributing

Make it better, but keep it simple. The goal is shipping products, not winning architecture contests.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines on how to contribute.

---

Built by developers who ship products, not hype.