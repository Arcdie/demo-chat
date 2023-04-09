import { DataSource } from 'typeorm';
import { Container } from 'inversify';
import { FastifyInstance } from 'fastify';

import { TypeormLib } from '../libs/typeorm.lib';
import { InversifyLib } from '../libs/inversify.lib';
import { FastifyLib } from '../libs/fastify/fastify.lib';

export class AppService {
  static container: Container;
  static connection: DataSource;
  static server: FastifyInstance;

  static async bootstrap() {
    AppService.container = InversifyLib.build();

    const fastifyLib = new FastifyLib();
    AppService.server = fastifyLib.fastify;
    await fastifyLib.registerPlugins();
    await fastifyLib.listen();

    const appConfig = AppService.getConfig();
    AppService.connection = await TypeormLib.connect(appConfig);
  }

  static getConfig() {
    if (!AppService.server) {
      throw new Error('App was not launched');
    }

    return AppService.server.config;
  }

  static getEnv() {
    return process.env.NODE_ENV || 'development';
  }

  static getAddress() {
    if (!AppService.server) {
      throw new Error('App was not launched');
    }

    const address = AppService.server.server.address();

    if (!address) {
      throw new Error('No address');
    }

    if (typeof address === 'string') {
      return address;
    }

    return `${address.address}:${address.port}`;
  }
}
