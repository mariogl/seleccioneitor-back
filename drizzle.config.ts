import { defineConfig } from "drizzle-kit";
import "dotenv/config";

const getDatabaseName = (): string => {
  if (process.env.NODE_ENV === "test") {
    return process.env.POSTGRES_DBNAME_TEST!;
  }
  return process.env.POSTGRES_DBNAME!;
};

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/entities/application/schema/application.schema.ts",
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
