import { type PinType } from '../utils/constants.ts';

export type Coords = { lat: number; lng: number } | null;

export interface Pin {
  id: string; // uuid
  type: PinType;
  description: string;
  coords: Coords;
  createdAt: string; // utc string date
}
