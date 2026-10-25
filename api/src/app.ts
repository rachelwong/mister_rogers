import express, { type Express, type Request, type Response } from 'express';
import type { Config } from './types/config.ts';

const createApp = (config: Config): Express => {
  const app = express();
  console.log('config', config);
  app.get('/health', (_: Request, res: Response) => {
    console.log('GET /health');
    res.status(200).json({ status: 'ok' });
  });
  return app;
};

export default createApp;
