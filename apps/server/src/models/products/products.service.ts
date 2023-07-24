import db from '@/db';
import { productsTable } from '@/db/schema';
import { CreateProduct } from '@/models/products/products.schema';
import { asc, eq } from 'drizzle-orm';

export async function createProduct(input: CreateProduct) {
  const insertResult = await db.insert(productsTable).values(input);

  const productList = await db
    .select({
      id: productsTable.uuid,
      sku: productsTable.sku,
      name: productsTable.name,
      description: productsTable.description,
      price: productsTable.price,
      created_at: productsTable.created_at,
      updated_at: productsTable.updated_at,
    })
    .from(productsTable)
    .where(eq(productsTable.id, insertResult[0].insertId));

  return productList[0];
}

export async function getMultipleProducts({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  const productList = await db
    .select({
      id: productsTable.uuid,
      sku: productsTable.sku,
      name: productsTable.name,
      description: productsTable.description,
      price: productsTable.price,
      created_at: productsTable.created_at,
      updated_at: productsTable.updated_at,
    })
    .from(productsTable)
    .limit(limit)
    .offset(limit * offset)
    .orderBy(asc(productsTable.id));

  return productList;
}
