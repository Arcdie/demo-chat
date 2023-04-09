import { FastifyReply } from 'fastify';

export class HttpResponsesLib {
  static successResponse<T>(res: FastifyReply, data: T) {
    return res.code(200).send(data);
  }

  static badRequestResponse(res: FastifyReply, errorText = 'Bad Request') {
    return HttpResponsesLib.response(res, 400, errorText);
  }

  static unauthorizedResponse(res: FastifyReply, errorText = 'Unauthorized') {
    return HttpResponsesLib.response(res, 401, errorText);
  }

  static forbiddenResponse(res: FastifyReply, errorText = 'Forbidden') {
    return HttpResponsesLib.response(res, 403, errorText);
  }

  static notFoundResponse(res: FastifyReply, errorText = 'Not Found') {
    return HttpResponsesLib.response(res, 404, errorText);
  }

  static errorResponse(res: FastifyReply, errorText = 'Failed') {
    return HttpResponsesLib.response(res, 500, errorText);
  }

  static response(res: FastifyReply, errorCode: number, errorText: string) {
    return res.code(errorCode).send({ errorCode, errorText });
  }
}
