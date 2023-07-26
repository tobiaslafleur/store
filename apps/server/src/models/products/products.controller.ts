import {
  CreateProductRequest,
  GetMultipleProducts,
} from '@/models/products/products.schema';
import {
  createProduct,
  getMultipleProducts,
  getProduct,
  insertImagesForProduct,
} from '@/models/products/products.service';
import { HTTPError } from '@/utils/error';
import { validateMulter } from '@/utils/multer';
import { toBinaryFromUUID } from '@/utils/uuid';
import { ValidatedRequest } from '@/utils/validateRequest';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

// TODO: Add error handling if something fails, to rollback uploads and inserts
export async function createProductHandler(
  request: ValidatedRequest<{ body: CreateProductRequest }>,
  response: Response,
  next: NextFunction
) {
  try {
    const { product_image, image_gallery } = validateMulter<
      ['product_image', 'image_gallery']
    >(request.files);

    const productImagePath = product_image.map(
      (img) => img.destination + img.filename
    );

    const product = await createProduct({
      ...request.body,
      price: String(request.body.price),
      uuid: toBinaryFromUUID(randomUUID()),
      image: productImagePath[0],
    });

    const imageGalleryPaths = image_gallery.map((img) => ({
      url: img.destination + img.filename,
      product_id: toBinaryFromUUID(product.id),
    }));

    await insertImagesForProduct(imageGalleryPaths);

    return response.status(201).send({ product });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return next(
          new HTTPError({
            code: 'CONFLICT',
            message: 'Product SKU is already in use',
          })
        );
      }
    }

    if (error instanceof HTTPError) {
      return next(error);
    }

    return next(new HTTPError({ code: 'INTERNAL_SERVER_ERROR' }));
  }
}

export async function getMultipleProductsHandler(
  request: ValidatedRequest<{ query: GetMultipleProducts }>,
  response: Response,
  next: NextFunction
) {
  try {
    const productList = await getMultipleProducts(request.query);

    return response.status(200).send(productList);
  } catch (error: unknown) {
    return next(new HTTPError({ code: 'INTERNAL_SERVER_ERROR' }));
  }
}

export async function getProductHandler(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const result = await getProduct(toBinaryFromUUID(request.params.id));

    response.status(200).send(result);
  } catch (error: unknown) {
    return next(new HTTPError({ code: 'INTERNAL_SERVER_ERROR' }));
  }
}
