import fs from 'fs';
import { inject, injectable } from 'inversify';
import { MultipartFile } from '@fastify/multipart';

import { MessageEntity } from '../entities/message.entity';
import { AccountEntity } from '../entities/account.entity';

import { MessageRepository } from '../repositories/message.repository';
import { ICreateTextMessage } from '../interfaces/ICreateTextMessage';

import { FsLib } from '../libs/fs.lib';
import { HelperLib } from '../libs/helper.lib';

@injectable()
export class MessageService {
  @inject('MessageRepository')
  protected messageRepository: MessageRepository;

  createTextMessage(account: AccountEntity, messageData: ICreateTextMessage) {
    return this.messageRepository.saveSingle({
      account,
      ...messageData,
    });
  }

  async createFileMessage(account: AccountEntity, file: MultipartFile) {
    const { mimetype } = file;


    const uploadsDir = this.getUploadsDir();
    await FsLib.createFolderIfDoesNotExist(uploadsDir);

    const extension = mimetype.split('/')[1];
    const fileName = `${HelperLib.getRandomString()}.${extension}`;
    const filePath = `${uploadsDir}/${fileName}`;

    const result = await FsLib.saveFile(file.file, filePath);

    if (!result) {
      return false;
    }

    return this.messageRepository.saveSingle({
      account,
      content: fileName,
      contentType: mimetype,
    });
  }

  async getContentView(message: MessageEntity) {
    if (this.isRegularMessage(message)) {
      return message.content;
    }

    const uploadsDir = this.getUploadsDir();
    const filePath = `${uploadsDir}/${message.content}`;
    return fs.createReadStream(filePath);
  }

  isRegularMessage(message: MessageEntity) {
    return message.contentType === 'text/plain';
  }

  private getUploadsDir() {
    const rootDir = HelperLib.getRootDir();
    return `${rootDir}/uploads`;
  }
}
