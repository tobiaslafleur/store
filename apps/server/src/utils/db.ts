import { env } from '@/utils/env';
import { Pool } from 'pg';

export const db = new Pool({
  host: env.PG_HOST,
  port: env.PG_PORT,
  database: env.PG_DATABASE,
  user: env.PG_USER,
  password: env.PG_PASSWORD,
});

export const connectToPostgres = async () => {
  try {
    await db.connect();
  } catch (error: any) {
    process.exit(1);
  }
};
