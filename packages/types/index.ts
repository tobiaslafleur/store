import { Request } from 'express';

export type ValidatedRequest<
  T extends { body?: any; params?: any; query?: any }
> = Request<T['params'], any, T['body'], T['query']>;

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role: UserRoles;
};

export type PartialUser = Omit<User, 'id'> & {
  confirm_password: string;
};

export const USER_ROLES = ['USER', 'ADMIN'] as const;
export type UserRoles = (typeof USER_ROLES)[number];
