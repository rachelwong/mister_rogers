import type { NextFunction, Request, Response } from 'express';
import * as z from 'zod';

export const requireJson = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.is('application/json')) {
    return res.status(400).json({
      error: 'Send the pin as JSON (Content-Type: application/json)',
    });
  }
  // add return here for typescript
  return next();
};

export const validatePinBody =
  <T>(schema: z.ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: 'Invalid pin',
        details: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }
    req.body = result.data;
    next();
  };
