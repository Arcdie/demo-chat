import { injectable } from 'inversify';

import { BaseRepository } from './base.repository';

import { AccountEntity } from '../entities/account.entity';

@injectable()
export class AccountRepository extends BaseRepository<AccountEntity> {
  protected target = AccountEntity;

  findOneByLogin(login: string) {
    return this.findOneBy({ login });
  }
}
