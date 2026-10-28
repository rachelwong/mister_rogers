import type { Request, Response } from 'express';
import { Router } from 'express';
import { createPin, getAllPins, getPin } from '../db/pinQueries.ts';
import { requireJson, validatePinBody } from '../middleware/validation.ts';
import {
  CreatePinSchema,
  GetPinSchema,
  type CreatePinRequest,
} from '../schemas/pinSchema.ts';

export const pinsRouter: Router = Router();

pinsRouter.get('/', async (_, res: Response) => {
  const response = await getAllPins();
  return res.status(200).json(response);
});

pinsRouter.get('/:id', async (req, res: Response) => {
  const parsedId = GetPinSchema.safeParse(req.params);

  if (!parsedId.success) {
    return res.status(404).json({
      error: 'Pin not found',
    });
  }

  const id = parsedId.data.id;

  const selectedPin = await getPin(id);
  if (!selectedPin) {
    // return to prevent code flow continuing onwards
    return res.status(404).json({
      error: 'Pin not found',
    });
  }
  return res.status(200).json(selectedPin);
});

pinsRouter.post(
  '/',
  requireJson,
  validatePinBody(CreatePinSchema),
  async (req: Request<object, unknown, CreatePinRequest>, res: Response) => {
    const { description, coords, type } = req.body;

    const newPin = {
      description, // don't trim here, trim in schema
      coords,
      type,
    };
    const response = await createPin(newPin);

    if (!response) {
      throw new Error(`Error creating new pin`);
    }
    return res.status(201).json(response);
  }
);
