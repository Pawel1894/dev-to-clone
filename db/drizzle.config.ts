import "dotenv/config";
import type { Config } from "drizzle-kit";

const config: Config = {
  schema: "schema.ts",
  out: "migrations",
  driver: "better-sqlite",
  dbCredentials: {
    url: "db.sqlite",
  },
};

export default config;
