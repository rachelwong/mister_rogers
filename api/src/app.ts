import express, { type Express, type Request, type Response } from 'express';
import { errorHandler } from './middleware/errorHandler.ts';
import { pinsRouter } from './routes/pins.ts';

const createApp = (): Express => {
  const app = express();
  app.use(express.json()); // Parses application/json

  app.get('/health', (_: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use('/pins', pinsRouter);

  // handles any unmatched routes
  app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  app.use(errorHandler);

  return app;
};

export default createApp;
