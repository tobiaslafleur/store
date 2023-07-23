import 'dotenv/config';
import z from 'zod';

// TODO: Add error handling for ENV file
const envSchema = z.object({
  HOST: z.string().ip().default('127.0.0.1'),
  PORT: z.coerce.number().default(3001),
  MYSQL_HOST: z.string().ip(),
  MYSQL_PORT: z.coerce.number().default(3306),
  MYSQL_DATABASE: z.string(),
  MYSQL_USER: z.string(),
  MYSQL_PASSWORD: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
