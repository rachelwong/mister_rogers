import http from 'node:http';
import createApp from './app.ts';
import type { Config } from './types/config.ts';

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  corsOrigins: process.env.CORS_ORIGIN ?? '',
  nodeEnv: process.env.NODE_ENV ?? 'development',
};

const app = createApp();

const httpServer = http.createServer(app);

httpServer.on('error', (error: Error) => {
  console.error(`Error starting HTTP server ${error.message}`);
  process.exit(1);
});

httpServer.listen(config.port, () => {
  console.log(`Mister Rogers backend listening on port ${config.port}`);
});
