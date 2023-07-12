import mysql, { OkPacket, QueryOptions, RowDataPacket } from 'mysql2/promise';
import { env } from '@/utils/env';

const pool = mysql.createPool({
  host: env.MYSQL_HOST,
  port: env.MYSQL_PORT,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
});

type MYSQLDefaults =
  | RowDataPacket[]
  | RowDataPacket[][]
  | OkPacket[]
  | OkPacket;
type QueryResult<T> = T & MYSQLDefaults;

export async function query<T>(options: QueryOptions) {
  const [rows, fields] = await pool.query<QueryResult<T[]>>(options);
  return rows;
}
