import { injectable } from 'inversify';

import { BaseRepository } from './base.repository';
import { MessageEntity } from '../entities/message.entity';

@injectable()
export class MessageRepository extends BaseRepository<MessageEntity> {
  protected LIMIT = 10;
  protected target = MessageEntity;

  getMessageListByPage(page: number) {
    return this.getRepo().findAndCount({
      order: { createdAt: 'ASC' },
      skip: this.LIMIT * page,
      take: this.LIMIT,
    });
  }
}
