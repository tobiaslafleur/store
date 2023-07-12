import { USER_ROLES } from '@store/types';
import { z } from 'zod';

export const createUserSchema = z
  .object({
    email: z
      .string({
        required_error: 'email is required',
        invalid_type_error: 'email must be a string',
      })
      .email('email must be a valid email'),
    first_name: z.string({
      required_error: 'first_name is required',
      invalid_type_error: 'first_name must be a string',
    }),
    last_name: z.string({
      required_error: 'last_name is required',
      invalid_type_error: 'last_name must be a string',
    }),
    role: z
      .enum(USER_ROLES, {
        errorMap: function (error, ctx) {
          switch (error.code) {
            case z.ZodIssueCode.invalid_enum_value:
              return { message: 'role must be a valid user role' };
            case z.ZodIssueCode.invalid_type:
              return { message: 'role must be a string' };
          }

          return { message: ctx.defaultError };
        },
      })
      .default('USER'),
    password: z
      .string({
        required_error: 'password is required',
        invalid_type_error: 'password must be a string',
      })
      .min(8, 'password must be 8 charcters or longer'),
    confirm_password: z
      .string({
        required_error: 'confirm_password is required',
        invalid_type_error: 'confirm_password must be a string',
      })
      .min(8, 'confirm_password must be 8 charcters or longer'),
  })
  .refine(
    function (data) {
      return data.password === data.confirm_password;
    },
    {
      message: 'Password do not match',
      path: ['confirm_password'],
    }
  );

export const getUserSchema = z.object({
  id: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type GetUserInput = z.infer<typeof getUserSchema>;
