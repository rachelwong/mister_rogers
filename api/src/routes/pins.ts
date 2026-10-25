import type { Request, Response } from 'express';
import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { pinStore } from '../data/pinStore.ts';
import { requireJson, validatePinBody } from '../middleware/validation.ts';
import {
  CreatePinSchema,
  type CreatePinRequest,
} from '../schemas/pinSchema.ts';
import { getCurrentDateTime } from '../utils/pinUtils.ts';

export const pinsRouter: Router = Router();

pinsRouter.get('/', (_, res: Response) => {
  const pins = pinStore;

  res.status(200).json(pins);
});

pinsRouter.get('/:id', (req, res: Response) => {
  const id = req.params.id;
  const selectedPin = pinStore.find((x) => x.id === id);
  if (!selectedPin) {
    res.status(404).json({
      error: 'Pin not found',
    });
  }
  res.status(200).json(selectedPin);
});

pinsRouter.post(
  '/',
  requireJson,
  validatePinBody(CreatePinSchema),
  (req: Request<object, unknown, CreatePinRequest>, res: Response) => {
    const { description, coords, type } = req.body;

    const id = randomUUID();
    const createdAt = getCurrentDateTime();
    const newPin = {
      id,
      description: description.trim(),
      coords,
      type,
      createdAt,
    };

    // TODO to update with database connection
    pinStore.push(newPin);

    res.status(201).json({
      status: 'success',
      message: 'Pin created successfully',
      data: newPin,
    });
  }
);
