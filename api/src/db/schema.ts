import { sql } from 'drizzle-orm';
import {
  check,
  doublePrecision,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import type { PinType } from '../types/pin.ts';
import { PIN_TYPE } from '../utils/constants.ts';

export const pins = pgTable(
  'pins',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    type: text('type').$type<PinType>().default(PIN_TYPE.NONE).notNull(),
    description: text('description').notNull(),
    lat: doublePrecision('lat').notNull(),
    lng: doublePrecision('lng').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check('description_not_empty', sql`length(trim(${table.description})) > 0`),
  ]
).enableRLS();
// keeps your code-first migrations and database schema declarations synchronized with your actual database state

export type PinData = typeof pins.$inferSelect;
