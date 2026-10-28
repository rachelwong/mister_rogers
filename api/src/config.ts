import fs from 'node:fs';
import path from 'node:path';
import type { Config } from './types/config.ts';

const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    console.error(`${name} is not set.`);
    process.exit(1);
  }
  return value;
};

// Database-only config, shared by the app and drizzle.config.ts
export function loadDatabaseConfig(): Config['database'] {
  const caCertPath = requireEnv('DATABASE_CA_CERT_PATH');
  return {
    url: requireEnv('DATABASE_URL'),
    ca: fs.readFileSync(path.resolve(caCertPath), 'utf8'),
  };
}

function assertProductionCorsOrigin(origin: string): void {
  if (origin === '*') {
    throw new Error('CORS_ORIGIN must not contain "*" in production');
  }
  if (origin.endsWith('/')) {
    throw new Error(`CORS_ORIGIN must not have a trailing slash: ${origin}`);
  }
  if (origin === 'http://localhost:5173') {
    throw new Error(
      'CORS_ORIGIN must not be the local development default in production'
    );
  }
  if (!origin.startsWith('https://')) {
    throw new Error(`CORS_ORIGIN must use https in production: ${origin}`);
  }
}

export function loadConfig(): Config {
  const port = Number(process.env.PORT) || 3000;
  const nodeEnv = process.env.NODE_ENV ?? 'development';

  const corsOrigins = requireEnv('CORS_ORIGIN')
    ?.split(',')
    .map((x) => x.trim())
    .filter((x) => x !== '');

  if (!corsOrigins?.length) {
    console.error(`CORS_ORIGIN is not set.`);
    process.exit(1);
  }
  if (nodeEnv === 'production') {
    corsOrigins.forEach(assertProductionCorsOrigin);
  }

  return {
    port,
    nodeEnv,
    corsOrigins,
    database: loadDatabaseConfig(),
  };
}
