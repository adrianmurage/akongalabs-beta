import express, { Application, Request, Response } from "express";
import path from "path";

/**
 * Sets up static file serving for React app in production
 * @param app - Express application instance
 */
export function setupReactAppRoutes(app: Application): void {
  // Serve static assets (CSS, JS, images) for React app with base path
  // This must come BEFORE the SPA route handlers to ensure assets are served correctly
  app.use("/app", express.static("a-working-panda/dist", {
    // Handle trailing slashes properly
    index: false,
    redirect: false,
    // Set proper MIME types for assets
    setHeaders: (res: Response, filePath: string) => {
      if (filePath.indexOf('.js') === filePath.length - 3) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      } else if (filePath.indexOf('.css') === filePath.length - 4) {
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
      }
    }
  }));

  /**
   * Serve React SPA for all /app/** routes that aren't static assets
   * This is a catch-all that runs AFTER static assets are handled
   * @route GET /app/*
   * @param {string} path - Any path after /app/
   * @returns {File} 200 - React SPA index.html file
   */
  app.get("/app/*splat", (_req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), "a-working-panda/dist", "index.html"));
  });

  // Handle /app route (no trailing slash)
  app.get("/app", (_req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), "a-working-panda/dist", "index.html"));
  });
}

/**
 * Sets up static file serving for Astro site
 * @param app - Express application instance
 */
export function setupAstroRoutes(app: Application): void {
  // Serve static assets for Astro app
  app.use("/", express.static("landing-panda/dist"));

  /**
   * Serve Astro static site for root and other non-API routes
   * This is the final catch-all for any routes not handled above
   * @route GET /*
   * @param {string} catchall - Any non-API route path
   * @returns {File} 200 - Astro static site files
   */
  app.get("/*splat", (_req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), "landing-panda/dist", "index.html"));
  });
}