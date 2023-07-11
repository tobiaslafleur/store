import 'dotenv/config';
import { buildServer } from '@/utils/server';
import { env } from '@/utils/env';

async function main() {
  const app = buildServer();

  app.listen(env.PORT).on('error', function () {
    process.exit(1);
  });
}

main();
