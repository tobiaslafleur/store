import { logger } from '@/utils/logger';
import initializeServer from '@/utils/server';
import env from '@/utils/env';

function main() {
  const app = initializeServer();

  app.listen(3001, function () {
    logger.info(
      `Application is listening on http://${env.HOST}:${env.PORT} 🚀`
    );
  });
}

main();
