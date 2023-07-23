import initializeServer from '@/utils/server';

function main() {
  const app = initializeServer();

  app.listen(3001, function () {
    console.log('Listening...');
  });
}

main();
