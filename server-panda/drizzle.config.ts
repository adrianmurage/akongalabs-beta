import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const isProduction = process.env.NODE_ENV === 'production';
const databaseUrl = isProduction 
  ? process.env.DATABASE_URL 
  : (process.env.DEV_DATABASE_URL);

if (!databaseUrl) {
  console.error(`Missing database URL. Expected: ${isProduction ? 'DATABASE_URL' : 'DEV_DATABASE_URL'}`);
  process.exit(1);
}

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
});
