/* eslint-disable prettier/prettier */
import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { File } from 'src/entities/file.entity';


@Injectable()
export class FileService {
  constructor(private readonly entityManager: EntityManager) {}

  async uploadFile(file: Express.Multer.File): Promise<File> {
    const newFile = new File();
    newFile.filename = file.filename;
    newFile.mimetype = file.mimetype;
    newFile.encoding = file.encoding;
    newFile.path = file.path;
    await this.entityManager.persistAndFlush(newFile);
    return newFile;
  }

  async getFileById(id: number): Promise<File> {
    return this.entityManager.findOneOrFail(File, id);
  }
}