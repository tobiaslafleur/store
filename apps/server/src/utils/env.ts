import z from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  PG_HOST: z.string().ip(),
  PG_PORT: z.coerce.number().default(5432),
  PG_DATABASE: z.string(),
  PG_USER: z.string(),
  PG_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);
