import mysql, {
  OkPacket,
  PoolConnection,
  QueryOptions,
  RowDataPacket,
} from 'mysql2/promise';
import { env } from '@/utils/env';

type MYSQLDefaults =
  | RowDataPacket[]
  | RowDataPacket[][]
  | OkPacket
  | OkPacket[];
type Query<T> = T & MYSQLDefaults;

function dbConnection() {
  const pool = mysql.createPool({
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
  });

  return {
    getConnection: async function () {
      return pool.getConnection();
    },
    releaseConnection: function (conn: PoolConnection) {
      pool.releaseConnection(conn);
    },
    query: async function <T>(query: QueryOptions) {
      const [rows, fields] = await pool.query<Query<T>>(query);
      return [rows, fields];
    },
  };
}

const db = dbConnection();

export default db;
