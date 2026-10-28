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

const caCertPath = requireEnv('DATABASE_CA_CERT_PATH');

export const config: Config = {
  port: Number(process.env.PORT) || 3000,
  corsOrigins: process.env.CORS_ORIGIN ?? '',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  database: {
    url: requireEnv('DATABASE_URL'),
    ca: fs.readFileSync(path.resolve(caCertPath), 'utf8'),
  },
};
