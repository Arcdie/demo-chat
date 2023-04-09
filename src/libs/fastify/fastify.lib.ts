import FastifyEnv from '@fastify/env';
import Multipart from '@fastify/multipart';
import Fastify, { FastifyInstance } from 'fastify';

import messageRoute from '../../routes/message.route';
import accountRoute from '../../routes/account.route';

import { configSchema } from './schemas/fastify-config.schema';

export class FastifyLib {
  fastify: FastifyInstance;

  constructor() {
    this.fastify = Fastify({
      // logger: true,
    });
  }

  async registerPlugins() {
    await this.registerEnvPlugin();
    await this.registerMultipart();
    await this.registerRoutes();
  }

  async listen() {
    return this.fastify.listen({
      host: this.fastify.config.APP_HOST,
      port: this.fastify.config.APP_PORT,
    });
  }

  private registerEnvPlugin() {
    return this.fastify.register(FastifyEnv, {
      dotenv: true,
      confKey: 'config',
      data: process.env,
      schema: configSchema,
    });
  }

  private registerMultipart() {
    return this.fastify.register(Multipart);
  }

  private async registerRoutes() {
    await Promise.all([
      this.fastify.register(accountRoute, { prefix: '/account' }),
      this.fastify.register(messageRoute, { prefix: '/message' }),
    ]);
  }
}
