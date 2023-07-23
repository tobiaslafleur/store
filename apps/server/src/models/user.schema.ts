import { users } from '@/db/schema';
import { createInsertSchema } from 'drizzle-zod';

export const createUserSchema = createInsertSchema(users);
