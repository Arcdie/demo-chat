import fs from 'fs';
import pump from 'pump';

export class FsLib {
  static async createFolderIfDoesNotExist(folderPath: string) {
    const doesExist = await FsLib.exist(folderPath);

    if (!doesExist) {
      await FsLib.mkdir(folderPath);
    }
  }

  static exist(folderPath: string) {
    return new Promise<boolean>(res => fs.access(folderPath, err => res(err === undefined)));
  }

  static mkdir(folderPath: string) {
    return new Promise<boolean>((res, rej) => fs.mkdir(folderPath, err => res(err === undefined)));
  }

  static async saveFile(file: pump.Stream, filePath: string) {
    const storedFile = fs.createWriteStream(filePath);
    return pump(file, storedFile);
  }
}
