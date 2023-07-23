import { uuid } from '@/utils/uuid';
import {
  index,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable(
  'users',
  {
    id: int('id').primaryKey().autoincrement(),
    uuid: uuid('uuid').notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    first_name: varchar('first_name', { length: 35 }).notNull(),
    last_name: varchar('last_name', { length: 35 }).notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
  },
  function (table) {
    return {
      uuid_index: index('uuid_index').on(table.uuid),
      email_index: index('email_index').on(table.email),
    };
  }
);
