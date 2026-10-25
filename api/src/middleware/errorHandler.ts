import type { Request, Response } from 'express';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response
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
  if (err instanceof SyntaxError) {
    res.status(400).json({
      error: 'Send the pin as JSON (Content-Type: application/json)',
    });
    return;
  }
  res.status(500).json({
    error: 'Something went wrong',
  });
};
