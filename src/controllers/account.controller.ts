import { FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';

import { AccountService } from '../services/account.service';

import { RegisterAccountDto } from './dto/registerAccount.dto';

@injectable()
export class AccountController {
  @inject('AccountService')
  protected accountService: AccountService;

  registerUser(req: FastifyRequest<{ Body: RegisterAccountDto }>) {
    return this.accountService.registerUser(req.body);
  }
}
