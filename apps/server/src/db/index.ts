import mysql, { OkPacket, QueryOptions, RowDataPacket } from 'mysql2/promise';
import { env } from '@/utils/env';

type MYSQLDefaults =
  | RowDataPacket[]
  | RowDataPacket[][]
  | OkPacket[]
  | OkPacket;
type QueryResult<T> = T & MYSQLDefaults;

type CustomQueryOptions<T> = Omit<QueryOptions, 'values'> & {
  values?: T extends object ? T : never;
};

const pool = mysql.createPool({
  host: env.MYSQL_HOST,
  port: env.MYSQL_PORT,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  queryFormat: function (query, values): string {
    if (!values) return query;
    return query.replace(/:(\w+)/g, function (txt: string, key: string) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        return mysql.escape(values[key]);
      }
      return txt;
    });
  },
});

export async function query<T, K = unknown>(options: CustomQueryOptions<T>) {
  const [rows, fields] = await pool.query<QueryResult<K[]>>(options);
  return rows;
}
