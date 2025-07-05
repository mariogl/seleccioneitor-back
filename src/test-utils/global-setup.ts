import { exec } from "child_process";
import { promisify } from "util";
import { sql } from "drizzle-orm";
import chalk from "chalk";
import db from "../db/index.js";

const execAsync = promisify(exec);

export const setup = async (): Promise<void> => {
  console.log(chalk.blue("🏗️  Setting up test database..."));

  try {
    await db.execute(sql`CREATE SCHEMA IF NOT EXISTS public;`);

    console.log(chalk.yellow("🔄 Running database migrations..."));
    await execAsync("npm run db:migrate");
    console.log(chalk.green("✅ Database migrations completed successfully"));
  } catch (error) {
    console.error(chalk.red("❌ Failed to setup test database:"), error);
    throw error;
  }
};

export const teardown = async (): Promise<void> => {
  console.log(chalk.blue("🧹 Cleaning up test database..."));

  try {
    await db.execute(sql`DROP SCHEMA IF EXISTS public CASCADE;`);
    await db.execute(sql`DROP SCHEMA IF EXISTS drizzle CASCADE;`);
    console.log(chalk.green("✅ Test database cleanup completed successfully"));
  } catch (error) {
    console.error(chalk.red("❌ Failed to cleanup test database:"), error);
    throw error;
  }
};
