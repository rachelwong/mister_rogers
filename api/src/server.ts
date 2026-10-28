import http from 'node:http';
import createApp from './app.ts';
import { loadConfig } from './config.ts';

const config = loadConfig();

const app = createApp(config);

const httpServer = http.createServer(app);

httpServer.on('error', (error: Error) => {
  console.error(`Error starting HTTP server ${error.message}`);
  process.exit(1);
});

httpServer.listen(config.port, () => {
  console.log(`Mister Rogers backend listening on port ${config.port}`);
});
