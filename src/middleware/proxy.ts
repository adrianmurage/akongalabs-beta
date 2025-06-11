import { Application } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

/**
 * Sets up development proxy middleware for routing requests
 * @param app - Express application instance
 */
export function setupDevelopmentProxy(app: Application): void {
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
      return path.indexOf("/api") !== 0 && path.indexOf("/app") !== 0;
    },
  }));
}