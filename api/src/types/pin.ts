import type { PIN_TYPE } from '../utils/constants.ts';

export type Coords = { lat: number; lng: number } | null;

export interface Pin {
  id: string; // uuid
  type: PinType;
  description: string;
  coords: Coords;
  createdAt: string; // utc string date
}

export type PinType = (typeof PIN_TYPE)[keyof typeof PIN_TYPE];

// inactive = deleted
// draft = not approved
// active = approved / visible
export type PinStatus = 'draft' | 'active' | 'inactive';
