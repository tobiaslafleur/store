import env from '@/utils/env';
import { drizzle } from 'drizzle-orm/mysql2';
import { createPool } from 'mysql2';

const { MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } =
  env;

const pool = createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
});

const db = drizzle(pool);

export default db;
