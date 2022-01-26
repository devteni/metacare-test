import dotenv from 'dotenv';

dotenv.config();

const PORT: string | number = process.env.PORT!;

const SERVER: any = {
  port: PORT,
};

const config: Record<string, any> = {
  server: SERVER,
};

export default config;
