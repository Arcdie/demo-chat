import { Column, Entity, Index, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { MessageEntity } from './message.entity';

@Entity('account')
export class AccountEntity extends BaseEntity {
  @Column()
  @Index({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @ManyToOne(() => MessageEntity, message => message.account)
  messages: MessageEntity[];
}
