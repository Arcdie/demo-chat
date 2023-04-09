import {
  FastifyRequest,
  FastifyInstance,
  RouteShorthandOptions,
  HookHandlerDoneFunction,
} from 'fastify';

import { AppService } from '../services/app.service';

import { AccountController } from '../controllers/account.controller';
import { RegisterAccountDto } from '../controllers/dto/registerAccount.dto';

import * as accountSchemas from '../libs/fastify/schemas/account.schema';

export default (server: FastifyInstance, opts: RouteShorthandOptions, done: HookHandlerDoneFunction) => {
  const accountController = AppService.container.get<AccountController>('AccountController');

  server.post('/register', {
    schema: accountSchemas.registerAccountSchema,
    handler: (req: FastifyRequest<{ Body: RegisterAccountDto }>) => accountController.registerUser(req),
    /*
      Could be just accountController.registerUser, but fastify uses this function with own context (recreating object).
      As a result I don't have intersify' dependencies (AccountService) -> accountController.accountService == undefined.
    */
  });

  done();
};
