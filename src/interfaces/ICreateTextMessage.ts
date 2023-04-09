import { CreateTextMessageDto } from '../controllers/dto/createTextMessage.dto';

export interface ICreateTextMessage extends CreateTextMessageDto {
  contentType: string;
}
