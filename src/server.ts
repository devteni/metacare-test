import http from 'http';
import app from './app';
import logger from './utils/logger';
import config from './config';
const { port } = config.server;

const PORT = port || 4001;

const server = http.createServer(app);
const runServer = async (): Promise<void> => {
  server.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}`);
  });
};

runServer();
