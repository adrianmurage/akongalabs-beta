import "dotenv/config";
import express from "express";
import { Sequelize } from "sequelize";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Check if DATABASE_URL is defined
const databaseUrl = process.env.DEV_DATABASE_URL;
let sequelize: Sequelize | null = null;

if (!databaseUrl) {
  console.warn(
    "DEV_DATABASE_URL environment variable is not defined - database features will be unavailable",
  );
} else {
  sequelize = new Sequelize(databaseUrl);
}

async function test_db_connection() {
  if (!sequelize) {
    return false;
  }

  try {
    await sequelize.authenticate();
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false;
  }
}

// Health check db route
app.get("/db-health", (_req, res) => {
  if (!sequelize) {
    res.status(503).json({
      error: "Database not configured",
      message: "DEV_DATABASE_URL environment variable is not set",
      timestamp: new Date().toISOString(),
    });
    return;
  }

  test_db_connection()
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

// Health check route
app.get("/health", (_req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(
    `🐼 Server Panda is running on port ${PORT}. http://localhost:${PORT}`,
  );
});

export default app;
