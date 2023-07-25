import { uuid } from '@/utils/uuid';
import {
  decimal,
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable(
  'users',
  {
    id: int('id').primaryKey().autoincrement(),
    uuid: uuid('uuid').notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    first_name: varchar('first_name', { length: 35 }).notNull(),
    last_name: varchar('last_name', { length: 35 }).notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
  },
  function (table) {
    return {
      uuid_index: index('users_uuid_index').on(table.uuid),
      email_index: index('users_email_index').on(table.email),
    };
  }
);

export const productsTable = mysqlTable(
  'products',
  {
    id: int('id').primaryKey().autoincrement(),
    uuid: uuid('uuid').notNull(),
    sku: varchar('sku', { length: 12 }).unique().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description').notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    image: varchar('image', { length: 255 }).notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
  },
  function (table) {
    return {
      uuid_index: index('products_uuid_index').on(table.uuid),
    };
  }
);

export const productImagesTable = mysqlTable(
  'product_images',
  {
    id: int('id').primaryKey().autoincrement(),
    product_id: int('product_id')
      .notNull()
      .references(() => productsTable.id),
    url: varchar('url', { length: 255 }).notNull(),
  },
  function (table) {
    return {
      product_id_index: index('product_id_index').on(table.product_id),
    };
  }
);
