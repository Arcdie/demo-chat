import { inject, injectable } from 'inversify';
import { FastifyRequest, FastifyReply } from 'fastify';

import { MessageService } from '../services/message.service';

import { MessageRepository } from '../repositories/message.repository';

import { HttpResponsesLib } from '../libs/httpResponses.lib';

import { EErrorsCodesEnum } from '../interfaces/EErrorsCodesEnum';

import { GetRawMessageDto } from './dto/getRawMessage.dto';
import { CreateTextMessageDto } from './dto/createTextMessage.dto';
import { GetMessageListDto } from './dto/getMessageList.dto';

@injectable()
export class MessageController {
  @inject('MessageService')
  protected messageService: MessageService;
  @inject('MessageRepository')
  protected messageRepository: MessageRepository;

  async getMessages(req: FastifyRequest<{ Querystring: GetMessageListDto }>) {
    const { page } = req.query;
    const results = await this.messageRepository.getMessageListByPage(page);

    return {
      results: results[0],
      count: results[1],
    };
  }

  async getRawMessage(req: FastifyRequest<{ Querystring: GetRawMessageDto }>, res: FastifyReply) {
    const { messageId } = req.query;

    const message = await this.messageRepository.findOneById(messageId);

    if (!message) {
      return HttpResponsesLib.notFoundResponse(res);
    }

    const content = await this.messageService.getContentView(message);
    return res.type(message.contentType).send(content);
  }

  createTextMessage(req: FastifyRequest<{ Body: CreateTextMessageDto }>, res: FastifyReply) {
    if (!req.user) {
      return HttpResponsesLib.unauthorizedResponse(res);
    }

    return this.messageService.createTextMessage(req.user, {
      ...req.body,
      contentType: 'text/plain',
    });
  }

  async createFileMessage(req: FastifyRequest, res: FastifyReply) {
    if (!req.user) {
      return HttpResponsesLib.unauthorizedResponse(res);
    }

    const uploadedFile = await req.file();

    if (!uploadedFile) {
      return HttpResponsesLib.badRequestResponse(res, EErrorsCodesEnum.NO_FILE);
    }

    return this.messageService.createFileMessage(req.user, uploadedFile);
  }
}
