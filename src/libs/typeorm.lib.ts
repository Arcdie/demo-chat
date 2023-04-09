import { DataSource } from 'typeorm';

import { IAppConfig } from '../interfaces/IAppConfig';

import getConnectionConfig from '../config/typeorm.config';

export class TypeormLib {
  static async connect(appConfig: IAppConfig) {
    const connectionConfig = getConnectionConfig(appConfig);
    return new DataSource(connectionConfig).initialize();
  }
}
