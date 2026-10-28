import type { PinData } from '../db/schema.ts';
import type { Pin } from '../types/pin.ts';

// util functions to convert database data into typescript models
export const transformPin = (data: PinData): Pin => {
  return {
    id: data.id,
    type: data.type,
    description: data.description,
    coords: {
      lat: data.lat,
      lng: data.lng,
    },
    createdAt: data.createdAt.toISOString(),
  };
};
