import type { PIN_TYPE } from '../utils/constants.ts';

export type Coords = { lat: number; lng: number } | null;

export type Pin = MapPin & {
  description: string;
  createdAt: string; // utc string date
};

export interface MapPin {
  id: string; // uuid
  type: PinType;
  coords: Coords;
}

export type PinType = (typeof PIN_TYPE)[keyof typeof PIN_TYPE];

// inactive = deleted
// draft = not approved
// active = approved / visible
export type PinStatus = 'draft' | 'active' | 'inactive';
