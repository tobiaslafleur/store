import 'dotenv/config';

import { connectToPostgres } from '@/utils/db';
import { buildServer } from '@/utils/server';
import { env } from '@/utils/env';

const main = async () => {
  const app = buildServer();

  await connectToPostgres();

  app.listen(env.PORT).on('error', () => {
    process.exit(1);
  });
};

main();
