import { IAppConfig } from './interfaces/IAppConfig';

import { AccountEntity } from './entities/account.entity';

declare module 'fastify' {
  interface FastifyInstance {
    config: IAppConfig;
  }

  interface FastifyRequest {
    user?: AccountEntity;
  }
}
