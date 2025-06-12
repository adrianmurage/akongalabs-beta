import express, { Request, Response, Router } from "express";
import { isDatabaseConfigured, testDatabaseConnection } from "../db.js";

const apiRouter: Router = express.Router();

/**
 * Database connectivity health check
 * @route GET /api/db-health
 * @returns {Object} 200 - Success with status and timestamp
 * @returns {Object} 503 - Database not configured
 * @returns {Object} 500 - Connection failed
 */
apiRouter.get("/db-health", (_req: Request, res: Response) => {
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
    .then((result: boolean) => {
      if (result) {
        res.json({ status: "OK", timestamp: new Date().toISOString() });
      } else {
        console.error("Unable to connect to the database");
        res.status(500).json({ error: "Database connection failed" });
      }
    })
    .catch((error: Error) => {
      console.error("Unable to connect to the database:", error);
      res.status(500).json({ error: "Database connection failed" });
    });
});

/**
 * Simple hello endpoint for testing API connectivity
 * @route GET /api/hello
 * @returns {string} 200 - "Hello from server"
 */
apiRouter.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello from server");
});

/**
 * Application health check endpoint
 * @route GET /api/health
 * @returns {Object} 200 - Success with status and timestamp
 */
apiRouter.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

export default apiRouter;