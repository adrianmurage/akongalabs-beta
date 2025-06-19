# Development Setup

Getting your dev environment working without the headaches.

## The one command you need

```bash
cd saas-panda/server-panda
./dev-simple.sh
```

That's it. Everything runs on `localhost:3001`.

## What just happened?

The script starts three servers:
- **Express server** (port 3001) - Your API and main entry point
- **React app** (port 5173) - Vite dev server for the frontend
- **Landing pages** (port 4321) - Astro dev server for marketing pages

In development, Express proxies everything:
- `localhost:3001` → Landing pages (Astro)
- `localhost:3001/app` → React app (Vite)  
- `localhost:3001/api` → API routes (Express)

## Setting up your environment

Copy the environment template:
```bash
cd server-panda
cp .env.template .env
```

Edit `.env` with your database info:
```env
DATABASE_URL=postgres://user:pass@localhost:5432/yourdb
PORT=3001
NODE_ENV=development
```

## When things break

**"Port already in use"**
```bash
# Kill whatever's using port 3001
lsof -i :3001
kill -9 <PID>

# Or use the script (it handles this automatically)
./dev-simple.sh
```

**"Can't connect to database"**
- Check your `.env` file
- Make sure PostgreSQL is running
- If using Fly.io database, start the proxy: `flyctl proxy 5432 -a your-db-app`

**"SSL/HTTPS errors"**
- Always use `http://localhost:3001` (not https, not 0.0.0.0)
- Clear your browser cache if it's forcing HTTPS

**"React app not loading"**
- Check that all three servers started (look for colored log prefixes)
- Visit `localhost:5173` directly to see if Vite is running
- Check the terminal for any build errors

## Manual server control

If you need to run servers individually:

```bash
# Kill all dev processes first
pkill -f "bun run dev"

# Then start what you need
cd client-panda && bun run dev      # React app on 5173
cd landing-panda && bun run dev     # Astro on 4321  
cd server-panda && bun run dev      # Express on 3001
```

## Debugging tips

**Check what's running:**
```bash
# See which ports are listening
ss -tln | grep -E "(3001|5173|4321)"

# See running processes
ps aux | grep -E "(bun|astro|vite)" | grep -v grep
```

**Follow the logs:**
The dev script shows all logs with colored prefixes:
- `[EXPRESS]` - API server logs
- `[VITE]` - React app logs  
- `[ASTRO]` - Landing page logs

**Test the proxy:**
- `curl localhost:3001` → Should return Astro landing page
- `curl localhost:3001/app` → Should return React app HTML
- `curl localhost:3001/api/health` → Should return JSON health status

## Database development

**Using local PostgreSQL:**
```bash
# Install PostgreSQL
brew install postgresql  # Mac
sudo apt install postgresql  # Ubuntu

# Create database
createdb yourappname

# Update .env
DATABASE_URL=postgres://postgres@localhost:5432/yourappname
```

**Using Fly.io database:**
```bash
# Start proxy (keep this running)
flyctl proxy 5432 -a your-database-app-name

# Update .env  
DATABASE_URL=postgres://user:pass@localhost:5432/dbname
```

## Rate limiting in development

The API has rate limiting enabled. If you're hitting limits while developing:

```env
# Add to .env
DISABLE_RATE_LIMIT_DEV=true
```

Or increase the limits:
```env
RATE_LIMIT_MAX=5000
RATE_LIMIT_API_MAX=2000
```

## Common gotchas

- **Always use localhost, never 0.0.0.0** in browser URLs
- **Use http://, not https://** in development
- **Don't access individual dev servers directly** - go through port 3001
- **Keep the Fly database proxy running** if you're using hosted PostgreSQL
- **Ctrl+C stops all servers** when using the dev script

## File structure

```
saas-panda/
├── client-panda/       # React app (Vite dev server)
├── landing-panda/      # Astro landing pages
├── server-panda/       # Express API server
│   ├── dev-simple.sh   # The magic script
│   └── .env           # Your environment config
└── docs/              # You are here
```

## Production vs development

| Thing | Development | Production |
|-------|------------|------------|
| How to access | `localhost:3001` | `your-domain.com` |
| Server setup | 3 separate servers + proxy | 1 server serving everything |
| Static files | Served by Vite/Astro | Built and served by Express |
| Hot reload | ✅ Yes | ❌ No |

The beauty is that development feels like separate apps, but production deploys as one unified application.