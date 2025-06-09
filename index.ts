import "dotenv/config";
import express from "express";
import { isDatabaseConfigured, testDatabaseConnection } from "./src/db.js";
const app = express();
const router = express.Router();
const PORT = parseInt(process.env.PORT || "3001", 10);

// Middleware
app.use("/api", router);
app.use(express.static("dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check db route
router.get("/db-health", (_req, res) => {
  if (!isDatabaseConfigured()) {
    res.status(503).json({
      error: "Database not configured",
      message: "Database URL environment variable is not set",
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

// A route that returns the text "Hello from server"
router.get("/hello", (_req, res) => {
  res.send("Hello from server");
});

// Health check route
router.get("/health", (_req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `🐼 Server Panda is running on port ${PORT}. http://0.0.0.0:${PORT}`,
  );
});

export default app;
