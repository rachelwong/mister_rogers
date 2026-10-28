/// <reference types="node" />
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { config } from './src/config.ts';

const url = new URL(config.database.url);

export default defineConfig({
  out: './src/drizzle/migrations',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    host: url.hostname,
    port: Number(url.port),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.slice(1),
    ssl: {
      rejectUnauthorized: true,
      ca: config.database.ca,
    },
  },
});
