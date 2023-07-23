import { logger } from '@/utils/logger';
import initializeServer from '@/utils/server';
import env from '@/utils/env';

const { HOST, PORT } = env;

function main() {
  const app = initializeServer();

  app
    .listen(PORT, function () {
      logger.info(`Application is listening on http://${HOST}:${PORT} 🚀`);
    })
    .on('error', function () {
      logger.error('Unable to start application, shutting down ❌');
      process.exit(1);
    });
}

main();
