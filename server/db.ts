import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import ws from "ws";
import * as schema from "../src/shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}

// Create a neon SQL executor instead of a Pool
const sql = neon(process.env.DATABASE_URL!);
// Pass the SQL executor to drizzle
export const db = drizzle(sql, { schema });
