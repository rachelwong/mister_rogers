import http from 'node:http';
import createApp from './app.ts';
import { config } from './config.ts';

const app = createApp();

const httpServer = http.createServer(app);

httpServer.on('error', (error: Error) => {
  console.error(`Error starting HTTP server ${error.message}`);
  process.exit(1);
});

httpServer.listen(config.port, () => {
  console.log(`Mister Rogers backend listening on port ${config.port}`);
});
