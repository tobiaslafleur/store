import {
  CreateProductRequest,
  GetMultipleProducts,
} from '@/models/products/products.schema';
import {
  createProduct,
  getMultipleProducts,
} from '@/models/products/products.service';
import { HTTPError } from '@/utils/error';
import { ValidatedRequest } from '@/utils/validateRequest';
import { randomUUID } from 'crypto';
import { NextFunction, Response } from 'express';

export async function createProductHandler(
  request: ValidatedRequest<{ body: CreateProductRequest }>,
  response: Response,
  next: NextFunction
) {
  try {
    const { price, ...input } = request.body;

    const product = await createProduct({
      ...input,
      price: String(price),
      uuid: randomUUID(),
      image: '',
    });

    return response.status(201).send(product);
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
