import {
  CreateProductRequest,
  GetMultipleProducts,
} from '@/models/products/products.schema';
import {
  createProduct,
  getMultipleProducts,
  getProduct,
  insertImagesIntoDB,
} from '@/models/products/products.service';
import { HTTPError } from '@/utils/error';
import { validateMulter } from '@/utils/multer';
import { ValidatedRequest } from '@/utils/validateRequest';
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

    const productImagePath =
      product_image[0].destination + product_image[0].filename;
    const imageGalleryPaths = image_gallery.map(
      (img) => img.destination + img.filename
    );

    const { price, ...input } = request.body;

    const product = await createProduct({
      ...input,
      price: String(price),
      uuid: randomUUID(),
      image: productImagePath,
    });

    const { id, uuid, ...rest } = product;

    await insertImagesIntoDB({ images: imageGalleryPaths, id });

    return response.status(201).send({ ...rest, id: uuid });
  } catch (error: unknown) {
    console.log(error);

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
    const result = await getProduct(request.params.id);

    console.log(result);

    response.status(200).send(result);
  } catch (error: unknown) {
    return next(new HTTPError({ code: 'INTERNAL_SERVER_ERROR' }));
  }
}
