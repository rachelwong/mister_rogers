import * as z from 'zod';
import type { Pin } from '../types/pin.ts';
import { PIN_TYPE, PIN_VALIDATION, type PinType } from '../utils/constants.ts';

export const CreatePinSchema = z.object({
  type: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'Type is required' : 'Invalid type',
    })
    .refine((pinType): pinType is PinType => {
      return Object.values(PIN_TYPE).includes(pinType as PinType);
    }),
  description: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'Description is required'
          : 'Invalid description format',
    })
    .max(PIN_VALIDATION.DESCRIPTION.MAX, {
      message: `Pin description must be at most ${PIN_VALIDATION.DESCRIPTION.MAX} characters long.`,
    })
    .min(PIN_VALIDATION.DESCRIPTION.MIN, {
      message: `Pin description must be at least ${PIN_VALIDATION.DESCRIPTION.MIN} characters long.`,
    }),
  coords: z.object(
    {
      lat: z
        .number({
          error: (issue) =>
            !Number.isNaN(issue.input)
              ? 'Latitude must be a number'
              : 'Invalid latitude',
        })
        .min(PIN_VALIDATION.LATITUDE.MIN, {
          message: `Latitude must be between ${PIN_VALIDATION.LATITUDE.MIN} and ${PIN_VALIDATION.LATITUDE.MAX}`,
        })
        .max(PIN_VALIDATION.LATITUDE.MAX, {
          message: `Latitude must be between ${PIN_VALIDATION.LATITUDE.MIN} and ${PIN_VALIDATION.LATITUDE.MAX}`,
        }),
      lng: z
        .number({
          error: (issue) =>
            !Number.isNaN(issue.input)
              ? 'Longitude must be a number'
              : 'Invalid longitude',
        })
        .min(PIN_VALIDATION.LONGITUDE.MIN, {
          message: `Longitude must be between ${PIN_VALIDATION.LONGITUDE.MIN} and ${PIN_VALIDATION.LONGITUDE.MAX}`,
        })
        .max(PIN_VALIDATION.LONGITUDE.MAX, {
          message: `Longitude must be between ${PIN_VALIDATION.LONGITUDE.MIN} and ${PIN_VALIDATION.LONGITUDE.MAX}`,
        }),
    },
    { error: 'Location is required' }
  ),
});

export type CreatePinRequest = z.infer<typeof CreatePinSchema>;

export const CreatePinResponseSchema = z.object({
  id: z.string({
    error: (issue) =>
      issue.input === undefined
        ? 'Pin id is required'
        : 'Invalid pin id format',
  }),
  ...CreatePinSchema.shape,
  createdAt: z.iso
    .datetime({
      offset: true,
      message: 'Invalid ISO datetime format.',
    })
    .refine(
      (val) => {
        const inputDate = new Date(val);
        // Compares the absolute timestamp against the current exact moment in time
        return !isNaN(inputDate.getTime()) && inputDate.getTime() <= Date.now();
      },
      {
        message: 'Created datetime cannot be in the future',
      }
    ),
}) satisfies z.ZodType<Pin>;

export const PinTypeObjectSchema = z.object(
  Object.fromEntries(
    Object.entries(PIN_TYPE).map(([key, value]) => [key, z.literal(value)])
  ) as { [K in keyof typeof PIN_TYPE]: z.ZodLiteral<(typeof PIN_TYPE)[K]> }
);

export type PinTypeSchema = z.infer<typeof PinTypeObjectSchema>;
