import type { PIN_TYPE } from '../utils/constants.ts';

export type Coords = { lat: number; lng: number } | null;

export type YearsAtAddress = 'under-3' | '3-10' | 'more-than-10';

export type PublicUserDetails = {
  displayName: string;
  livesNearby: boolean;
  yearsAtAddress?: YearsAtAddress;
};

export type Pin = MapPin & {
  description: string;
  createdAt: string; // utc string date
  votes: number;
  replyCount: number;
  userDetails: PublicUserDetails | null;
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
