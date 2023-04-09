import path from 'path';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export class HelperLib {
  static decodeBase64String(base64String: string) {
    return Buffer.from(base64String, 'base64').toString('utf8');
  }

  static getRootDir() {
    return path.dirname(require!.main!.filename);
  }

  static getRandomString() {
    return uuidv4();
  }

  static makeHash(value: string) {
    return crypto.createHash('md5').update(value).digest('hex');
  }
}
