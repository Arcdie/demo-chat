import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { AccountEntity } from './account.entity';

@Entity('message')
export class MessageEntity extends BaseEntity {
  @Column()
  content: string;

  @Column()
  contentType: string;

  @ManyToOne(() => AccountEntity, account => account.messages)
  account: AccountEntity;
}
