import { Container } from 'inversify';

import { AccountController } from '../controllers/account.controller';
import { MessageController } from '../controllers/message.controller';

import { AccountService } from '../services/account.service';
import { MessageService } from '../services/message.service';

import { AccountRepository } from '../repositories/account.repository';
import { MessageRepository } from '../repositories/message.repository';

export class InversifyLib {
  private static container: Container;

  public static getContainer() {
    return InversifyLib.container;
  }

  public static build() {
    if (InversifyLib.container) {
      return InversifyLib.getContainer();
    }

    const container = new Container({ skipBaseClassChecks: true });

    // Variables

    // Repositories
    container.bind<AccountRepository>('AccountRepository').to(AccountRepository);
    container.bind<MessageRepository>('MessageRepository').to(MessageRepository);

    // Services
    container.bind<AccountService>('AccountService').to(AccountService);
    container.bind<MessageService>('MessageService').to(MessageService);

    // Controllers
    container.bind<AccountController>('AccountController').to(AccountController);
    container.bind<MessageController>('MessageController').to(MessageController);

    // Tests

    InversifyLib.container = container;
    return container;
  }
}
