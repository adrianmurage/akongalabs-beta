import express, { Application } from "express";
import { setupSecurityMiddleware } from "./security.js";

/**
 * Sets up basic Express middleware
 * @param app - Express application instance
 */
export function setupBasicMiddleware(app: Application): void {
  // Security middleware must be first
  setupSecurityMiddleware(app);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}
