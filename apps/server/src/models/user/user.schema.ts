import { users } from '@/db/schema';
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

export type createUserRequest = z.infer<typeof createUserSchema>;
export type createUserType = InferModel<typeof users, 'insert'>;
