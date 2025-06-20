// Main Express server that handles:
// 1. API endpoints (/api/*)
// 2. React app proxy (/app → Vite in dev, static files in prod)
// 3. Landing pages (/ → Astro in dev, static files in prod)

import "dotenv/config";
import express from "express";
import { setupBasicMiddleware } from "./src/middleware/index.js";
import { setupDevelopmentProxy } from "./src/middleware/proxy.js";
import { setupReactAppRoutes, setupAstroRoutes } from "./src/routes/static.js";
import apiRouter from "./src/routes/api.js";

const app = express();
const PORT = parseInt(process.env.PORT || "3001", 10);
const isDevelopment = process.env.NODE_ENV !== "production";

// Setup basic middleware (CORS, helmet, rate limiting, etc.)
setupBasicMiddleware(app);

// Development proxy setup - Express proxies to Vite/Astro dev servers
// In production, Express serves static files directly
if (isDevelopment) {
  setupDevelopmentProxy(app);
}

// Mount API routes - must come BEFORE frontend routes to avoid catch-all interference
// All business logic lives here
app.use("/api", apiRouter);

// Setup static file serving for production builds
// In dev, these are handled by the proxy above
if (!isDevelopment) {
  setupReactAppRoutes(app);
}

// Setup Astro static routes (always last to catch remaining requests)
// Handles landing pages, marketing content, etc.
setupAstroRoutes(app);

// Start server on all interfaces for Docker compatibility
app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `🐼 Server Panda is running on port ${PORT}. http://localhost:${PORT}`,
  );
  console.log(`   Landing pages: http://localhost:${PORT}`);
  console.log(`   React app: http://localhost:${PORT}/app`);
  console.log(`   API endpoints: http://localhost:${PORT}/api`);
});

export default app;
