export const PIN_TYPE = {
  DRAINAGE: 'drainage',
  FLOODING: 'flooding',
  WILDLIFE: 'wildlife',
  AMENITY: 'amenity',
  CHILDREN: 'children',
  PARKING: 'parking',
  TRAFFIC: 'traffic',
  RECREATION: 'recreation',
  DISABILITY: 'disability',
  SIGNAGE: 'signage',
  NONE: 'none',
} as const;

export const PIN_VALIDATION = {
  DESCRIPTION: {
    MAX: 500,
    MIN: 10,
  },
  LATITUDE: {
    MIN: -90,
    MAX: 90,
  },
  LONGITUDE: {
    MIN: -180,
    MAX: 180,
  },
};
