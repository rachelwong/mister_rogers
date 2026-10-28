import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { loadDatabaseConfig } from '../config.ts';

const config = loadDatabaseConfig();
// prepared false not needed for session pooler
export const queryClient = postgres(config.url, {
  ssl: {
    rejectUnauthorized: true,
    // Apply SSL certificate
    ca: config.ca,
  },
  max: 5,
  idle_timeout: 300, // Keep idle connections for 5 minutes, so requests skip the slow reconnect (in seconds)
  connect_timeout: 5, // Fail fast if a connection can't be made (in seconds)
});

export const db = drizzle(queryClient);
