export const SQLFiles = {
  createUser: 'createUser',
  getUserByEmail: 'getUserByEmail',
  getUserById: 'getUserById',
  checkIfUserExists: 'checkIfUserExists',
} as const;

export type Queries = keyof typeof SQLFiles;

const FILE_PATHS = ['user'] as const;

export type Paths = (typeof FILE_PATHS)[number];
