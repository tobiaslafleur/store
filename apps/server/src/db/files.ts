export type Queries = keyof typeof SQLFiles;

export const SQLFiles = {
  createUser: 'createUser',
} as const;
