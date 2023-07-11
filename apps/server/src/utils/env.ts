import z from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  MYSQL_HOST: z.string().ip(),
  MYSQL_PORT: z.coerce.number().default(5432),
  MYSQL_DATABASE: z.string(),
  MYSQL_USER: z.string(),
  MYSQL_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);
