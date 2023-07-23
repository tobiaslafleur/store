import env from '@/utils/env';
import type { Config } from 'drizzle-kit';

const { MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } =
  env;

export default {
  schema: './src/db/schema.ts',
  driver: 'mysql2',
  dbCredentials: {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
  },
  out: './sql',
} satisfies Config;
