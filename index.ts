import "dotenv/config";
import express from "express";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import { isDatabaseConfigured, testDatabaseConnection } from "./src/db.js";
const app = express();

const PORT = parseInt(process.env.PORT || "3001", 10);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Development proxy setup - Express as unified entry point
const isDevelopment = process.env.NODE_ENV !== "production";

if (isDevelopment) {
  // Simple proxy for /app routes to Vite dev server
  app.use("/app", createProxyMiddleware({
    target: "http://localhost:5173/app",
    ws: true
  }));

  // Proxy everything else to Astro dev server
  app.use("/", createProxyMiddleware({
    target: "http://localhost:4321",
    ws: true,
    pathFilter: (path) => {
      return !path.startsWith("/api") && !path.startsWith("/app");
    },
  }));
}

// START API ROUTES
// Define API router and its endpoints
const apiRouter = express.Router();
// Mount API router - must come BEFORE frontend routes to avoid catch-all interference
app.use("/api", apiRouter);

/**
 * Database connectivity health check
 * @route GET /api/db-health
 * @returns {Object} 200 - Success with status and timestamp
 * @returns {Object} 503 - Database not configured
 * @returns {Object} 500 - Connection failed
 */
apiRouter.get("/db-health", (_req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  if (!isDatabaseConfigured()) {
    res.status(503).json({
      error: "Database not configured",
      message: `${isProduction ? "DATABASE_URL env variable not set" : "DEV_DATABASE_URL env variable not set"}`,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  testDatabaseConnection()
    .then((result) => {
      if (result) {
        res.json({ status: "OK", timestamp: new Date().toISOString() });
      } else {
        console.error("Unable to connect to the database");
        res.status(500).json({ error: "Database connection failed" });
      }
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
      res.status(500).json({ error: "Database connection failed" });
    });
});

/**
 * Simple hello endpoint for testing API connectivity
 * @route GET /api/hello
 * @returns {string} 200 - "Hello from server"
 */
apiRouter.get("/hello", (_req, res) => {
  res.send("Hello from server");
});

/**
 * Application health check endpoint
 * @route GET /api/health
 * @returns {Object} 200 - Success with status and timestamp
 */
apiRouter.get("/health", (_req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});
// END API ROUTES

// START REACT APP ROUTES (/app/**)
// Only serve static files in production - development uses proxy above
if (!isDevelopment) {
  // Serve static assets (CSS, JS, images) for React app with base path
  app.use("/app", express.static("a-working-panda/dist", {
    // Handle trailing slashes properly
    index: false,
    redirect: false
  }));

  /**
   * Serve React SPA for all /app/** routes in production
   * @route GET /app/*
   * @param {string} path - Any path after /app/
   * @returns {File} 200 - React SPA index.html file
   */
  app.get("/app/*splat", (_req, res) => {
    res.sendFile(path.join(process.cwd(), "a-working-panda/dist", "index.html"));
  });

  // Handle /app route (trailing slash already stripped by middleware)
  app.get("/app", (_req, res) => {
    res.sendFile(path.join(process.cwd(), "a-working-panda/dist", "index.html"));
  });
}
// END REACT APP ROUTES

// START ASTRO STATIC ROUTES (/ and other routes)
// Serve static assets for Astro app
app.use("/", express.static("landing-panda/dist"));

/**
 * Serve Astro static site for root and other non-API routes
 * @route GET /*
 * @param {string} catchall - Any non-API route path
 * @returns {File} 200 - Astro static site files
 */
app.get("/*splat", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "landing-panda/dist", "index.html"));
});
// END ASTRO STATIC ROUTES

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `🐼 Server Panda is running on port ${PORT}. http://0.0.0.0:${PORT}`,
  );
});

export default app;
