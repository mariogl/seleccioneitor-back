import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const getDatabaseName = (): string => {
  if (process.env.NODE_ENV === "test") {
    return process.env.POSTGRES_DBNAME_TEST!;
  }
  return process.env.POSTGRES_DBNAME!;
};

export default defineConfig({
  dialect: "postgresql",
  schema: "./dist/db/schema/index.js",
  out: "./drizzle",
  dbCredentials: {
    url: `postgresql://${process.env.POSTGRES_USER}:${
      process.env.POSTGRES_PASSWORD
    }@${process.env.POSTGRES_HOST}:${
      process.env.POSTGRES_PORT
    }/${getDatabaseName()}`,
  },
  verbose: true,
  strict: true,
});
