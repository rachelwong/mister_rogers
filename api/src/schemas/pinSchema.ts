import * as z from 'zod';
import { PIN_TYPE, PIN_VALIDATION } from '../utils/constants.ts';

// response schema more useful on the FE
// to check what comes back from the API at runtime
export const CreatePinSchema = z.object({
  type: z.enum(PIN_TYPE, {
    error: (issue) =>
      issue.input === undefined
        ? 'Type is required'
        : `Type must be one of: ${Object.values(PIN_TYPE).join(', ')}`,
  }),
  description: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'Description is required'
          : 'Invalid description format',
    })
    .trim() // trim here before checking the length
    .min(1, { error: 'Description is required', abort: true }) // add check for no description and abort to get just this error
    // https://zod.dev/api?id=abort#abort
    .max(PIN_VALIDATION.DESCRIPTION.MAX, {
      error: `Pin description must be at most ${PIN_VALIDATION.DESCRIPTION.MAX} characters long.`,
    })
    .min(PIN_VALIDATION.DESCRIPTION.MIN, {
      error: `Pin description must be at least ${PIN_VALIDATION.DESCRIPTION.MIN} characters long.`,
    }),
  coords: z.object(
    {
      lat: z
        .number({ error: 'Latitude must be a number' })
        .min(PIN_VALIDATION.LATITUDE.MIN, {
          error: `Latitude must be between ${PIN_VALIDATION.LATITUDE.MIN} and ${PIN_VALIDATION.LATITUDE.MAX}`,
        })
        .max(PIN_VALIDATION.LATITUDE.MAX, {
          error: `Latitude must be between ${PIN_VALIDATION.LATITUDE.MIN} and ${PIN_VALIDATION.LATITUDE.MAX}`,
        }),
      lng: z
        .number({ error: 'Longitude must be a number' })
        .min(PIN_VALIDATION.LONGITUDE.MIN, {
          error: `Longitude must be between ${PIN_VALIDATION.LONGITUDE.MIN} and ${PIN_VALIDATION.LONGITUDE.MAX}`,
        })
        .max(PIN_VALIDATION.LONGITUDE.MAX, {
          error: `Longitude must be between ${PIN_VALIDATION.LONGITUDE.MIN} and ${PIN_VALIDATION.LONGITUDE.MAX}`,
        }),
    },
    { error: 'Location is required' }
  ),
});

export const GetPinSchema = z.object({
  id: z.uuid({ error: 'Invalid Request ID format. Must be a valid UUID.' }),
});

export type GetPinRequest = z.infer<typeof GetPinSchema>;

export type CreatePinRequest = z.infer<typeof CreatePinSchema>;
