import { buildServer } from '@/utils/server';

const main = async () => {
  const app = buildServer();

  app.listen(3001, () => {
    console.log('Server is running');
  });
};

main();
