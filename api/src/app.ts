import express, { type Express, type Request, type Response } from 'express';
import { errorHandler } from './middleware/errorHandler.ts';
import { pinsRouter } from './routes/pins.ts';

const createApp = (): Express => {
  const app = express();
  app.use(express.json()); // Parses application/json
  app.use(express.urlencoded({ extended: true })); // Parses form submissions

  app.get('/health', (_: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use('/pins', pinsRouter);

  app.use(errorHandler);

  return app;
};

export default createApp;
