import { productsTable } from '@/db/schema';
import { InferModel } from 'drizzle-orm';
import z from 'zod';

export const createProductSchema = z.object({
  sku: z
    .string({
      required_error: 'sku is required',
      invalid_type_error: 'sku must be of type string',
    })
    .min(8, { message: 'sku must be 8-12 characters long' })
    .max(12, { message: 'sku must be 8-12 characters long' }),
  name: z.string({
    required_error: 'name is required',
    invalid_type_error: 'name must be of type string',
  }),
  description: z
    .string({
      required_error: 'description is required',
      invalid_type_error: 'description must be of type string',
    })
    .max(65535, { message: 'description is too long' }),
  price: z
    .number({
      coerce: true,
      required_error: 'price is required',
      invalid_type_error: 'price must be of type number',
    })
    .min(0, { message: 'price must be a positive number' })
    .max(1000000000, { message: 'price is too high' }),
});

export type CreateProductRequest = z.infer<typeof createProductSchema>;
export type CreateProduct = InferModel<typeof productsTable, 'insert'>;

export const getMultipleProductsSchema = z.object({
  limit: z
    .number({
      coerce: true,
      invalid_type_error: 'limit must be of type number',
    })
    .min(1)
    .max(50)
    .default(10),
  offset: z
    .number({
      coerce: true,
      invalid_type_error: 'page must be of type number',
    })
    .min(0)
    .default(0),
});

export type GetMultipleProducts = z.infer<typeof getMultipleProductsSchema>;
