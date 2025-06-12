import express, { Application } from "express";

/**
 * Sets up basic Express middleware
 * @param app - Express application instance
 */
export function setupBasicMiddleware(app: Application): void {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}