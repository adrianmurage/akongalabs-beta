import "dotenv/config";
import express from "express";
import { setupBasicMiddleware } from "./src/middleware/index.js";
import { setupDevelopmentProxy } from "./src/middleware/proxy.js";
import { setupReactAppRoutes, setupAstroRoutes } from "./src/routes/static.js";
import apiRouter from "./src/routes/api.js";

const app = express();
const PORT = parseInt(process.env.PORT || "3001", 10);
const isDevelopment = process.env.NODE_ENV !== "production";

// Setup basic middleware
setupBasicMiddleware(app);

// Development proxy setup - Express as unified entry point
if (isDevelopment) {
  setupDevelopmentProxy(app);
}

// Mount API routes - must come BEFORE frontend routes to avoid catch-all interference
app.use("/api", apiRouter);

// Setup static file serving for production
if (!isDevelopment) {
  setupReactAppRoutes(app);
}

// Setup Astro static routes (always last)
setupAstroRoutes(app);

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `🐼 Server Panda is running on port ${PORT}. http://0.0.0.0:${PORT}`,
  );
});

export default app;