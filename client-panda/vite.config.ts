import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// Vite configuration for React app
// In development: Runs on port 5173, proxies API calls to Express
// In production: Built to static files and served by Express
export default defineConfig({
  plugins: [react()],
  appType: "spa", // Single Page Application
  base: "/app/", // React app is served at /app/* paths
  resolve: {
    alias: {
      // Path aliases for cleaner imports
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  server: {
    host: true, // Listen on all interfaces (0.0.0.0)
    port: 5173, // Development server port
    proxy: {
      // Proxy API calls to Express server during development
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
