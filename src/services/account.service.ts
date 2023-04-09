import { inject, injectable } from 'inversify';

import { AccountRepository } from '../repositories/account.repository';

import { IRegisterAccount } from '../interfaces/IRegisterAccount';
import { HelperLib } from '../libs/helper.lib';

@injectable()
export class AccountService {
  @inject('AccountRepository')
  protected accountRepository: AccountRepository;

  registerUser(regData: IRegisterAccount) {
    const hashedPassword = HelperLib.makeHash(regData.password);

    return this.accountRepository.saveSingle({
      ...regData,
      password: hashedPassword,
    });
  }
}
