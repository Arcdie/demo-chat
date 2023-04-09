import {
  FastifyReply,
  FastifyRequest,
  FastifyInstance,
  RouteShorthandOptions,
  HookHandlerDoneFunction,
} from 'fastify';

import { AppService } from '../services/app.service';

import authMiddleware from '../middlewares/auth.middleware';

import { MessageController } from '../controllers/message.controller';
import { GetRawMessageDto } from '../controllers/dto/getRawMessage.dto';
import { GetMessageListDto } from '../controllers/dto/getMessageList.dto';
import { CreateTextMessageDto } from '../controllers/dto/createTextMessage.dto';

import * as messageSchemas from '../libs/fastify/schemas/message.schema';

export default (server: FastifyInstance, opts: RouteShorthandOptions, done: HookHandlerDoneFunction) => {
  const messageController = AppService.container.get<MessageController>('MessageController');

  server.get('/list', {
    schema: messageSchemas.getMessagesSchema,
    handler: (req: FastifyRequest<{ Querystring: GetMessageListDto }>) => messageController.getMessages(req),
  });

  server.get('/content', {
    schema: messageSchemas.getRawMessageSchema,
    handler: (req: FastifyRequest<{ Querystring: GetRawMessageDto }>, res: FastifyReply) => messageController.getRawMessage(req, res),
  });

  server.post('/create/text', {
    preHandler: authMiddleware,
    schema: messageSchemas.createTextMessageSchema,
    handler: (req: FastifyRequest<{ Body: CreateTextMessageDto }>, res: FastifyReply) => messageController.createTextMessage(req, res),
  });

  server.post('/create/file', {
    preHandler: authMiddleware,
    handler: (req: FastifyRequest, res: FastifyReply) => messageController.createFileMessage(req, res),
  });

  done();
};
