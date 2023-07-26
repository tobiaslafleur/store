import db from '@/db';
import { product_images, products } from '@/db/schema';
import { CreateProduct } from '@/models/products/products.schema';
import { asc, eq, sql } from 'drizzle-orm';

export async function createProduct(input: CreateProduct) {
  const insertResult = await db.insert(products).values(input);

  const productList = await db
    .select()
    .from(products)
    .where(eq(products.id, insertResult[0].insertId));

  return productList[0];
}

export async function insertImagesIntoDB({
  images,
  id,
}: {
  images: string[];
  id: number;
}) {
  await Promise.all(
    images.map((img) =>
      db.insert(product_images).values({ product_id: id, url: img })
    )
  );
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
      id: products.uuid,
      sku: products.sku,
      name: products.name,
      description: products.description,
      price: products.price,
      image: products.image,
      created_at: products.created_at,
      updated_at: products.updated_at,
    })
    .from(products)
    .limit(limit)
    .offset(limit * offset)
    .orderBy(asc(products.id));

  return productList;
}

export async function getProduct(id: string) {
  const productList = await db.query.products.findFirst({
    where: eq(products.uuid, id),
    with: {
      images: true,
    },
    columns: {},
  });

  return productList;
}
