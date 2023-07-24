import { userTable } from '@/db/schema';
import { InferModel } from 'drizzle-orm';
import z from 'zod';

export const createUserSchema = z
  .object({
    email: z
      .string({
        required_error: 'email is required',
        invalid_type_error: 'email must be of type string',
      })
      .email('email must be a valid email'),
    password: z.string({
      required_error: 'password is required',
      invalid_type_error: 'password must be of type string',
    }),
    confirm_password: z.string({
      required_error: 'confirm_password is required',
      invalid_type_error: 'confirm_password must be of type string',
    }),
    first_name: z.string({
      required_error: 'first_name is required',
      invalid_type_error: 'first_name must be of type string',
    }),
    last_name: z.string({
      required_error: 'last_name is required',
      invalid_type_error: 'last_name must be of type string',
    }),
  })
  .refine(
    function (val) {
      return val.password === val.confirm_password;
    },
    {
      message: 'Passwords do not match',
      path: ['confirm_password'],
    }
  );

export type CreateUserRequest = z.infer<typeof createUserSchema>;
export type CreateUser = InferModel<typeof userTable, 'insert'>;

export const getMultipleUsersSchema = z.object({
  limit: z
    .number({
      coerce: true,
      invalid_type_error: 'limit must be of type number',
    })
    .min(1)
    .max(50)
    .default(10),
  page: z
    .number({
      coerce: true,
      invalid_type_error: 'page must be of type number',
    })
    .min(0)
    .default(0),
});

export type GetMultipleUsers = z.infer<typeof getMultipleUsersSchema>;
