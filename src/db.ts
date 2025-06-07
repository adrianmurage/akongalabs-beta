import "dotenv/config";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Database configuration
const isProduction = process.env.NODE_ENV === "production";
const databaseUrl = isProduction
  ? process.env.DATABASE_URL
  : process.env.DEV_DATABASE_URL;

let db: NodePgDatabase | null = null;

// Initialize database connection
if (!databaseUrl) {
  console.warn(
    "Database URL environment variable is not defined - database features will be unavailable",
  );
} else {
  const pool = new Pool({
    connectionString: databaseUrl,
  });
  db = drizzle({ client: pool });
}

// Test database connection
export async function testDatabaseConnection(): Promise<boolean> {
  if (!db) {
    return false;
  }

  try {
    await db.execute("SELECT 1");
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false;
  }
}

// Get database instance
export function getDatabase(): NodePgDatabase | null {
  return db;
}

// Check if database is configured
export function isDatabaseConfigured(): boolean {
  return db !== null;
}
