# Development Guide

## Local Development URLs

### 🚀 Quick Start

When running the development servers, always use **localhost** instead of **0.0.0.0** to avoid SSL/HTTPS issues:

```bash
# Start all development servers
cd server-panda && bun run dev

# Access the application
http://localhost:3001       # Main entry point
http://localhost:3001/app   # React application
http://localhost:3001/api   # API endpoints
```

### 🔧 Development Servers

| Service | Port | URL | Purpose |
|---------|------|-----|---------|
| Express Server | 3001 | http://localhost:3001 | Main server & API |
| React App (Vite) | 5173 | http://localhost:5173 | Client development |
| Astro Landing | 4321 | http://localhost:4321 | Landing pages |

### ⚠️ Common Issues

#### SSL/HTTPS Errors

**Problem**: Browser shows `ERR_SSL_PROTOCOL_ERROR` when accessing `https://0.0.0.0:3001`

**Solution**: 
1. Always use `http://localhost:3001` (not `https://` and not `0.0.0.0`)
2. Clear browser cache if you get redirected to HTTPS:
   - Chrome: `chrome://net-internals/#hsts` → Delete domain
   - Firefox: History → Clear Recent History → Cache
   - Safari: Develop → Empty Caches

#### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3001`

**Solution**:
```bash
# Find and kill the process using the port
# Linux/Mac:
lsof -i :3001
kill -9 <PID>

# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### 🛠️ Development Workflow

1. **Start the main server** (includes proxy to other services):
   ```bash
   cd server-panda
   bun run dev
   ```

2. **In development, the Express server proxies**:
   - `/` → Astro (landing pages)
   - `/app` → React (client application)
   - `/api` → Express API routes

3. **Access everything through the main server**:
   - http://localhost:3001 - Landing page
   - http://localhost:3001/app - React app
   - http://localhost:3001/api/health - API health check

### 📝 Environment Variables

Create a `.env` file in `server-panda`:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=your_database_url_here

# Rate Limiting Configuration (optional)
RATE_LIMIT_WINDOW=15              # Window in minutes (default: 15)
RATE_LIMIT_MAX=1000               # Max requests per window (default: 1000 in dev, 100 in prod)
RATE_LIMIT_API_MAX=500            # Max API requests per window (default: 500 in dev, 50 in prod)
DISABLE_RATE_LIMIT_DEV=true       # Disable rate limiting in development (default: false)

# Add other environment variables as needed
```

### 🔍 Debugging

1. **Check all servers are running**:
   ```bash
   # Check Express server logs
   cd server-panda && bun run dev
   
   # In separate terminals if needed:
   cd client-panda && bun run dev
   cd landing-panda && bun run dev
   ```

2. **Verify proxy is working**:
   - Visit http://localhost:3001 (should show Astro landing page)
   - Visit http://localhost:3001/app (should show React app)
   - Visit http://localhost:3001/api/health (should return JSON)

3. **Browser DevTools**:
   - Open Network tab to see actual URLs being requested
   - Check Console for any client-side errors
   - Verify no HTTPS redirects are happening

### 🚨 Important Notes

- **Never use `0.0.0.0` in browser URLs** - it can cause SSL/security issues
- **Always use `http://` protocol** in development (not `https://`)
- **Use `localhost` or `127.0.0.1`** for local development
- The Express server acts as a reverse proxy in development, so you only need to access port 3001

### 📊 Rate Limiting

The application includes rate limiting for security. Default limits:

**Development Mode:**
- Global: 1000 requests per 15 minutes
- API: 500 requests per 15 minutes

**Production Mode:**
- Global: 100 requests per 15 minutes
- API: 50 requests per 15 minutes

**Customization:**
You can customize rate limits via environment variables (see `.env` example above).

**If you hit rate limits during development:**
1. Set `DISABLE_RATE_LIMIT_DEV=true` in your `.env` file
2. Or increase the limits: `RATE_LIMIT_MAX=5000`
3. Or reduce the window: `RATE_LIMIT_WINDOW=5`

**Rate limit headers in responses:**
```
RateLimit-Limit: 1000
RateLimit-Remaining: 999
RateLimit-Reset: 2024-01-01T12:00:00.000Z
```

### 🏗️ Production vs Development

| Aspect | Development | Production |
|--------|------------|------------|
| URL | http://localhost:3001 | https://your-domain.com |
| Servers | Multiple (proxied) | Single unified build |
| Static Files | Served by dev servers | Served from build folders |
| API Routes | Proxied through Express | Direct Express routes |