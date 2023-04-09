import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';

import { AppService } from '../services/app.service';

import { AccountRepository } from '../repositories/account.repository';

import { HelperLib } from '../libs/helper.lib';
import { HttpResponsesLib } from '../libs/httpResponses.lib';

import { EErrorsCodesEnum } from '../interfaces/EErrorsCodesEnum';

export default async (req: FastifyRequest, res: FastifyReply) => {
  let authToken = req.headers.authorization;

  if (!authToken) {
    return HttpResponsesLib.unauthorizedResponse(res, EErrorsCodesEnum.NO_AUTH_TOKEN);
  }

  if (authToken.includes('Bearer')) {
    authToken = authToken.replace('Bearer ', '');
  }

  authToken = HelperLib.decodeBase64String(authToken);
  const [login, password] = authToken.split(':');

  if (!login || !password) {
    return HttpResponsesLib.unauthorizedResponse(res, EErrorsCodesEnum.INVALID_AUTH_TOKEN);
  }

  const accountRepository = AppService.container.get<AccountRepository>('AccountRepository');

  const account = await accountRepository.findOneByLogin(login);

  if (!account) {
    return HttpResponsesLib.notFoundResponse(res);
  }

  const hashedPassword = HelperLib.makeHash(password);

  if (account.password !== hashedPassword) {
    return HttpResponsesLib.forbiddenResponse(res);
  }

  req.user = account;
};
