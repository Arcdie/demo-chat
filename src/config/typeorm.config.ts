import { DataSourceOptions } from 'typeorm';

import { IAppConfig } from '../interfaces/IAppConfig';

export default function (config: IAppConfig) {
  const connectionConfig: DataSourceOptions = {
    // dropSchema: true,
    synchronize: true,

    type: 'postgres',
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    username: config.DATABASE_USERNAME,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_DATABASE,
    entities: ['src/entities/*.ts'],
    migrations: ['src/migrations/**/*.ts'],
    subscribers: ['src/subscribers/**/*.ts'],
  };

  return connectionConfig;
}
