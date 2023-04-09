import {
  DeepPartial,
  DeleteResult,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  SaveOptions,
  Repository,
  ObjectLiteral,
  FindOptionsWhere,
} from 'typeorm';

import { AppService } from '../services/app.service';

export abstract class BaseRepository<T extends ObjectLiteral> {
  protected target: EntityTarget<T>;

  async findBy(options: FindManyOptions<T>): Promise<T[]> {
    return this.getRepo().find(options);
  }

  async findOneBy(options: FindOptionsWhere<T>): Promise<T | null> {
    return this.getRepo().findOne({
      where: options,
    });
  }

  async findOneById(id: number): Promise<T | null> {
    const findOptions: FindOptionsWhere<EntityTarget<T>> = { id };
    return this.findOneBy(findOptions);
  }

  async findOneByOrFail(options: FindOneOptions<T>): Promise<T> {
    return this.getRepo().findOneOrFail(options);
  }

  createEntity(entityLike: DeepPartial<T>): T {
    return this.getRepo().create(entityLike);
  }

  async saveSingle<T>(entity: T, options?: SaveOptions): Promise<T> {
    return this.getRepo().save(entity as any, options);
  }

  async saveMany<T>(entities: T[], options?: SaveOptions): Promise<T[]> {
    return this.getRepo().save(entities as any, options);
  }

  async remove(entity: T): Promise<T> {
    return this.getRepo().remove(entity);
  }

  async removeById(id: number): Promise<DeleteResult> {
    return this.getRepo().delete(id);
  }

  /*
  async updateById<T>(id: number, changes: T): Promise<T> {
    return this.getRepo()
      .update(id, changes)
      .then(response => response.raw[0]);
  }
  */

  protected getRepo(): Repository<T> {
    return AppService.connection.getRepository(this.target);
  }
}
