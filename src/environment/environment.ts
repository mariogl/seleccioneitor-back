import "dotenv/config.js";

// Environment variable guards
const requiredEnvironmentVariables = [
  "POSTGRES_HOST",
  "POSTGRES_PORT",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DBNAME",
];

for (const environmentVariable of requiredEnvironmentVariables) {
  if (!process.env[environmentVariable]) {
    throw new Error(
      `Missing required environment variable: ${environmentVariable}`
    );
  }
}

const environment = {
  port: Number(process.env.PORT || 4000),
  database: {
    host: process.env.POSTGRES_HOST!,
    port: Number(process.env.POSTGRES_PORT)!,
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    name: process.env.POSTGRES_DBNAME!,
  },
};

export default environment;
