import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from '../config.ts';

// prepared false not needed for session pooler
export const queryClient = postgres(config.database.url, {
  ssl: {
    rejectUnauthorized: true,
    // Apply SSL certificate
    ca: config.database.ca,
  },
  idle_timeout: 20, // Close idle connections quickly
  connect_timeout: 5, // Fail fast if a connection can't be made (in seconds)
});

export const db = drizzle(queryClient);
