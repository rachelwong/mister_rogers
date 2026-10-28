// database seed script (keep separate from migrations)
import 'dotenv/config';
import { PIN_TYPE } from '../utils/constants.ts';
import { db, queryClient } from './index.ts';
import { pins } from './schema.ts';

async function main() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Do not run seed script in production!');
  }

  console.log('🌱 Seeding database...');

  // Insert sample pins
  const inserted = await db
    .insert(pins)
    .values([
      {
        id: '00000000-0000-4000-8000-000000000001',
        type: PIN_TYPE.DRAINAGE,
        description: 'Gutter on Ipswich Road overflows in every big storm',
        lat: -27.5098,
        lng: 153.0331,
        createdAt: new Date('2026-10-01T08:00:00.000Z'),
      },
      {
        id: '00000000-0000-4000-8000-000000000002',
        type: PIN_TYPE.FLOODING,
        description:
          'Underpass on Fairfield Road goes ankle deep after heavy rain',
        lat: -27.5085,
        lng: 153.023,
        createdAt: new Date('2026-10-02T08:00:00.000Z'),
      },
      {
        id: '00000000-0000-4000-8000-000000000003',
        type: PIN_TYPE.WILDLIFE,
        description:
          'Magpie swoops cyclists near the Yeronga park path in spring',
        lat: -27.518,
        lng: 153.016,
        createdAt: new Date('2026-10-03T08:00:00.000Z'),
      },
      {
        id: '00000000-0000-4000-8000-000000000004',
        type: PIN_TYPE.AMENITY,
        description: 'Clean public toilets with a parent room at Moorooka park',
        lat: -27.5352,
        lng: 153.0241,
        createdAt: new Date('2026-10-04T08:00:00.000Z'),
      },
      {
        id: '00000000-0000-4000-8000-000000000005',
        type: PIN_TYPE.PARKING,
        description: 'Street parking fills by 7am on game days in West End',
        lat: -27.481,
        lng: 153.009,
        createdAt: new Date('2026-10-05T08:00:00.000Z'),
      },
      {
        id: '00000000-0000-4000-8000-000000000006',
        type: PIN_TYPE.RECREATION,
        description: 'Shady picnic tables by the river at Orleigh Park',
        lat: -27.4875,
        lng: 153.0035,
        createdAt: new Date('2026-10-06T08:00:00.000Z'),
      },
    ])
    .onConflictDoNothing({ target: pins.id });

  console.log(`✅ Seeding complete! ${inserted.length} sample pins`);
  await queryClient.end(); // close connection
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
