import type { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction // needed, even if unused as otherwise errorhandler will be treated as a normal middleware
): void => {
  console.error('Error catch all', err);

  if (
    err instanceof SyntaxError &&
    'type' in err &&
    err.type === 'entity.parse.failed' // handles invalid json errors
  ) {
    res.status(400).json({ error: 'Request body is not valid JSON' });
    return;
  }
  // check content type separately
  res.status(500).json({
    error: 'Something went wrong',
  });
};
