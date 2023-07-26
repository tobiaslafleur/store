import { prisma } from '@/utils/db';
import { toUUIDFromBinary } from '@/utils/uuid';
import { Prisma } from '@prisma/client';

export async function createProduct(input: Prisma.productsCreateInput) {
  const product = await prisma.products
    .create({
      data: input,
      select: {
        uuid: true,
        sku: true,
        name: true,
        price: true,
        description: true,
        image: true,
        created_at: true,
        updated_at: true,
      },
    })
    .then(({ uuid, ...rest }) => ({ id: toUUIDFromBinary(uuid), ...rest }));

  return product;
}

export async function insertImagesForProduct(
  input:
    | Prisma.product_imagesCreateManyInput
    | Prisma.product_imagesCreateManyInput[]
) {
  await prisma.product_images.createMany({
    data: input,
  });
}

export async function getMultipleProducts({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  const products = await prisma.products
    .findMany({
      select: {
        uuid: true,
        sku: true,
        name: true,
        price: true,
        description: true,
        image: true,
        created_at: true,
        updated_at: true,
      },
      take: limit,
      skip: limit * offset,
    })
    .then((products) =>
      products.map(({ uuid, ...rest }) => ({
        id: toUUIDFromBinary(uuid),
        ...rest,
      }))
    );

  return products;
}

export async function getProduct(id: Buffer) {
  const product = await prisma.products
    .findFirstOrThrow({
      select: {
        uuid: true,
        sku: true,
        name: true,
        price: true,
        description: true,
        image: true,
        created_at: true,
        updated_at: true,
        product_images: {
          select: {
            url: true,
          },
        },
      },
      where: {
        uuid: id,
      },
    })
    .then(({ uuid, product_images, ...rest }) => ({
      id: toUUIDFromBinary(uuid),
      ...rest,
      product_images: product_images.map((img) => img.url),
    }));

  return product;
}
