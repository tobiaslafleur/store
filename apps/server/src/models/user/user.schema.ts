import { userTable } from '@/db/schema';
import { InferModel } from 'drizzle-orm';
import z from 'zod';

// TODO: Add all createUser error messages
export const createUserSchema = z
  .object({
    email: z
      .string({
        required_error: 'email is required',
      })
      .email(),
    password: z.string({
      required_error: 'password is required',
    }),
    confirm_password: z.string({
      required_error: 'confirm_password is required',
    }),
    first_name: z.string(),
    last_name: z.string(),
  })
  .refine(function (val) {
    return val.password === val.confirm_password;
  });

export type CreateUserRequest = z.infer<typeof createUserSchema>;
export type CreateUser = InferModel<typeof userTable, 'insert'>;

// TODO: Add all getMultipleUsers error messages
export const getMultipleUsersSchema = z.object({
  limit: z.coerce.number().min(1).max(50).default(10),
  page: z.coerce.number().min(0).default(0),
});

export type GetMultipleUsers = z.infer<typeof getMultipleUsersSchema>;
