import { asc, eq } from 'drizzle-orm';
import type { CreatePinRequest } from '../schemas/pinSchema.ts';
import type { Pin } from '../types/pin.ts';
import { transformPin } from '../utils/transformDatabase.ts';
import { db } from './index.ts';
import { pins } from './schema.ts';

export async function getAllPins(): Promise<Pin[]> {
  try {
    const response = await db.select().from(pins).orderBy(asc(pins.createdAt));

    return response.map((pin) => transformPin(pin));
  } catch (err) {
    throw new Error(`Error getting all pins`, { cause: err });
  }
}

export async function getPin(id: string): Promise<Pin | null> {
  try {
    const singlePin = await db
      .select()
      .from(pins)
      .where(eq(pins.id, id))
      .limit(1);

    if (!singlePin.length) {
      return null;
    }

    return transformPin(singlePin[0]!);
  } catch (err) {
    throw new Error(`Error getting pin`, { cause: err });
  }
}

export async function createPin(
  pinRequest: CreatePinRequest
): Promise<Pin | null> {
  try {
    const response = await db
      .insert(pins)
      .values({
        type: pinRequest.type,
        description: pinRequest.description,
        lat: pinRequest.coords.lat,
        lng: pinRequest.coords.lng,
      })
      .returning();

    if (!response.length || !response[0]) {
      return null;
    }

    const transformedPin = transformPin({
      ...response[0],
    });

    return transformedPin;
  } catch (err) {
    throw new Error(`Error creating pin`, { cause: err });
  }
}
