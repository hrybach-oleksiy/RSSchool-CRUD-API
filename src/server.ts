import http from 'http';
import dotenv from 'dotenv';
import { requestListener } from './routes';

dotenv.config();

const PORT = process.env.PORT || 3000;

const createServer = async () => {
  const server = http.createServer(requestListener);

  return server;
};

const start = async () => {
  try {
    const server = await createServer();

    server.listen(PORT, () => {
      console.log(`Server starts on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
