import type { PinData } from '../db/schema.ts';
import type { MapPin, Pin } from '../types/pin.ts';

// util functions to convert database data into typescript models
export const transformPinData = (data: PinData): Pin => {
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

export const transformMapPin = (pin: Pin): MapPin => {
  const { id, type, coords } = pin;
  return { id, type, coords };
};
