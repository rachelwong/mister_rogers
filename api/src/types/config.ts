export interface Config {
  port: number;
  corsOrigins: string[];
  nodeEnv: string;
  database: {
    url: string;
    ca: string;
  };
}
