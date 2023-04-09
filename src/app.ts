import 'reflect-metadata';

import { AppService } from './services/app.service';

(async () => {
  await AppService.bootstrap();
})()
  .then(() => {
    console.log(`App is running at ${AppService.getAddress()}`);
    console.log('Connection to pg is successful');
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

process.on('uncaughtException', err => {
  console.log(err);
  process.exit(1);
});
