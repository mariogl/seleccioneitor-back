import { sql } from "drizzle-orm";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import db from "../db/index.js";
import { seedApplications } from "../entities/application/fixtures/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "../..");

export async function setup() {
  const migrationPath = join(projectRoot, "drizzle", "0000_lazy_overlord.sql");

  const migrationSQL = readFileSync(migrationPath, "utf-8");
  const statements = migrationSQL
    .split("--> statement-breakpoint")
    .map((stmt) => stmt.trim())
    .filter((stmt) => stmt.length > 0);

  for (const statement of statements) {
    await db.execute(sql.raw(statement));
  }

  await seedApplications();
}

export async function teardown() {
  const tables = await db.execute(sql`
    SELECT tablename FROM pg_tables 
    WHERE schemaname = 'public'
  `);

  for (const table of tables.rows) {
    await db.execute(
      sql.raw(`DROP TABLE IF EXISTS "${table.tablename}" CASCADE`)
    );
  }

  const types = await db.execute(sql`
    SELECT typname FROM pg_type 
    WHERE typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
    AND typtype = 'e'
  `);

  for (const type of types.rows) {
    await db.execute(sql.raw(`DROP TYPE IF EXISTS "${type.typname}" CASCADE`));
  }
}
